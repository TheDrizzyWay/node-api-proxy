/* eslint-disable linebreak-style */
const express = require('express');

const publisher = require('../services/publisher');

const router = express.Router();

router.get('/', publisher);

module.exports = router;
