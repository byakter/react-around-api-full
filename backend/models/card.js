const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        if (!/[-0-9A-Za-z]+$/.test(value)) return false;
        if (value.startsWith('http://') || value.startsWith('https://')) return true;
        return false;
      },
      message: (props) => `${props.value} is invalid link`,
    },
  },
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  likes: [
    {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
