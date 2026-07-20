FROM node:23-alpine AS builder
WORKDIR /app
# Copier les fichiers de dépendances
COPY package*.json ./
# Installer les dépendances
RUN npm ci
# Copier le reste du projet
COPY . .
# Compiler le projet Vite
RUN npm run build

# Étape finale : serveur web léger
FROM nginx:alpine
# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copier les fichiers générés
COPY --from=builder /app/dist /usr/share/nginx/html
# Exposer le port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
