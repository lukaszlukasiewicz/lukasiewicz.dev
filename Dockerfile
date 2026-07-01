# Multi-stage build for Next.js with HTTPS support
# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Production runtime with nginx reverse proxy
FROM node:18-alpine AS runner

WORKDIR /app

# Install nginx and supervisor
RUN apk add --no-cache nginx supervisor openssl

# Create necessary directories
RUN mkdir -p /var/log/supervisor /run/nginx /var/lib/nginx/logs

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./

# Copy nginx and supervisor configurations
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create SSL certificate directory
RUN mkdir -p /etc/nginx/ssl

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Use supervisor to manage both nginx and node processes
CMD ["/entrypoint.sh"]
