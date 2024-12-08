### Interns

- Brain Tran, Henry Nguyen, Jonah Nathan, Matthew Fuentes James

### Senior Software Engineer

- Dr. Cristian Mateos ( [Website](https://users.exa.unicen.edu.ar/~cmateos/) )

### Product Owner

- Toe Arkar ( [GitHub](https://github.com/Toe12) )

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
