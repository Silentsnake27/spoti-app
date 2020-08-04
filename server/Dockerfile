
FROM node:12.16.1-alpine

RUN mkdir -p /node/app/node_modules && chown -R node:node /node/app

WORKDIR /node/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

# EXPOSE 8080

CMD [ "npm", "start" ]