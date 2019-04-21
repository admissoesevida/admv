#!/bin/bash

SERVICE_ID=${1-api}
SERVICE_CONTAINER_PORT=${2-5000}
SERVICE_HOST_PORT=${3-$SERVICE_CONTAINER_PORT}

echo "Going to run $SERVICE_ID on port $SERVICE_HOST_PORT (internal $SERVICE_CONTAINER_PORT)"

echo "Copying config files to temp folder..."
mkdir ./$SERVICE_ID/tmp
cp /keybase/team/admv/$SERVICE_ID/.env ./$SERVICE_ID/tmp

echo "Building docker image..."
docker build ./$SERVICE_ID -t admv-$SERVICE_ID > /dev/null

CONTAINER_ID=$(docker ps -aqf name=admv-$SERVICE_ID)

if [ ! -z "$CONTAINER_ID" ]; then
  echo "Removing old container..."
  docker rm -f $CONTAINER_ID
fi

echo "Running $SERVICE_ID on port $SERVICE_HOST_PORT"
docker run --add-host="localhost:172.17.0.1" -td -p$SERVICE_CONTAINER_PORT:$SERVICE_HOST_PORT --name admv-$SERVICE_ID admv-$SERVICE_ID > /dev/null

echo "Cleaning up temp files..."
rm -rf ./$SERVICE_ID/tmp

echo "Done"