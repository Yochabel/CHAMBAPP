# Dockerfile
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la app
COPY . .

# Exponer puerto
EXPOSE 4000

# Comando de inicio
CMD ["node", "server.js"]
