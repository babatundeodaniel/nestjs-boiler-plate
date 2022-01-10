FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
RUN ls -la
CMD ["npm", "run", "start:prod"]