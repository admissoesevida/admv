FROM node:8.15.1-stretch-slim

WORKDIR /api

ENV DB_PASSWORD=rootpassword
ENV DB_USERNAME=root
ENV DB_DATABASE=admv
ENV DB_HOST=172.17.0.1
ENV DB_PORT=33060
ENV CODECOV_TOKEN=d7ee1e14-fa20-4166-b3ec-c8ba27fd3ab1

EXPOSE 5000

ADD . .

RUN npm install

CMD [ "npm", "run", "dev" ]