const ValidationError = 'ValidationError';
const CardNotFoundError = 'CardNotFoundError';
const UserNotFoundError = 'UserNotFoundError';
const internalError = 'internalError';
const CODE_VALIDATION = 400;
const CODE_UNAUTHORIZED = 401;
const CODE_NOT_FOUND = 404;
const CODE_INTERNAL_ERROR = 500;
const MSG_VALIDATION = 'Invalid data passed to create a card/user or updating a user\'s avatar/profile';
const MSG_NOT_FOUND = 'Card or user not found';
const MSG_INTERNAL_ERROR = 'Something went wrong on the server';
const CastError = 'CastError';
const authError = 'authError';

const errorMap = {
  [ValidationError]: { code: CODE_VALIDATION, message: MSG_VALIDATION },
  [CardNotFoundError]: { code: CODE_NOT_FOUND, message: MSG_NOT_FOUND },
  [UserNotFoundError]: { code: CODE_NOT_FOUND, message: MSG_NOT_FOUND },
  [internalError]: { code: CODE_INTERNAL_ERROR, message: MSG_INTERNAL_ERROR },
  [CastError]: { code: CODE_VALIDATION, message: MSG_VALIDATION },
  [authError]: { code: CODE_UNAUTHORIZED, message: 'unauthorized' },

};

module.exports = {
  internalError,
  errorMap,
  ValidationError,
  UserNotFoundError,
  CardNotFoundError,
  CastError,
  CODE_NOT_FOUND,
  authError,
};
