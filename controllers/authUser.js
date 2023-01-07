/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');
require('dotenv');

exports.signup = async (req, res) => {
  try {
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.password,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWt_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_IN,
    });
    res.status(200).json({
      status: 'Succcess',
      token,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // checks the email and password exists or not;
  if (!email || !password) {
    res.status(400).json({
      status: 'Fail',
      message: 'Either the email or the password is missing',
    });
    return;
  }

  // checks the password entered  by the client  is same  as the  passwoord that is in the database
  const user = await userModel.findOne(
    { email: email },
    { email: 1, password: 1, _id: 0 }
  );
  // const correctPassword = async function (candidatePassword, realPassword) {
  //   return await bcrypt.compare(candidatePassword, realPassword);
  // };

  const correct = correctPassword(this.password, user.password);
  if (!user || !correct) {
    res.status(401).json({
      status: 'Fail',
      message: 'Either the password or the email is incorrect',
    });
    return;
  }
  console.log(user);
  // if everything ok send the  tokens  to the  client
  const token = ' ';
  res.status(200).json({
    status: 'Success',
    token,
  });
};
