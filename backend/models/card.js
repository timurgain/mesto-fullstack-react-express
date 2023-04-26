const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(ftp|http|https):\/\/[^ "]+$/.test(value),
      message: 'Invalid URL format',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('card', cardSchema);
