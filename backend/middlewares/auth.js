const jwt = require('jsonwebtoken');
const { authError } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send();
    return;
  }
  try {
    const payload = jwt.verify(token, 'your-secret-key');
    req.user = payload;
    next();
  } catch (error) {
    const err = new Error();
    err.name = authError;
    next(err);
  }
};
