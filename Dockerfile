FROM node:12.19.0-alpine3.9 AS development
WORKDIR /src/login
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


