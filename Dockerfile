# ---------- Build stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the app (tsc + vite build)
RUN yarn build


# ---------- Production stage ----------
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose required port
EXPOSE 5173

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
