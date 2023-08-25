const Card = require('../models/card');
const constants = require('../utils/constants');

module.exports.getCards = async (req, res, next) => {
  try {
    const cardsData = await Card.find();
    res.send(cardsData);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = new Card({ name, link, owner: req.user._id });
    const saveCard = await card.save();
    res.send(saveCard);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (card.owner !== req.user._id) {
      const err = new Error();
      err.name = constants.authError;
      throw err;
    }
    const result = await Card.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
      const err = new Error();
      err.name = constants.CardNotFoundError;
      throw err;
    }
    res.json({ message: 'Card deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports.addLike = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      const err = new Error();
      err.name = constants.CardNotFoundError;
      throw err;
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    res.send(updatedCard);
  } catch (err) {
    // if ((err.name = constants.CastError)) {
    //   err.name = constants.ValidationError;
    // }
    next(err);
  }
};

module.exports.deleteLike = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      const err = new Error();
      err.name = constants.CardNotFoundError;
      throw err;
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    res.send(updatedCard);
  } catch (err) {
    // if ((err.name = constants.CastError)) {
    //   err.name = constants.ValidationError;
    // }
    next(err);
  }
};
