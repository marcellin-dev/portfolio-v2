import React from "react";

export default function ArticleContent() {
  return (
    <div className="prose prose-lg max-w-none">
      <p className="lead text-xl text-forest/80 font-medium">
        Les agents IA font la une. Mais avant d'en déployer un, posez-vous la vraie question :
        est-ce que votre problème nécessite vraiment un LLM, ou une automatisation classique
        suffirait-elle à 20 % du coût et 80 % de la fiabilité ?
      </p>

      <h2>Ce qu'est une automatisation classique</h2>
      <p>
        Une automatisation classique est un enchaînement de règles déterministes. Quand X se passe,
        faire Y. Quand un formulaire est soumis, envoyer un email. Quand une commande passe
        en statut "expédié", mettre à jour le CRM et envoyer un SMS.
      </p>
      <p>
        Ces automatisations se construisent avec des outils no-code (Zapier, Make, n8n) ou
        du code simple (un script Node.js, une Cloud Function). Elles sont rapides à déployer,
        peu coûteuses à faire tourner, et prévisibles : si l'entrée est la même, la sortie est
        la même.
      </p>
      <p><strong>Quand elles conviennent parfaitement :</strong></p>
      <ul>
        <li>Le déclencheur est un événement précis (nouveau lead, nouveau paiement, nouvelle entrée dans un tableur).</li>
        <li>Les étapes sont séquentielles et connues à l'avance.</li>
        <li>Les données sont structurées (formulaires, webhooks, API).</li>
        <li>Le volume est élevé et la logique ne change pas.</li>
      </ul>

      <h2>Ce qu'est un agent IA</h2>
      <p>
        Un agent IA est un programme qui utilise un LLM (un grand modèle de langage, comme GPT-4)
        comme moteur de décision. Il reçoit un message en langage naturel, l'interprète, choisit
        l'action à effectuer parmi un registre d'outils disponibles, exécute cette action, puis
        formule une réponse.
      </p>
      <p>
        La différence clé avec l'automatisation classique : l'agent peut gérer des entrées non
        structurées et prendre des décisions contextuelles. « Je voudrais déplacer mon rendez-vous
        de mardi à jeudi en fin de matinée » — aucun script déterministe ne gère ça proprement.
        Un agent avec accès à l'outil Calendar le gère.
      </p>
      <p><strong>Ce que ça implique techniquement :</strong></p>
      <ul>
        <li>Un appel API LLM à chaque interaction (coût et latence).</li>
        <li>Un registre d'outils (fonctions JSON avec schémas) que le LLM peut invoquer.</li>
        <li>Une logique d'orchestration : recevoir le message, appeler le LLM, exécuter l'outil sélectionné, retourner la réponse.</li>
        <li>Une gestion du contexte conversationnel si les échanges sont multi-tours.</li>
      </ul>

      <h2>Le tableau de décision</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Critère</th>
              <th>Automatisation classique</th>
              <th>Agent IA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nature des entrées</td>
              <td>Structurées (formulaires, webhooks)</td>
              <td>Langage naturel, messages libres</td>
            </tr>
            <tr>
              <td>Logique décisionnelle</td>
              <td>Règles explicites et fixes</td>
              <td>Interprétation contextuelle</td>
            </tr>
            <tr>
              <td>Coût d'exploitation</td>
              <td>Très faible</td>
              <td>Plus élevé (appels LLM)</td>
            </tr>
            <tr>
              <td>Fiabilité</td>
              <td>Très élevée (déterministe)</td>
              <td>Bonne mais non garantie (hallucinations possibles)</td>
            </tr>
            <tr>
              <td>Maintenance</td>
              <td>Modifier les règles si le process change</td>
              <td>Ajuster les prompts et les outils</td>
            </tr>
            <tr>
              <td>Délai de mise en place</td>
              <td>Jours</td>
              <td>Semaines (architecture + tests)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Un exemple concret : la gestion des demandes client</h2>
      <p>
        Imaginons une PME qui reçoit des demandes client par WhatsApp. Deux besoins différents :
      </p>
      <p>
        <strong>Besoin A : Envoyer une confirmation de commande automatique.</strong> Le client
        écrit « J'ai passé ma commande », le système répond avec le numéro de commande et le
        délai estimé. Ici, l'automatisation classique suffit : on vérifie si le message contient
        certains mots-clés, on interroge la base de données, on envoie un template.
      </p>
      <p>
        <strong>Besoin B : Répondre à des questions libres sur la commande.</strong> Le client
        écrit « Ma commande est arrivée mais il manque la facture, et j'aimerais aussi ajouter
        un article si c'est encore possible ». Deux intentions imbriquées, formulées librement.
        L'automatisation classique va échouer. Un agent IA avec deux outils (récupérer la facture,
        modifier une commande) va gérer ça correctement.
      </p>

      <h2>Les limites que personne ne mentionne</h2>
      <p>
        Les agents IA ont des limites réelles qu'il faut anticiper avant de déployer :
      </p>
      <ul>
        <li>
          <strong>Hallucinations :</strong> le LLM peut inventer une information s'il n'a pas
          accès à la donnée réelle. Les outils bien définis limitent ce risque, mais ne
          l'éliminent pas.
        </li>
        <li>
          <strong>Latence :</strong> un appel API LLM prend 1 à 5 secondes. Pour une conversation
          WhatsApp, c'est acceptable. Pour un process en temps réel, ça peut bloquer.
        </li>
        <li>
          <strong>Coût à l'échelle :</strong> à 1000 messages par jour avec GPT-4o, le coût
          mensuel peut atteindre plusieurs centaines de dollars. À anticiper dans le business case.
        </li>
        <li>
          <strong>Supervision nécessaire :</strong> un agent en production a besoin d'un
          monitoring des appels, des erreurs d'outil, et des réponses inattendues. Il ne se
          maintient pas seul.
        </li>
      </ul>

      <h2>Ma recommandation pratique</h2>
      <p>
        Commencez par l'automatisation classique. Si vos entrées sont structurées et votre
        logique déterministe, ne sur-ingénieriez pas. Ajoutez un agent IA uniquement quand
        vous avez identifié un besoin réel de compréhension du langage naturel ou de décision
        contextuelle.
      </p>
      <p>
        La bonne architecture dans la plupart des cas : une automatisation classique pour les
        90 % de cas courants, avec un agent IA en fallback pour les cas complexes ou ambigus.
      </p>
      <p>
        Si vous ne savez pas par où commencer, le bon point de départ est de lister les 10
        types de messages ou demandes les plus fréquents que vous traitez manuellement.
        Si plus de la moitié nécessitent une lecture et une interprétation avant de décider
        quoi faire, un agent IA vaut la peine d'être évalué.
      </p>

      <hr />
      <p className="text-sm text-forest/60">
        <em>
          Cet article est une proposition éditoriale à relire avant mise en ligne. Les exemples
          de coûts sont indicatifs et susceptibles de varier selon les tarifs des fournisseurs
          au moment de la lecture.
        </em>
      </p>
    </div>
  );
}
