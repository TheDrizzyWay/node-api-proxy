/* eslint-disable linebreak-style */
const express = require('express');

const weather = require('./weather');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/weather', weather);

module.exports = router;
