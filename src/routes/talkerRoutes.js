const express = require('express');
const fs = require('../fsUtils');
const ageValidator = require('../middlewares/ageValidator');
const nameValidator = require('../middlewares/nameValidator');
const rateValidator = require('../middlewares/rateValidator');
const talkValidator = require('../middlewares/talkvalidator');
const tokenValidator = require('../middlewares/tokenValidator');
const watchedAtValidator = require('../middlewares/watchedAtValidator');

const router = express.Router();

router.get('/search', tokenValidator, async (req, res) => {
  try {
    const { q } = req.query;
    const talkers = await fs.readJSON();
    if (!q) {
      return res.status(200).json(talkers);
    }
    const filtered = talkers.filter((t) => t.name.includes(q));
    return res.status(200).json(filtered);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await fs.readJSON();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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
  try {
    const data = req.body;
    const added = await fs.addDataJSON(data);
    return res.status(201).json(added);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put('/:id',
tokenValidator,
nameValidator,
ageValidator,
talkValidator, 
watchedAtValidator,
rateValidator, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await fs.updateJSON(+id, data);
    return res.status(200).json(updated);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete('/:id', tokenValidator, async (req, res) => {
  try {
    const { id } = req.params;
    await fs.deleteByID(+id);
    return res.status(204).json();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
