# Stage 1: Build the Angular app
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the compiled files from the build stage to Nginx's public folder
# Note: In Angular 17+, the build output might be in dist/my-app/browser
COPY --from=build /app/dist/my-app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]