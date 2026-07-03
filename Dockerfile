# Stage 1: build
FROM node:18-alpine AS build
WORKDIR /app
ENV CI=true
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine AS prod
# Adjust the path below if your build output is "build" instead of "dist"
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
