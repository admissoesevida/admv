#!/bin/bash

docker stop $(docker ps | grep admv- | awk '{print $1}')
docker rm -f $(docker ps | grep admv- | awk '{print $1}')