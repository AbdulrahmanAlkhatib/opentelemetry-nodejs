FROM node:10-alpine as build-step

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "index.js"]

