#!/bin/bash

CONTAINER=${1-api}

docker logs admv-$CONTAINER -f