const validateLength = (token) => token.length === 16 && typeof token === 'string';

const tokenValidator = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const validToken = validateLength(token);
  if (validToken) {
    return next();
  }
  return res.status(401).json({ message: 'Token inválido' });
};

module.exports = tokenValidator;
