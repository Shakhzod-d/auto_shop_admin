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

# 2. Serve bosqichi
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]