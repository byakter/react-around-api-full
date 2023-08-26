const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const constants = require('../utils/constants');

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const usersData = await User.find();
    res.send(usersData);
  } catch (error) {
    next(error);
    // res.status(500).send('Server Error');
  }
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const err = new Error('No card found with that id');
      err.name = constants.UserNotFoundError;
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserData = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      const err = new Error('No card found with that id');
      err.name = constants.UserNotFoundError;
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      name, about, avatar, email, hashPassword,
    });
    const saveUser = await createdUser.save();
    res.send(saveUser);
  } catch (error) {
    next(error);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const tokenPayload = {
      _id: user._id,
    };
    const { NODE_ENV, JWT_SECRET } = process.env;
    const token = jwt.sign(tokenPayload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
      expiresIn: '7d',
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
