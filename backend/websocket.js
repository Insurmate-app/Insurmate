const WebSocket = require("ws");

let wss;

const initializeWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection established");

    // Handle messages from the client
    ws.on("message", (message) => {
      console.log("Received from client:", message);
    });

    // Handle WebSocket disconnections
    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });

  console.log("WebSocket server initialized");
};

// Helper function to broadcast messages
const broadcastData = (data) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  } else {
    console.error("WebSocket server not initialized");
  }
};

module.exports = { initializeWebSocket, broadcastData };
