FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

COPY . .
# npm start is the command to start the application in development mode
CMD ["npm", "start"]