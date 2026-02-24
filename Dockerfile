# ETAPA 1: Construcción (El Chef)
FROM node:18-slim AS build

# Recibimos la variable desde Cloud Build
ARG VITE_API_URL
# La convertimos en variable de entorno para que Vite la vea
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Al correr build, Vite "pegará" la URL del backend en el código JS
RUN npm run build

# ETAPA 2: Servidor (El Mesero)
FROM nginx:alpine
# Copiamos la carpeta 'dist' que generó Vite
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]