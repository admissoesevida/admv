#!/bin/bash

docker-compose up -d --build --remove-orphans

npm run install:full