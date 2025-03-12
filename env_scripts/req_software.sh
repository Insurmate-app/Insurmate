#! /bin/bash

# See Environment.md for full setup instructions
# This script will install all needed software on a new WSL instance
# Restart your instance after running this script

# Set to exit script on any error
set -e

# Protect current working directory from modification
sudo chattr +i $PWD

# Update/upgrade machine
sudo apt update
sudo apt upgrade -y

# Install Node.js
sudo apt install -y nodejs
node -v
which node
# Confirm Node is pointing to a binary on WSL
echo "Does the above output have a version number and point to /user/bin/<software>? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Proceeding..."
else
    echo "Operation canceled."
    exit 1
fi

# Install npm
sudo apt install -y npm
npm -v
which node
# Confirm npm is pointing to a binary on WSL
echo "Does the above output have a version number and point to /user/bin/<software>? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Proceeding..."
else
    echo "Operation canceled."
    exit 1
fi

# Install Docker
# Add Docker's official GPG key
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
# Add the repository to apt sources:
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && \
echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
# Installation step
sudo apt-get install docker-ce docker-ce-cli containerd.io -y
sudo apt install docker-buildx-plugin docker-compose-plugin -y
# Make docker usable without sudo
sudo usermod -aG docker $USER
# Configure docker to start on boot
sudo systemctl enable docker.service
sudo systemctl enable containerd.service

# Pull Dockerized MongoDB Image
docker pull mongodb/mongodb-community-server:latest

# Install jq
sudo apt install -y jq
jq --version
which jq
echo "Does the above output have a version number and point to /user/bin/<software>? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Proceeding..."
else
    echo "Operation canceled."
    exit 1
fi


# Blockchain required software
# It is important that the binaries are installed while in ../backend/blockchain or it won't work
cd  ../backend/blockchain
curl -sSL https://bit.ly/2ysbOFE | bash -s
# Add Fabric binaries to PATH (only if not already present)
fabric_bashrc="$HOME/.bashrc"

if ! grep -q "FABRIC_CFG_PATH" "$fabric_bashrc"; then
    echo "Configuring Fabric environment variables..."
    {
        echo 'export PATH=$PWD/bin:$PATH'
        echo 'export FABRIC_CFG_PATH=$PWD/config'
        echo 'export CORE_PEER_TLS_ENABLED=true'
        echo 'export CORE_PEER_LOCALMSPID=Org1MSP'
        echo 'export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/test-network/organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem'
        echo 'export CORE_PEER_MSPCONFIGPATH=${PWD}/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp'
        echo 'export CORE_PEER_ADDRESS=localhost:7051'
    } >> "$fabric_bashrc"
fi

source "$fabric_bashrc"

# Release protections on current working directory
sudo chattr -i $PWD

exit 0