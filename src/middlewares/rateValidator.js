const rateValidator = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const between = rate >= 1 && rate <= 5;
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (Number.isInteger(rate) && between) {
    return next();
  }
  return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
};

module.exports = rateValidator;
