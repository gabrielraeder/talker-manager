const express = require('express');
const fs = require('../fsUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await fs.readJSON();
  console.log(data);
  return res.status(200).json(data);
});

module.exports = router;
