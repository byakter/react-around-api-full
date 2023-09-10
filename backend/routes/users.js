const express = require('express');
const { Joi, celebrate } = require('celebrate');

const router = express.Router();

const ctl = require('../controllers/users');

router.get('/', ctl.getAllUsers);
router.get('/me', ctl.getUserData);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), ctl.getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), ctl.updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.link().required(),
  }),
}), ctl.updateAvatar);

module.exports = router;
