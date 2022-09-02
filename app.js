const express = require('express');
const router = require('./routes');
const cors = require('cors');

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(router);

  return app;
};

module.exports = { createApp };

