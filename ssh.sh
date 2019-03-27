#!/bin/bash

CONTAINER=${1-api}

docker exec -it admv-$CONTAINER bash