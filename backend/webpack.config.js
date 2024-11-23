const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    modules: [
      "node_modules", // Default node_modules resolution
      path.resolve(__dirname, "node_modules"), // Local node_modules fallback
    ],
  },
  target: "node", // Ensure Node.js runtime compatibility
  externals: [
    nodeExternals(), // Exclude node_modules automatically
    function ({ request }, callback) {
      // Exclude any module paths that match blockchain or other dynamic paths
      if (request.includes("blockchain")) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ],
  optimization: {
    minimize: false, // Disable code minimization for debugging
  },
  devtool: "source-map", // Enable source maps for easier debugging
};
