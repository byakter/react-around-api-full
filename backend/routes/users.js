const express = require('express');
const { Joi, celebrate } = require('celebrate');

const router = express.Router();

const ctl = require('../controllers/users');

router.get('/', ctl.getAllUsers);
router.get('/:id', ctl.getUserById);
router.get('/me', ctl.getUserData);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.link().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(30),
  }),
}), ctl.updateProfile);
router.patch('/me/avatar', ctl.updateAvatar);

module.exports = router;
