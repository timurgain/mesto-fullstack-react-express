const router = require('express').Router();
const jsonParser = require('express').json();
const {
  getCards,
  postCard,
  deleteCard,
  putCardLike,
  removeCardLike,
} = require('../controllers/cards');

const { cardInfoValidation, cardIdUrlParamsValidation } = require('../middlewares/validation/card');

// card
router.get('/', getCards);
router.post('/', jsonParser, cardInfoValidation, postCard);
router.delete('/:cardId', cardIdUrlParamsValidation, deleteCard);
// cards likes
router.put('/:cardId/likes', jsonParser, cardIdUrlParamsValidation, putCardLike);
router.delete('/:cardId/likes', cardIdUrlParamsValidation, removeCardLike);

module.exports = router;
