const express = require('express');
const fs = require('../fsUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await fs.readJSON();
  console.log(data);
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

module.exports = router;
