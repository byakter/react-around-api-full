const express = require('express');
const { Joi, celebrate } = require('celebrate');

const router = express.Router();
const {
  getCards,
  deleteCard,
  createCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

// router.post('/', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.link().required(),
//   }),
// }), createCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(), // .pattern(/^(https?|ftp):\/\/[^s/$.?#].[^s]*$/),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
  // body: Joi.object().keys({
  //   name: Joi.string().required().min(2).max(30),
  //   link: Joi.string().required().min(2),
  //   owner: Joi.string().required().min(8),
  //   likes: Joi.required(),
  //   createdAt: Joi.string().required(),
  // }),
}), addLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteLike);

module.exports = router;
