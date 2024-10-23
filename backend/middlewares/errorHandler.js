const errorHandler = (err, req, res, next) => {
  // If statusCode is not set, default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Send the error message along with the correct status code
  res.status(statusCode).json({
    statusCode,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
