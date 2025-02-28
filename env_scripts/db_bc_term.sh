#! /bin/bash

# Terminate Blockchain
cd ~/unomaha/backend/blockchain/test-network
./network.sh down

# Terminate mongo
cd ~/unomaha/db_docker_scripts
./mongo_db_remove.sh

exit 0