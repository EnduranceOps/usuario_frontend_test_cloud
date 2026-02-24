# ETAPA 1: Construcción
FROM node:18-slim AS build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ETAPA 2: Servidor
FROM nginx:alpine
# Esta versión del comando es más fuerte: busca cualquier línea que empiece con "listen" y la cambia a 8080
RUN sed -i 's/listen[[:space:]]\+80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
# Aseguramos que corra como root para evitar temas de permisos en el puerto
CMD ["nginx", "-g", "daemon off;"]