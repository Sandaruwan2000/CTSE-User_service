const notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'Internal server error';

  if (statusCode >= 500) {
    console.error(`Unhandled error on ${req.method} ${req.originalUrl}: ${message}`);
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && err.stack ? { stack: err.stack } : {}),
  });
};

module.exports = { notFound, errorHandler };
