#!/bin/bash

SERVICE_ID=${1-api}

CONTAINER_ID=$(docker ps -aqf name=admv-$SERVICE_ID)

if [ ! -z "$CONTAINER_ID" ]; then
  echo "Stopping and removing container $CONTAINER_ID from service admv-$SERVICE_ID"
  docker stop $CONTAINER_ID > /dev/null
  docker rm $CONTAINER_ID > /dev/null
else
  echo "There is no container for this service: admv-$SERVICE_ID"
fi
