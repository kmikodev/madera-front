# build environment
FROM node:20-alpine as builder
RUN mkdir -p /app
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json /app/

# Instalar dependencias usando npm con legacy-peer-deps
RUN npm i --legacy-peer-deps

# Copiar el resto de los archivos del proyecto
COPY . /app

# Construir la aplicación
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80