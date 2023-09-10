const MSG_CONFLICT = 'Email allready exict';
class Conflict extends Error {
  constructor(message = MSG_CONFLICT) {
    super(message);
    this.code = 409;
  }
}

module.exports = Conflict;
