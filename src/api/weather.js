/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

module.exports = router;
