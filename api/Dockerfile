FROM node:8.15.1-stretch-slim

WORKDIR /api

EXPOSE 5000

ADD . .

RUN rm .env

COPY ./tmp/.env .env

RUN npm install

CMD [ "npm", "run", "dev" ]