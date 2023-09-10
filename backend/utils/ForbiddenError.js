const MSG_FORBIDDEN = 'You don\'t have premission';
class ForbiddenError extends Error {
  constructor(message = MSG_FORBIDDEN) {
    super(message);
    this.code = 403;
    this.name = 'forbiddenError';
  }
}

module.exports = ForbiddenError;
