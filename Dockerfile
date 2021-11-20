FROM node:16.13.0 AS builder

USER node

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

COPY --chown=node:node tsconfig.json tsconfig.build.json nest-cli.json ./
COPY --chown=node:node src ./src

RUN npm run build


FROM node:16.13.0-alpine

USER node

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node --from=builder /home/node/app/package.json /home/node/app/package-lock.json ./
COPY --chown=node:node --from=builder /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/dist ./dist

RUN npm prune --production

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
