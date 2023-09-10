const MSG_NOT_FOUND = 'Card or user not found';
class NotFoundError extends Error {
  constructor(message = MSG_NOT_FOUND) {
    super(message);
    this.code = 404;
  }
}

module.exports = NotFoundError;
