# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files
COPY . .

# Build the application
# This step will use the .env file during build
ARG VITE_API_URL
ARG VITE_IMG_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_IMG_URL=${VITE_IMG_URL}
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Remove default nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 instead of 80 (since 80 is in use)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]