const Card = require('../models/card');
const ERRORS = require('../utils/Errors');

module.exports.getCards = async (req, res, next) => {
  try {
    const cardsData = await Card.find();
    res.send(cardsData);
  } catch (err) {
    next(new ERRORS.InternalError());
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = new Card({ name, link, owner: req.user._id });
    const saveCard = await card.save();
    res.send(saveCard);
  } catch (err) {
    next(new ERRORS.InternalError());
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (String(card.owner) !== req.user._id) {
      const err = new ERRORS.ForbiddenError();
      throw err;
    }
    const result = await Card.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
      const err = new ERRORS.NotFoundError();
      throw err;
    }
    res.json({ message: 'Card deleted successfully.' });
  } catch (err) {
    if (err.code === 403 || err.code === 404) next(err);
    else next(new ERRORS.InternalError());
  }
};

module.exports.addLike = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      const err = new ERRORS.NotFoundError();
      throw err;
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    res.send(updatedCard);
  } catch (err) {
    if (err.code === 404) next(err);
    else next(new ERRORS.InternalError());
  }
};

module.exports.deleteLike = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      const err = new ERRORS.NotFoundError();
      throw err;
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    res.send(updatedCard);
  } catch (err) {
    if (err.code === 404) next(err);
    else next(new ERRORS.InternalError());
  }
};
