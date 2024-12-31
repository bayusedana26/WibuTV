const express = require('express');
const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');

const configureMiddleware = (app) => {
  // Body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // File upload and static files
  app.use(fileUpload());
  app.use(express.static("public"));

  // Security middleware
  app.use(mongoSanitize());
  app.use(xss());
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 100,
  });
  app.use(limiter);

  // Additional security
  app.use(hpp());
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(cors());
};

module.exports = configureMiddleware; 