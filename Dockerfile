# Usa imagem oficial do Node
FROM node:18

# Define pasta de trabalho dentro do container
WORKDIR /app

# Copia apenas package.json primeiro (melhor cache)
COPY package*.json ./

# Instala dependências
RUN rm -rf node_modules
RUN npm i

# Copia o restante do projeto
COPY . .

# Expõe a porta da aplicação
EXPOSE 3001

# Comando para iniciar
CMD ["npm", "start"]