const express = require('express');
const fs = require('../fsUtils');
const ageValidator = require('../middlewares/ageValidator');
const nameValidator = require('../middlewares/nameValidator');
const rateValidator = require('../middlewares/rateValidator');
const talkValidator = require('../middlewares/talkvalidator');
const tokenValidator = require('../middlewares/tokenValidator');
const watchedAtValidator = require('../middlewares/watchedAtValidator');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await fs.readJSON();
  return res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readByID(+id);
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno' });
  }
});

router.post('/',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator, 
  watchedAtValidator,
  rateValidator, async (req, res) => {
  const data = req.body;
  const added = await fs.addDataJSON(data);
  return res.status(201).json(added);
});

module.exports = router;
