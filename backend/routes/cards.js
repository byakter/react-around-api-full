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
router.delete('/:id', deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.link().required().min(2),
    owner: Joi.string().required().min(8),
    likes: Joi.required(),
    createdAt: Joi.string().required(),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2),
    owner: Joi.string().required().min(8),
    likes: Joi.required(),
    createdAt: Joi.string().required(),
  }),
}), addLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
