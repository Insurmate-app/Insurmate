const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production", // Or 'development' depending on your environment
  entry: "./app.js", // Entry point for your application
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js", // Output bundle
  },
  target: "node", // Set Webpack target to Node.js environment
  externals: [nodeExternals()], // Exclude node_modules from being bundled
};

// need to install 
// npm install -g node-gyp
