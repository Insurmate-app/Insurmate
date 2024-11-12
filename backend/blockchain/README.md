# **Using Node.js as an Application Developer with Hyperledger Fabric**

This guide covers prerequisites, setup instructions, and steps for developing a Node.js application integrated with Hyperledger Fabric.

## Prerequisites

### For macOS:

1. **Homebrew**: Install [Homebrew](https://brew.sh) if it is not already installed.
2. **Docker Desktop**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop).
3. **Node.js, jq, and npm**: Install these packages via Homebrew:

   ```sh
   brew install node jq
   ```

### For Linux (if you are using Github codespaces):

Install `jq` on Ubuntu:

```bash
sudo apt update
sudo apt install -y jq
```

You can verify the installation by checking the version:

```bash
jq --version
```

1. **Update Package Index**

   ```bash
   sudo apt-get update
   ```

2. **Install Required Packages**

   ```bash
   sudo apt-get install -y \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```

3. **Add Docker’s Official GPG Key**

   ```bash
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
   sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   ```

4. **Set Up the Stable Repository**

   ```bash
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. **Update Package Index Again**

   ```bash
   sudo apt-get update
   ```

6. **Remove Conflicting Packages**

   ```bash
   sudo apt-get remove -y moby-cli moby-engine moby-buildx moby-compose moby-containerd moby-runc moby-tini
   sudo apt-get -y --fix-broken install
   ```

7. **Install Docker Engine**

   ```bash
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

8. **Verify the Installation**

   ```bash
   docker --version
   docker run hello-world
   ```

---

## Step 1: Install Fabric Samples, Binaries, and Docker Images

Run the following:

```sh
curl -sSL https://bit.ly/2ysbOFE | bash -s
```

---

## Step 2: Set Up Your Environment

### macOS:

Add Fabric binaries to your PATH by appending these lines to `.zshrc`:

```sh
echo 'export PATH=$PWD/bin:$PATH' >> ~/.zshrc
echo 'export FABRIC_CFG_PATH=$PWD/config' >> ~/.zshrc
echo 'export CORE_PEER_TLS_ENABLED=true' >> ~/.zshrc
echo 'export CORE_PEER_LOCALMSPID=Org1MSP' >> ~/.zshrc
echo 'export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/test-network/organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem' >> ~/.zshrc
echo 'export CORE_PEER_MSPCONFIGPATH=${PWD}/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp' >> ~/.zshrc
echo 'export CORE_PEER_ADDRESS=localhost:7051' >> ~/.zshrc
```

Source the profile:

```sh
source ~/.zshrc
```

### Linux:

Add Fabric binaries to your PATH by appending to `~/.bashrc`:

```sh
echo 'export PATH=$PWD/bin:$PATH' >> ~/.bashrc
echo 'export FABRIC_CFG_PATH=$PWD/config' >> ~/.bashrc
echo 'export CORE_PEER_TLS_ENABLED=true' >> ~/.bashrc
echo 'export CORE_PEER_LOCALMSPID=Org1MSP' >> ~/.bashrc
echo 'export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/test-network/organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem' >> ~/.bashrc
echo 'export CORE_PEER_MSPCONFIGPATH=${PWD}/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp' >> ~/.bashrc
echo 'export CORE_PEER_ADDRESS=localhost:7051' >> ~/.bashrc
```

Source the profile:

```sh
source ~/.bashrc
```

---

## Step 3: Launch the Test Network

1. **Navigate to the test network directory**:

   ```sh
   cd test-network
   ```

2. **Stop any existing network**:

   ```sh
   ./network.sh down
   ```

3. **Start the test network**:

   ```sh
   ./network.sh up -ca
   ```

4. **Create a channel**:

   ```sh
   ./network.sh createChannel -c mychannel
   ```

---

## Step 4: Install and Instantiate Chaincode

1. **Deploy the chaincode**:

   ```sh
   ./network.sh deployCC -ccn basic -ccp ../chaincode-javascript/ -ccl javascript
   ```

---

## Step 5: Set Up the Node.js Application

1. **Navigate to the application directory**:

   ```sh
   cd backend
   ```

2. **Install Node.js packages**:

   ```sh
   npm install
   ```

---

## Step 6: Enroll Users

1. **Enroll Admin User**:

   ```bash
   node caActions.js admin <orgName>
   ```

2. **Register and Enroll Application User**:

   ```bash
   node caActions.js user <orgName> <username>
   ```

---

## Step 7: Interact with the Application

1. **Go to the `src` directory**:

   ```bash
   cd src
   ```

2. **Start the Node.js application**:

   ```bash
   node app.js
   ```

---

## Step 8: Verify the Setup

1. **Check Docker containers** to ensure the Hyperledger Fabric components are running:

   ```sh
   docker ps
   ```

2. **Interact with the application** to confirm it communicates with Hyperledger Fabric as expected.

---

## Additional Resources

- [Hyperledger Fabric Documentation](https://hyperledger-fabric.readthedocs.io/en/release-2.2/)
- [Hyperledger Fabric Samples GitHub](https://github.com/hyperledger/fabric-samples)

---