1. Install WSL
    - Open a PowerShell Prompt
	```PowerShell
	wsl.exe --install
	```
    - Once its installed, cd to your home directory and update
	```bash
	cd ~
	sudo apt update
	sudo apt install && sudo apt upgrade
	```

2. Install GitHub CLI so you can cache your GitHub credentials with a Personal Access Token (PAT)
	```bash
	sudo apt update
	sudo apt install gh
	```

3. Generate your PAT
	- Go to your GitHub account settings
	- Scroll down until you see "Developer Settings" in the lefthand column
	- Click on Personal Access Tokens, then Tokens (classic)
	- Click on Generate new token, then Generate new token (classic)
	- Enter whatever you want in the Note field
	- Set the expiration date to May 9th (the last day of classes) ... or whatever you want
	- Allow all permissions (I kept having issues when trying to pick and choose so I'm not sure what the essential ones are)
	- Copy your PAT after generating it

4. Sign into GitHub CLI
	```bash
	gh auth login
	```
	- select github.com
	- select HTTPS
	- type 'y'
	- arrow down to "paste an authentication token"
	- paste the PAT you generated earlier

5. Clone the repository
	```bash
	gh repo clone Insurmate-app/unomaha
	```

6. Install Node.js
	```bash
	sudo apt install nodejs
	sudo apt install npm
	node -v
	which node
	npm -v
	which npm
	```
	- note: ensure that node and npm reside in /usr/bin and NOT /mnt/c/program files/...

7. Install docker
	```bash
	# Add Docker's official GPG key:
	sudo apt-get update
	sudo apt-get install ca-certificates curl
	sudo install -m 0755 -d /etc/apt/keyrings
	sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
	sudo chmod a+r /etc/apt/keyrings/docker.asc

	# Add the repository to Apt sources:
	echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	sudo apt-get update

	#install Docker
	sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

	#add docker group so you can use docker without sudo (may already be present)
	sudo groupadd docker
	sudo usermod -aG docker $USER

	#reboot your machine, then try the following
	docker run hello-world

	#configure docker to start on boot
	sudo systemctl enable docker.service
	sudo systemctl enable containerd.service
	```

8. Install Dockerized MongoDB
	```bash
	docker pull mongodb/mongodb-community-server:latest

	#cd into mongo scripts
	cd ~/unomaha/db_docker_scripts

	#run mongo restart script
	cd ~/unomaha/db_docker_scripts
	./mongo_db_restart.sh
	
	#run it again to start mongodb
	./mongo_db_restart.sh
	```
9. Install Dependencies
	```bash
	cd ~/unomaha/frontend
	npm install

	cd ~/unomaha/backend
	npm install

	cd ~/unomaha/backend/blockchain
	npm install

	cd ~/unomaha/backend/blockchain/backend
	npm install
	```

10. Install jq
	```bash
	cd ~
	sudo apt install -y jq
	jq --version
	```

11. Blockchain Network Setup
	```bash
	#Install Fabric Samples, Binaries, Docker images
	cd ~/unomaha/backend/blockchain
	curl -sSL https://bit.ly/2ysbOFE | bash -s

	#Add fabric binaries to your PATH
	echo 'export PATH=$PWD/bin:$PATH' >> ~/.bashrc
	echo 'export FABRIC_CFG_PATH=$PWD/config' >> ~/.bashrc
	echo 'export CORE_PEER_TLS_ENABLED=true' >> ~/.bashrc
	echo 'export CORE_PEER_LOCALMSPID=Org1MSP' >> ~/.bashrc
	echo 'export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/test-network/organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem' >> ~/.bashrc
	echo 'export CORE_PEER_MSPCONFIGPATH=${PWD}/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp' >> ~/.bashrc
	echo 'export CORE_PEER_ADDRESS=localhost:7051' >> ~/.bashrc

	source ~/.bashrc

	#Launch the network
	cd ~/unomaha/backend/blockchain/test-network
	./network.sh down
	./network.sh up -ca
	./network.sh createChannel -c mychannel

	#Install and instantiate Chaincode (note: you will need to do this each time you restart the blockchain network)
	./network.sh deployCC -ccn basic -ccp ../chaincode-javascript/ -ccl javascript

	#Enroll Users
	cd ~/unomaha/backend/blockchain/backend/src

	#You can find what users we have in ~/unomaha/backend/blockchain/test-network/organizations/peerOrganizations
	#We should initially only have two users: org1 and org2
	#DON'T use OrdererOrg as a user. Documentation states that it shouldn't be used

	#add an admin organization
	node caActions.js admin org1 #or org2

	#add a user to that admin organization
	node caActions.js user org1 org1user1

	#verify that hyperledger is running in docker
	docker ps
	```
12. Editing Code hosted on WSL / editing environment variables to run locally
	- Open VSCode on your Windows machine
	- Search for and install the WSL extension
	- Close you VSCode window and reopen it
	- Click on the icon on the bottom left that looks like two arrows stacked on each other
	- Click on connect to WSL (if you have multiple distros installed, click on the option below it and select the distro you installed everything on)
	- Open the folder you cloned the repository into (unomaha by default)

	- Navigate to unomaha/backend/.env
	- Delete this line:
	```bash
	FRONTEND_URL=https://www.insurmate.app
	```
	- Replace with this:
	```bash
	#remote
	#FRONTEND_URL=https://www.insurmate.app
	#local
	FRONTEND_URL=http://localhost:3000
	```
	- Navigate to unomaha/frontend
	- Delete everything except `VITE_TOKEN_NAME=app`
	- Replace with this:
	```bash
	#remote
	#VITE_API_BASE_URL=https://api-staging-insurmate.com/v1/api
	#local
	VITE_API_BASE_URL = http://localhost:3000/v1/api

	#remote
	#VITE_WS_URL=wss://api-staging-insurmate.com
	#localhost
	VITE_WS_URL = ws://localhost:3000
	```
	- IMPORTANT NOTE: when we commit to the repo, we'll need to switch these back to remote variables

13. Install MongoDB VSCode extension
    - This step isn't really needed for our env setup, but it might come in handy later
    - Ensure that your VSCode has started a remote session for your WSL
    - Search for and install "MongoDB for VSCode"

14. Run the app
	- The best way I've found to do it is open two separate terminal sessions for your WSL
	- In one terminal session:
	```bash
	cd ~/unomaha/backend
	npm run dev
	```
	- In the other:
	```bash
	cd ~/unomaha/frontend
	npm run dev
	```

	- Now navigate to http://localhost:4321 and see if the website shows up
	- Make a burner email account and sign it up to the site. It should generate and allow you to use an OTP

	- Navigate to http://localhost:3000
	- Make sure it outputs "App is working CD Test No[1]!"

15. Termination of processes:
	- To terminate the frontend and backend use the ol' ctrl + c. The backend will throw an error that we can fix later.
	- To terminate MongoDB:
	```bash
	cd ~/unomaha/db_docker_scripts
	./mongo_db_remove.sh
	```
	- To terminate the Blockchain Network:
	```bash
	cd ~/unomaha/backend/blockchain/test-network
	./network.sh down
	```