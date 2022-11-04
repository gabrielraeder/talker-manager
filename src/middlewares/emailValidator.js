const validateEmail = (e) => {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]/;
  return regex.test(e);
};

const emailValidator = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const validate = validateEmail(email);
  if (validate) {
    return next();
  } 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

module.exports = emailValidator;