FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json* ./

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Construction de l'application
RUN npm run build

# Exposer le port utilisé par l'application
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]