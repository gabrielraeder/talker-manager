const express = require('express');
const fs = require('../fsUtils');
const generator = require('../tokenGenerator');

const router = express.Router();

const savetoken = {};

router.post('/', async (req, res) => {
  const token = generator();
  savetoken.token = token;
  return res.status(200).json({ token });
});

module.exports = router;