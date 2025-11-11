// Centralized error-handling middleware
export const errorHandler = (err, req, res, next) => {
  // Use provided status code or default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Send JSON response with error message
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

