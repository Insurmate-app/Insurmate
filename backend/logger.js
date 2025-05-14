// logger.js
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  level: "info", // Set the log level
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }), // Log to a file
  ],
});

module.exports = logger;
