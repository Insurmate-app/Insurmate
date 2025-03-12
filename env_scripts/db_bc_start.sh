#! /bin/bash

# Set Script to exit on error
set -e

# Launch Blockchain Network
cd ../backend/blockchain/test-network
./network.sh down
./network.sh up -ca
./network.sh createChannel -c mychannel
# Install and instantiate Chaincode
./network.sh deployCC -ccn basic -ccp ../chaincode-javascript/ -ccl javascript
# Enroll Users
cd ../../blockchain/backend/src
node caActions.js admin org1
node caActions.js user org1 org1user1

# Start MongoDB
cd ../../../../db_docker_scripts
echo $PWD
./mongo_db_init.sh

exit 0