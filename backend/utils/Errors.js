const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');
const Conflict = require('./Conflict');
const ForbiddenError = require('./ForbiddenError');
const InternalError = require('./InternalError');
const ValidationError = require('./ValidationError');

module.exports = {
  NotFoundError, UnauthorizedError, Conflict, ForbiddenError, InternalError, ValidationError,
};
