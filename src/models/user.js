const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Not a valid Email');
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 7) {
        throw new Error('Password cannot be less than 7 characters');
      }
    }
  }
});

module.exports = User;
