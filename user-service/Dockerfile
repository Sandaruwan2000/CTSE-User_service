# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Remove example env file from image
RUN rm -f .env.example

EXPOSE 5001

ENV NODE_ENV=production

CMD ["node", "server.js"]
