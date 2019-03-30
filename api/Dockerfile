FROM node:8.15.1-stretch-slim

WORKDIR /api

RUN npm install

ENV DB_PWD rootpassword

CMD [ "npm", "run", "dev" ]