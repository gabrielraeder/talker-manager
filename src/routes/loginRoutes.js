const express = require('express');
const emailValidator = require('../middlewares/emailValidator');
const passwordValidator = require('../middlewares/passwordValidator');
const generator = require('../tokenGenerator');

const router = express.Router();

const savetoken = {};

router.post('/', emailValidator, passwordValidator, async (req, res) => {
  const token = generator();
  savetoken.token = token;
  return res.status(200).json({ token });
});

module.exports = router;