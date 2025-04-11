# Base image
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install
COPY . .

# Exponer el puerto del microservicio
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
