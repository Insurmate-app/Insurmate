#!/bin/bash

docker container stop mongodb
docker container rm mongodb
docker volume rm mongodata
