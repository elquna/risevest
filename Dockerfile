#Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .

#RUN npm run build
RUN NODE_ENV=development npm i

#Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN NODE_ENV=production npm i
#RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]