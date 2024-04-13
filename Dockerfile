FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --legacy-peer-deps

COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci --no-audit --no-fund

COPY . .
