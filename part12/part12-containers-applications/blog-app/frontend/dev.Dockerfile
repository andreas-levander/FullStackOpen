FROM node:16-alpine

RUN mkdir /usr/app && chown node:node /usr/app

WORKDIR /usr/app

USER node

COPY --chown=node:node package*.json .

RUN npm install

COPY --chown=node:node . .

CMD ["npm", "start"]