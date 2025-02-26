#! /bin/bash
#This script will install all needed software on a new WSL instance
#restart your instance after 

#install GitHub CLI
sudo apt update
sudo apt install gh -y

#install Node.js
sudo apt install nodejs -y
node -v
which node
#confirm Node is pointing to a binary on WSL
echo "Does the above output have a version number and point to /user/bin? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Proceeding..."
else
    echo "Operation canceled."
    exit 1
fi

#install npm
sudo apt install npm -y
npm -v
which node
#confirm npm is pointing to a binary on WSL
echo "Does the above output have a version number and point to /user/bin? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Proceeding..."
else
    echo "Operation canceled."
    exit 1
fi

#Install Docker
#Add Docker's official GPG key
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
#add the repository to apt sources:
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && \
echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
#installation step
sudo apt-get install docker-ce docker-ce-cli containerd.io -y
docker-buildx-plugin docker-compose-plugin
#make docker usable without sudo
sudo groupadd docker
sudo usermod -aG docker $USER
#configure docker to start on boot
sudo systemctl enable docker.service
sudo systemctl enable containerd.service

#Install Dockerized MongoDB
docker pull mongdb/mongodb-community-server:latest
cd ~unomaha/db_docker_scripts
./mongo_db_restart.sh
./mongo_db_restart.sh #needs to be run to start mongodb
