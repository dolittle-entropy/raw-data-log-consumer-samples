# Example of consuming raw-data-log

This repo is best described as "glue", and is reflected in the mix and match


- Raw data log, currently backed by "nats / stan" to store raw events
- Shows how to listen for interested events
- React to the event and send to teams.
- The UI is written in svelte and uses a different build step (a messy world).

# Run
## Backend
```sh
cd backend
yarn install
yarn esbuild-node:watch --platform=node
```

## Frontend
```sh
cd frontend
npm install
npm run dev
```

# Build
```
docker build -f ./Dockerfile -t dolittle/nats-reader:favouritecolour .
docker tag dolittle/nats-reader:favouritecolour 453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/nats-reader:favouritecolour
docker push 453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/nats-reader:favouritecolour
```

# Reference
- [TypeScript Boilerplate for 2021](https://github.com/metachris/typescript-boilerplate/)
