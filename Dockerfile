# Use Node.js as base image
FROM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Copy environment variables
ARG VITE_API_URL
ARG VITE_IMG_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_IMG_URL=${VITE_IMG_URL}

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage to nginx serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Add nginx config for SPA routing
RUN echo 'server { \
    listen 5173; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 5173
EXPOSE 5173

# Start nginx
CMD ["nginx", "-g", "daemon off;"]