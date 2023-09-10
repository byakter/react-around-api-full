class UnauthorizedError extends Error {
  constructor(message = 'unauthorized') {
    super(message);
    this.code = 400;
  }
}

module.exports = UnauthorizedError;
