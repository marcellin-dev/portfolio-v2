import React from "react";

function Code({ children }: { children: string }) {
  return (
    <code className="bg-forest-dark text-green-300 px-1 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  );
}

function CodeBlock({ lang, children }: { lang: string; children: string }) {
  return (
    <div className="my-6">
      <div className="bg-forest-dark/10 text-forest/60 text-xs font-mono px-4 py-1 rounded-t border border-b-0 border-forest/10">
        {lang}
      </div>
      <pre className="bg-forest-dark text-green-100 p-4 rounded-b overflow-x-auto text-sm font-mono leading-relaxed border border-forest/20">
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}

export default function ArticleContent() {
  return (
    <div className="prose prose-lg max-w-none">
      <p className="lead text-xl text-forest/80 font-medium">
        Le tool calling d'un LLM transforme un chatbot en agent capable d'agir sur vos systèmes.
        Voici comment j'ai architecturé un assistant WhatsApp qui lit et crée des événements
        Google Calendar — avec NestJS, Prisma et l'API OpenAI.
      </p>

      <h2>Architecture globale</h2>
      <p>
        L'assistant fonctionne en quatre étapes à chaque message entrant :
      </p>
      <ol>
        <li>
          <strong>Réception :</strong> WhatsApp Business envoie un webhook POST vers notre
          endpoint NestJS.
        </li>
        <li>
          <strong>Interprétation :</strong> le message est transmis au LLM avec la liste des
          outils disponibles (Calendar, base de données, etc.).
        </li>
        <li>
          <strong>Exécution :</strong> le LLM retourne l'outil à invoquer et les paramètres.
          Le backend exécute la fonction réelle.
        </li>
        <li>
          <strong>Réponse :</strong> le résultat de l'outil est renvoyé au LLM qui formule
          la réponse finale, envoyée en message WhatsApp.
        </li>
      </ol>

      <h2>Structure du module NestJS</h2>
      <CodeBlock lang="typescript">
{`// src/assistant/assistant.module.ts
@Module({
  imports: [PrismaModule, CalendarModule],
  controllers: [WhatsappWebhookController],
  providers: [AssistantService, ToolRegistryService],
})
export class AssistantModule {}`}
      </CodeBlock>

      <h2>Le registre d'outils</h2>
      <p>
        La clé de l'extensibilité est un registre centralisé. Chaque outil est une classe
        avec trois éléments : la définition JSON (pour le LLM), le nom (pour le dispatch),
        et l'exécuteur (la fonction réelle).
      </p>
      <CodeBlock lang="typescript">
{`// src/assistant/tools/tool.interface.ts
export interface Tool {
  definition: ChatCompletionTool; // Format OpenAI
  name: string;
  execute(params: Record<string, unknown>): Promise<string>;
}

// src/assistant/tool-registry.service.ts
@Injectable()
export class ToolRegistryService {
  private tools = new Map<string, Tool>();

  register(tool: Tool) {
    this.tools.set(tool.name, tool);
  }

  getDefinitions(): ChatCompletionTool[] {
    return [...this.tools.values()].map((t) => t.definition);
  }

  async execute(name: string, params: Record<string, unknown>): Promise<string> {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(\`Tool not found: \${name}\`);
    return tool.execute(params);
  }
}`}
      </CodeBlock>

      <h2>Définir un outil Calendar</h2>
      <p>
        La définition JSON est ce que le LLM reçoit. Elle doit être claire et précise —
        c'est elle qui guide la décision du modèle sur les paramètres à extraire.
      </p>
      <CodeBlock lang="typescript">
{`// src/assistant/tools/create-event.tool.ts
@Injectable()
export class CreateCalendarEventTool implements Tool {
  name = "create_calendar_event";

  definition: ChatCompletionTool = {
    type: "function",
    function: {
      name: this.name,
      description: "Crée un événement dans Google Calendar",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Titre de l'événement",
          },
          startTime: {
            type: "string",
            description: "Date et heure de début au format ISO 8601",
          },
          durationMinutes: {
            type: "number",
            description: "Durée en minutes (défaut : 60)",
          },
          description: {
            type: "string",
            description: "Description optionnelle de l'événement",
          },
        },
        required: ["title", "startTime"],
      },
    },
  };

  constructor(private readonly calendarService: CalendarService) {}

  async execute(params: Record<string, unknown>): Promise<string> {
    const event = await this.calendarService.createEvent({
      title: params.title as string,
      startTime: new Date(params.startTime as string),
      durationMinutes: (params.durationMinutes as number) ?? 60,
      description: params.description as string | undefined,
    });
    return \`Événement créé : "\${event.title}" le \${event.formattedDate}\`;
  }
}`}
      </CodeBlock>

      <h2>Traitement du webhook WhatsApp</h2>
      <CodeBlock lang="typescript">
{`// src/assistant/whatsapp-webhook.controller.ts
@Controller("webhook/whatsapp")
export class WhatsappWebhookController {
  constructor(private readonly assistantService: AssistantService) {}

  // Vérification du webhook (exigée par Meta lors de la configuration)
  @Get()
  verifyWebhook(@Query() query: WhatsappVerifyQuery): string {
    if (query["hub.verify_token"] !== process.env.WHATSAPP_VERIFY_TOKEN) {
      throw new ForbiddenException();
    }
    return query["hub.challenge"];
  }

  @Post()
  async handleMessage(@Body() payload: WhatsappWebhookPayload): Promise<void> {
    const message = extractMessage(payload);
    if (!message) return;

    await this.assistantService.processMessage({
      from: message.from,
      text: message.text.body,
      phoneNumberId: payload.entry[0].changes[0].value.metadata.phone_number_id,
    });
  }
}`}
      </CodeBlock>

      <h2>L'orchestration LLM avec tool calling</h2>
      <CodeBlock lang="typescript">
{`// src/assistant/assistant.service.ts
@Injectable()
export class AssistantService {
  constructor(
    private readonly toolRegistry: ToolRegistryService,
    private readonly prisma: PrismaService,
    private readonly whatsappApi: WhatsappApiService,
  ) {}

  async processMessage(input: { from: string; text: string; phoneNumberId: string }) {
    // Récupérer l'historique conversationnel
    const history = await this.prisma.message.findMany({
      where: { phoneNumber: input.from },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: \`Tu es un assistant d'organisation. Tu peux lire et créer des événements
          dans Google Calendar. Réponds en français. Sois concis.\`,
      },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: input.text },
    ];

    // Premier appel LLM avec les outils disponibles
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      tools: this.toolRegistry.getDefinitions(),
      tool_choice: "auto",
    });

    const assistantMessage = response.choices[0].message;

    // Si le LLM veut utiliser un outil
    if (assistantMessage.tool_calls?.length) {
      const toolCall = assistantMessage.tool_calls[0];
      const params = JSON.parse(toolCall.function.arguments);
      const toolResult = await this.toolRegistry.execute(toolCall.function.name, params);

      // Deuxième appel LLM avec le résultat de l'outil
      const finalResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          ...messages,
          assistantMessage,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: toolResult,
          },
        ],
      });

      const finalText = finalResponse.choices[0].message.content ?? "";
      await this.whatsappApi.sendMessage(input.from, finalText, input.phoneNumberId);
      await this.saveMessages(input.from, input.text, finalText);
      return;
    }

    // Réponse directe sans outil
    const text = assistantMessage.content ?? "";
    await this.whatsappApi.sendMessage(input.from, text, input.phoneNumberId);
    await this.saveMessages(input.from, input.text, text);
  }

  private async saveMessages(phone: string, userText: string, assistantText: string) {
    await this.prisma.message.createMany({
      data: [
        { phoneNumber: phone, role: "user", content: userText },
        { phoneNumber: phone, role: "assistant", content: assistantText },
      ],
    });
  }
}`}
      </CodeBlock>

      <h2>Points d'attention</h2>
      <ul>
        <li>
          <strong>Schémas précis :</strong> la qualité de l'extraction des paramètres par le LLM
          dépend directement de la clarté des descriptions dans le schéma JSON. Testez avec des
          phrasés variés.
        </li>
        <li>
          <strong>Gestion du contexte :</strong> limitez l'historique chargé (ici 10 messages)
          pour contrôler le coût et ne pas dépasser la fenêtre de contexte.
        </li>
        <li>
          <strong>Idempotence :</strong> WhatsApp peut envoyer le même webhook plusieurs fois.
          Stockez l'ID de message et ignorez les doublons.
        </li>
        <li>
          <strong>Timeout :</strong> les appels LLM peuvent prendre 3 à 8 secondes. L'endpoint
          webhook doit répondre 200 immédiatement et traiter en arrière-plan (queue, worker).
        </li>
        <li>
          <strong>Secrets :</strong> les tokens WhatsApp et Google OAuth ne doivent jamais
          apparaître dans les logs. Utilisez des variables d'environnement et un secret manager.
        </li>
      </ul>

      <h2>Ajouter un nouvel outil</h2>
      <p>
        La force du registre extensible : pour ajouter l'outil « vérifier le stock » ou
        « envoyer une facture », il suffit de créer une nouvelle classe implémentant <Code>Tool</Code>
        {" "}et de l'enregistrer dans le module. Zéro modification du service d'orchestration.
      </p>

      <hr />
      <p className="text-sm text-forest/60">
        <em>
          Les extraits de code sont simplifiés à des fins pédagogiques. Le projet réel
          comporte davantage de gestion d'erreurs, de types stricts et de tests. Les noms
          des packages peuvent varier selon la version d'OpenAI SDK et de NestJS utilisée.
          Cet article est une proposition éditoriale à relire avant mise en ligne.
        </em>
      </p>
    </div>
  );
}
