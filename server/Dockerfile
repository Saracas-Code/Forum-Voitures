FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "if node -e \"process.exit((require('./package.json').scripts||{}).dev?0:1)\"; then npm run dev; else npm start; fi"]
