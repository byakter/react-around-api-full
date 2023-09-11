const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ERRORS = require('../utils/Errors');

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const usersData = await User.find();
    res.send(usersData);
  } catch (error) {
    next(new ERRORS.InternalError());
  }
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const err = new ERRORS.NotFoundError('No card found with that id');
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
      const err = new ERRORS.NotFoundError('No card found with that id');
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
      name, about, avatar, email, password: hashPassword,
    });
    const saveUser = await createdUser.save();
    // const { password: p, ...user } = saveUser;
    delete saveUser.password;
    res.send(saveUser);
  } catch (error) {
    if (error.code === 11000) {
      next(new ERRORS.Conflict());
    }
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
      const err = new ERRORS.UnauthorizedError();
      throw err;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const err = new ERRORS.UnauthorizedError();
      throw err;
    }

    const tokenPayload = {
      _id: user._id,
    };
    const { NODE_ENV, JWT_SECRET } = process.env;
    const token = jwt.sign(tokenPayload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
      expiresIn: '7d',
    });

    res.send({ token });
  } catch (error) {
    next(new ERRORS.UnauthorizedError());
  }
};
