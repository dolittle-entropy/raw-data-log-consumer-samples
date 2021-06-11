FROM node:15.8.0-slim AS base

WORKDIR /app
COPY dist/esbuild/ ./

CMD ["node", "cli.js"]
