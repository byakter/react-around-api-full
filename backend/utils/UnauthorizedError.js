class UnauthorizedError extends Error {
  constructor(message = 'unauthorized') {
    super(message);
    this.code = 401;
  }
}

module.exports = UnauthorizedError;
