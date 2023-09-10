const jwt = require('jsonwebtoken');
const ERRORS = require('../utils/Errors');

module.exports.auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    const err = new ERRORS.ForbiddenError();
    throw err;
  }
  const token = header.split(' ')[1];
  if (!token) {
    const err = new ERRORS.ForbiddenError();
    throw err;
  }
  try {
    const payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    req.user = payload;
    next();
  } catch (error) {
    const err = new ERRORS.UnauthorizedError();
    next(err);
  }
};
