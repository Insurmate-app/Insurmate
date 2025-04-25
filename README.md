## Collaborators 
### Fall 2024 
- Brain Tran, Henry Nguyen, Jonah Nathan, Matthew Fuentes James

### Spring 2025
- Ben Wesch, Evan Hoffschneider, Rashawn Thompson, Vincent Buda

### Senior Software Engineer

- Cristian Mateos, PhD ( [Link](https://users.exa.unicen.edu.ar/~cmateos/) )

### Product Owner

- Toe Arkar ( [Link](https://toearkar.vercel.app/) )

### Acknowledgements

This project is developed in collaboration with the University of Nebraska Omaha (UNO). We extend our gratitude to UNO for their support and resources in making this blockchain-based mortgage policy exchange system possible.

Special thanks to:
- Harvey Siy, PhD, Alfredo Perez, PhD 

![mortgage_policy_exchange_workdlow.png](mortgage_policy_exchange_workdlow.png)

```mermaid
graph TB;

    subgraph Blockchain Network
        direction TB
        Peer1[Peer 1]
        Peer2[Peer 2]
        Orderer[Orderer]
        Peer1 <--> Orderer
        Peer2 <--> Orderer
    end

    subgraph Application Layer
        direction TB
        NodeJS[Node.js Server]
        React[React UI]
        MongoDB[MongoDB]
        NodeJS <-->|HTTP| React
        NodeJS -->|Authenticates via JWT| MongoDB
    end

    subgraph Object Storage
        direction TB
        Storage[OCI or Amazon S3]
    end

    subgraph Text Extraction
        direction TB
        Textract[Amazon Textract / LLM Solutions]
    end

    subgraph Cloud Infrastructure
        direction TB
        OCI[Oracle Cloud Infrastructure]
    end

    subgraph Container Management
        direction TB
        Docker[Docker]
    end

    subgraph Code Repository
        direction TB
        GitHub[GitHub Repository]
    end

    Peer1 <-->|gRPC| NodeJS
    Peer2 <-->|gRPC| NodeJS
    React -->|Uploads| Storage
    Storage --> Textract
    Textract --> NodeJS
    OCI --> Docker
    Docker --> NodeJS
    NodeJS --> GitHub
    React --> GitHub
```
