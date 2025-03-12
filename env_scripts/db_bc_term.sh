#! /bin/bash

# Set script to exit on error
set -e

# Terminate Blockchain
cd ../backend/blockchain/test-network
./network.sh down

# Terminate mongo
cd ../../../db_docker_scripts
./mongo_db_remove.sh

exit 0