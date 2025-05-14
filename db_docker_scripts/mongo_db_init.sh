#!/bin/bash

docker run --name mongodb \
  -v mongodata:/data/db \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=mongo \
  -e MONGO_INITDB_ROOT_PASSWORD=mongo \
  -e MONGO_INITDB_DATABASE=dev \
  -d mongo:latest
