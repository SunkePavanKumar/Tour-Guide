const mongoose = require('mongoose');

const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user should be having the name'],
    maxLength: [20, 'A user Should not have more than 20 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user should have the email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide the  correct email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A user should have the password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user should have the conform the password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'The password and confirm password not matched',
    },
  },
});

// Model Middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// function checking wheather the  password  enter by the user and the password  in the database is correct  or not
// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const userModel = mongoose.model('userTour', userSchema);
module.exports = userModel;
