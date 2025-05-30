### Express JS Architecture

```mermaid
flowchart LR
    A[Request] --> B[Routes/Routers]
    B --> C[Controllers]
    C -.->|HTTP/Express context terminates here| D[Services]
    D --> E[Database Access/Models]
    D --> F[External APIs]
    E --> G[(Database / Persistent Storage)]
    F --> G
    D --> DTO[DTO Layer]
    DTO --> H[Response]

    subgraph Express REST API
        B
        C
        D
        DTO
        E
    end

    subgraph External Stuff
        F
        G
    end

```

### MongoDB Setup

Note: If you are using GitHub Codespaces, ensure that you install Docker by following the instructions in /backend/blockchain/README.md.

1. **Restart MongoDB**  
   Run the script to restart MongoDB:

   ```bash
   ../db_docker_scripts/mongo_db_restart.sh
   ```

2. **Remove MongoDB**  
   If you need to remove the MongoDB container and associated volumes, use:
   ```bash
   ../db_docker_scripts/mongo_db_remove.sh
   ```

### Starting the Node.js Application

To start the Node.js application, follow these steps:

1. **Navigate to the Backend Folder**  
   Ensure you're in the backend directory:

   ```bash
   cd backend
   ```

2. **Install Dependencies**  
   Download all required npm packages from `package.json`:

   ```bash
   npm install
   ```

3. **Run the Development Server**  
   Start the application in development mode:
   ```bash
   npm run dev
   ```
