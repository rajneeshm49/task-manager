const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true
});

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
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Please enter valid age');
      }
    }
  }
});

const user = new User({
  name: 'Rajneesh',
  email: ' RAJNEESH.M49@GMAIL.COM  '
});

user
  .save()
  .then(() => {
    console.log(user);
  })
  .catch(e => {console.log('Hey Error', e)   ;
  });
