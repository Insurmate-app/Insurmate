!# /bin/bash

cd ~/unomaha/backend/blockchain/test-network
./network.sh down
./network.sh up -ca
./network.sh createChannel -c mychannel