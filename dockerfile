# Usa imagem oficial do Node.js como base
FROM node:18

# Define diretório de trabalho no container
WORKDIR /app

# Copia os arquivos package*.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos para dentro do container
COPY . .

# Expõe a porta usada pela aplicação (ex: 3000)
EXPOSE 5173

# Comando para iniciar a aplicação
CMD ["npm","run","docker"]
