FROM node:8.15.1-stretch-slim

WORKDIR /app

EXPOSE 3000

ADD . .

COPY ./tmp/.env ./.env

RUN npm install

CMD [ "npm", "run", "dev" ]