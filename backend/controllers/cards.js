const { constants } = require('http2');
const CardModel = require('../models/card');
const { NullQueryResultError, ForbiddenError } = require('../errors/castomErrors');

function getCards(req, res, next) {
  CardModel.find({ })
    .populate('owner likes')
    .then((queryObj) => res.send(queryObj))
    .catch(next);
}

function postCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  CardModel.create({ name, link, owner })
    .then((queryObj) => res.status(constants.HTTP_STATUS_CREATED).send(queryObj))
    .catch(next);
}

function deleteCard(req, res, next) {
  CardModel.findOne({ _id: req.params.cardId }).populate('owner')
    .then((card) => {
      if (!card) throw new NullQueryResultError();
      if (card.owner._id.toString() !== req.user._id) throw new ForbiddenError();
      return card.deleteOne();
    })
    .then(() => res.status(constants.HTTP_STATUS_NO_CONTENT).end())
    .catch(next);
}

function updateCard(req, res, data) {
  return CardModel.findOneAndUpdate({ _id: req.params.cardId }, data, {
    returnDocument: 'after',
  })
    .populate('owner likes')
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    });
}

function putCardLike(req, res, next) {
  updateCard(req, res, { $addToSet: { likes: req.user._id }, next }).catch(next);
}

function removeCardLike(req, res, next) {
  updateCard(req, res, { $pull: { likes: req.user._id }, next }).catch(next);
}

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  removeCardLike,
};
