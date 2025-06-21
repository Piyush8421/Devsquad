const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
    error: 'The requested resource was not found on this server',
    timestamp: new Date().toISOString()
  });
};

module.exports = notFound;
