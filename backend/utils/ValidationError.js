const MSG_VALIDATION = 'Invalid data passed to create a card/user or updating a user\'s avatar/profile';
class ValidationError extends Error {
  constructor(message = MSG_VALIDATION) {
    super(message);
    this.code = 400;
  }
}

module.exports = ValidationError;
