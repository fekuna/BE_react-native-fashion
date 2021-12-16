FROM node:lts-alpine

RUN apk add --update nodejs npm

WORKDIR /app

COPY package*.json ./

# RUN npm install -g yarn && yarn

COPY . .

EXPOSE 3000

CMD yarn start:dev