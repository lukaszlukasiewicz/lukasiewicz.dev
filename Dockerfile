# Multi-stage Dockerfile for Next.js application
# Optimized for Dokploy deployment

# --- Build stage ---
FROM node:22-slim AS builder

# Install build tools needed for native modules (sharp, @parcel/watcher)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Prevent npm interactive prompts
ENV CI=true
ENV npm_config_loglevel=warn

COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund --maxsockets=1

COPY . .
RUN npm run build

# --- Production stage ---
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nextjs

# Copy standalone output from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

CMD ["node", "server.js"]
