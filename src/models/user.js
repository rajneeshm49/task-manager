const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
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

userSchema.methods.generateAuthToken = async function() {
  const token = await jwt.sign({ email: this.email }, 'TaskManager');
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  return user;
};

//this is called as middleware which will get executed before user is saved
userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
