### Interns

- Brain Tran, Henry Nguyen, Jonah Nathan, Matthew Fuentes James

### Senior Software Engineer

- Dr. Cristian Mateos ( [Website](https://users.exa.unicen.edu.ar/~cmateos/) )

### Product Owner

- Toe Arkar ( [GitHub](https://github.com/Toe12) )

![mortgage_policy_exchange_workdlow.png](mortgage_policy_exchange_workdlow.png)

```mermaid
graph TD

    %% Add title
    Title["Mortgage Process with Blockchain Integration"]:::titleStyle

    %% Define custom CSS styles
    classDef nodeStyle fill:#f9f9f9,stroke:#333,stroke-width:2px,font-size:14px;
    classDef processStyle fill:#e0e0e0,stroke:#5A5A5A,stroke-width:2px,font-size:14px;
    classDef subgraphStyle fill:#f1f3f5,stroke:#007ACC,stroke-width:2px,font-size:14px;

    A[Homebuyer] -->|Submits Loan Application| B(Bank)
    B -->|Approves Loan| C[Homebuyer Proceeds with Purchase]
    C -->|Requires Mortgage Insurance| D[Homeowner]
    D -->|Submits Insurance Request| E[Insurance Provider/ Insurance Broker]
    E -->|Uploads Mortgage Policy | F[Blockchain Network]
    F -->|Secures Policy Transactions| G[Access Control System]

    G -->|Manages Authentication| D
    G -->|Manages Authorization| B
    G -->|Manages User Profiles| E

    subgraph Policy Exchange on Blockchain
        F -->|Facilitates Policy Transfer| B
        F -->|Facilitates Policy Transfer| D
        F -->|Facilitates Policy Transfer| E
    end

    %% Apply styles
    class A,B,C,D,E,F,G nodeStyle;
    class F,G processStyle;
    class Policy_Exchange_on_Blockchain subgraphStyle;
```

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
        NodeJS <-->|HTTP| React
    end

    subgraph Object Storage
        direction TB
        Storage[OCI or Amazon S3]
    end

    subgraph Text Extraction
        direction TB
        Textract[Amazon Textract]
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
