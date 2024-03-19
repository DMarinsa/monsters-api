# Usa la imagen de node alpine 20
FROM node:20-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expón el puerto 3000 para la aplicación NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
