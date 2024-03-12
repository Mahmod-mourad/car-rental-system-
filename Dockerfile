FROM node:20-alpine3.19

WORKDIR /app

# Copy lock files first for better caching
COPY package-lock.json package.json ./

# Install dependencies using npm ci
RUN npm ci --no-audit --no-fund

# Copy entire project including tests and source code
COPY . .

# Build the Next.js frontend
RUN npm run build

# Expose ports for frontend and backend
EXPOSE 3000 3001 5432

# Default command to run tests
CMD ["npm", "test"]
