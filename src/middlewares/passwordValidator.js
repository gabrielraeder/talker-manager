const validatePassword = (pword) => pword.length >= 6;

const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  const validate = validatePassword(password);
  if (validate) {
    return next();
  } 
  return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

module.exports = passwordValidator;
