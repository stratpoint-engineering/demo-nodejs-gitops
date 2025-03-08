FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run test

FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY --from=builder /app/src ./src

USER node
EXPOSE 3000
CMD ["node", "src/app.js"]
