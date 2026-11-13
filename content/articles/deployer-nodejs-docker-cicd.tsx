import React from "react";

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
        Passer d'une application Node.js qui « tourne en local » à un service déployé, surveillé
        et maintenable en production — voici la démarche complète, des fichiers Docker au pipeline
        GitHub Actions.
      </p>

      <h2>Pourquoi Docker</h2>
      <p>
        Docker résout le problème classique du « ça marchait sur ma machine ». En empaquetant
        l'application avec ses dépendances dans une image, vous garantissez que l'environnement
        de développement, de test et de production est identique. C'est aussi la brique de base
        pour orchestrer des services avec Docker Compose et, plus tard, Kubernetes.
      </p>

      <h2>Dockerfile optimisé pour Node.js</h2>
      <p>
        Le Dockerfile suivant utilise un build multi-étage : une étape pour construire
        l'application, une autre pour l'image de production. Résultat : une image finale
        sans les devDependencies ni les fichiers sources TypeScript.
      </p>
      <CodeBlock lang="dockerfile">
{`# Étape 1 : build
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances en premier (cache Docker)
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Étape 2 : production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

USER appuser

EXPOSE 3000
CMD ["node", "dist/main.js"]`}
      </CodeBlock>
      <p>
        Quelques décisions importantes ici :
      </p>
      <ul>
        <li><strong>Alpine :</strong> image de base légère (~5 MB contre ~300 MB pour node:20).</li>
        <li><strong>npm ci :</strong> installe exactement ce qui est dans package-lock.json, sans surprises.</li>
        <li><strong>Utilisateur non-root :</strong> bonne pratique de sécurité — le process ne tourne pas en root.</li>
        <li><strong>Copier seulement dist/ :</strong> les sources TypeScript restent hors de l'image de prod.</li>
      </ul>

      <h2>docker-compose.yml pour le développement</h2>
      <CodeBlock lang="yaml">
{`version: "3.9"

services:
  app:
    build:
      context: .
      target: builder  # étape de dev, avec devDependencies
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules  # éviter d'écraser node_modules du container
    depends_on:
      db:
        condition: service_healthy
    command: npm run dev  # ts-node-dev ou nodemon

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:`}
      </CodeBlock>

      <h2>Variables d'environnement</h2>
      <p>
        Ne jamais mettre des secrets dans le Dockerfile ou docker-compose.yml qui serait commité.
        Utilisez un fichier <code>.env</code> local (ajouté au .gitignore) et un secret manager
        en production (AWS Secrets Manager, Vault, ou les secrets GitHub Actions).
      </p>
      <CodeBlock lang="bash">
{`# .env.example — commité
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
API_KEY=your_api_key_here
NODE_ENV=development

# .env — NON commité, contient les vraies valeurs
DATABASE_URL=postgresql://...
API_KEY=sk-...`}
      </CodeBlock>

      <h2>Pipeline GitHub Actions</h2>
      <p>
        Le pipeline suivant s'exécute à chaque push sur main : il vérifie le code, lance les
        tests, construit l'image Docker, la pousse sur GitHub Container Registry, puis déploie
        sur le serveur via SSH.
      </p>
      <CodeBlock lang="yaml">
{`# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/\${{ github.repository }}:latest
            ghcr.io/\${{ github.repository }}:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull ghcr.io/\${{ github.repository }}:latest
            docker stop myapp || true
            docker rm myapp || true
            docker run -d \
              --name myapp \
              --restart unless-stopped \
              -p 3000:3000 \
              --env-file /etc/myapp/.env \
              ghcr.io/\${{ github.repository }}:latest`}
      </CodeBlock>

      <h2>Nginx comme reverse proxy</h2>
      <p>
        On ne expose pas directement le port Node.js en production. Nginx sert de reverse proxy :
        il gère le TLS, la compression, les en-têtes de sécurité et le rate limiting.
      </p>
      <CodeBlock lang="nginx">
{`# /etc/nginx/sites-available/myapp
server {
    listen 443 ssl http2;
    server_name api.mondomaine.com;

    ssl_certificate /etc/letsencrypt/live/api.mondomaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.mondomaine.com/privkey.pem;

    gzip on;
    gzip_types application/json text/plain;

    # Limitation du débit
    limit_req_zone \$binary_remote_addr zone=api:10m rate=20r/s;
    limit_req zone=api burst=50;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}

server {
    listen 80;
    server_name api.mondomaine.com;
    return 301 https://\$host\$request_uri;
}`}
      </CodeBlock>

      <h2>Checklist avant la mise en production</h2>
      <ul>
        <li>✓ Les secrets sont dans des variables d'environnement, pas dans le code.</li>
        <li>✓ Le Dockerfile utilise un build multi-étage (image de prod allégée).</li>
        <li>✓ Le container tourne en utilisateur non-root.</li>
        <li>✓ La politique de redémarrage est configurée (<code>--restart unless-stopped</code>).</li>
        <li>✓ Les logs sont centralisés (stdout/stderr + collecteur comme Loki ou CloudWatch).</li>
        <li>✓ Un health check est configuré (<code>/health</code> endpoint).</li>
        <li>✓ Le certificat TLS est en place et le renouvellement automatisé (Let's Encrypt + certbot).</li>
        <li>✓ Les sauvegardes de base de données sont planifiées et testées.</li>
      </ul>

      <h2>Pour aller plus loin</h2>
      <p>
        Ce pipeline convient à une application monolithique déployée sur un VPS.
        Si vous avez plusieurs services, regardez Docker Compose en production ou Kubernetes
        (et la certification CKAD si vous voulez maîtriser l'orchestration).
        Pour le monitoring, Prometheus + Grafana ou Datadog selon votre budget.
      </p>

      <hr />
      <p className="text-sm text-forest/60">
        <em>
          Les versions des images et actions GitHub (node:20, actions/checkout@v4) sont
          correctes à la date de publication. Vérifiez les versions les plus récentes dans
          la documentation officielle. Cet article est une proposition éditoriale à relire
          avant mise en ligne.
        </em>
      </p>
    </div>
  );
}
