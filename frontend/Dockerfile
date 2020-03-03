# Stage 1 - Build Angular App
FROM node:13 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Run App
FROM nginx:1.17.8-alpine
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html
