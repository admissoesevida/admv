#!/bin/bash

SERVICE_ID=${1-api}

CONTAINER_ID=$(docker ps | grep admv-$SERVICE_ID | awk '{print $1}')

docker stop $CONTAINER_ID

docker rm $CONTAINER_ID