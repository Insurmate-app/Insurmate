#! /bin/bash

# Launch Blockchain Network
cd ~/unomaha/backend/blockchain/test-network
./network.sh down
./network.sh up -ca
./network.sh createChannel -c mychannel
# Install and instantiate Chaincode
./network .sh deployCC -ccn basic -ccp ../chaincode-javascript/ -ccl javascript
# Enroll Users
cd ~/unomaha/backend/blockchain/backend/src
node caActions.js admin org1
node caActions.js user org1 org1user1

#Start MongoDB
cd ~/unomaha/db_docker_scripts
./mongo_db_restart.sh

exit 0