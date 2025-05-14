import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"], // Apply ESLint to all JavaScript files
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    files: ["**/*.js"], // Browser-specific configuration
    languageOptions: {
      globals: globals.browser, // Apply browser globals (like `window`, `document`)
    },
  },
  {
    files: ["**/*.js"], // Node.js-specific configuration
    languageOptions: {
      globals: {
        ...globals.node, // Include Node.js globals (like `process`, `global`)
      },
    },
  },
  pluginJs.configs.recommended,
];
