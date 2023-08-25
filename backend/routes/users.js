const express = require('express');
const { Joi, celebrate } = require('celebrate');

const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserData,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/me', getUserData);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.link().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
