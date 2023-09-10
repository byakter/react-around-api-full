const MSG_INTERNAL_ERROR = 'Something went wrong on the server';
class InternalError extends Error {
  constructor(message = MSG_INTERNAL_ERROR) {
    super(message);
    this.code = 500;
  }
}

module.exports = InternalError;
