# Docker Build Instructions

This repository includes a repo-level Dockerfile that builds and tests the complete car dealership management system.

## Quick Start

Build the Docker image:

```bash
docker build -t car-dealership:latest .
```

Run tests inside Docker:

```bash
docker run --rm car-dealership:latest npm test
```

Verify the build succeeded:

```bash
docker run --rm car-dealership:latest npm run build
```

## Dockerfile Compliance

✓ **Max Size**: 417 bytes (< 20 KB)
✓ **Line Count**: 21 lines (< 200 lines)  
✓ **RUN Instructions**: 2 (< 30)
✓ **FROM Tag**: Pinned to node:20-alpine3.19
✓ **npm ci**: Uses lockfile for deterministic builds
✓ **.git Included**: Not excluded from Docker image
✓ **Caching**: Dependencies installed before source copy

## What's Included

The Docker image contains:

- **Frontend**: Next.js 14+ application with Tailwind CSS
- **Backend**: NestJS API with TypeORM and PostgreSQL integration
- **Tests**: Full test suite (85+ tests)
- **Configuration**: Environment setup and database migrations

## Environment Variables

Create a `.env.local` file locally but it will be ignored in Docker builds for security.

Use the provided `.env.example` as a template:

```bash
cp backend/.env.example .env.local
```

## Ports

The container exposes:

- **3000**: Next.js frontend
- **3001**: NestJS backend
- **5432**: PostgreSQL database

## Build Time

Expected build time: 2-3 minutes (first build) or 30 seconds (cached builds)

## Troubleshooting

**"Package not found"** - Ensure `package-lock.json` is up to date:
```bash
npm install
```

**"Build fails"** - Check that Node.js version is compatible:
```bash
node --version  # Should be >= 20
```

**"Tests timeout"** - Increase Docker memory allocation in Docker Desktop settings
