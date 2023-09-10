const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(value) {
        if (!/[-0-9A-Za-z]+$/.test(value)) return false;
        if (value.startsWith('http://') || value.startsWith('https://')) return true;
        return false;
      },
      message: (props) => `${props.value} is invalid link`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
