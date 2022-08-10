FROM node:16-alpine

RUN mkdir /usr/src && chown node:node /usr/src
WORKDIR /usr/src/

USER node

COPY --chown=node:node package*.json .

RUN npm install

ENV PATH /usr/src/node_modules/.bin:$PATH


COPY --chown=node:node . ./app

CMD ["nodemon", "./app/index.js"]