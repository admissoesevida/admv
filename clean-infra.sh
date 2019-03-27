#!/bin/bash

docker stop $(docker ps -a | grep admv- | awk '{print $1}')
docker rm -f $(docker ps -a | grep admv- | awk '{print $1}')