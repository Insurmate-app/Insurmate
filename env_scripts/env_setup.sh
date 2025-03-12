#! /bin/bash

# See Environment.md for manaual setup instructions
# This script assumes you are setting up on an Debian/Ubuntu WSL. It should also work on a Debian/Ubuntu standalone machine.
# Prerequisites: Manually install or run req_software.sh to install required software

# Set script to exit after an error occurs
set -e

# Update/upgrade instance
sudo apt update
sudo apt upgrade -y

# Install Dependencies (each directory has a package.json file)
cd ../frontend
npm install

cd ../backend
npm install

cd ../backend/blockchain
npm install

cd backend
npm install

# Start Dockerized MongoDB
cd ../../../db_docker_scripts
bash mongo_db_restart.sh

# Launch Blockchain Network
cd ../backend/blockchain/test-network
./network.sh down
./network.sh up -ca
./network.sh createChannel -c mychannel
# Install and instantiate Chaincode
./network.sh deployCC -ccn basic -ccp ../chaincode-javascript/ -ccl javascript
# Enroll Users
cd ../backend/src
node caActions.js admin org1
node caActions.js user org1 org1user1

exit 0