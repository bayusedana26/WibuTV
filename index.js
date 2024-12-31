require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const express = require("express");
const configureMiddleware = require('./config/middleware');
const configureRoutes = require('./config/routes');
const logger = require('./config/logger');

const app = express();

// Configure basic middleware
configureMiddleware(app);

// Configure routes
configureRoutes(app);

// Configure logging based on environment
logger.setup(app);

// Start server (except in test environment)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
