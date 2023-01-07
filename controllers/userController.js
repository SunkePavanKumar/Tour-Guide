const userModel = require('../Models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      status: 'Success',
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.CreateUsers = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Invalid Route',
  });
};

exports.getUsers = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Innvalid Route',
  });
};

// const UpdateUsers = (req, res) => {
//   res.status(500).json({
//     status: 'fail',
//     message: 'Innvalid Route',
//   });
// };

exports.deleteUsers = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Invalid Route',
  });
};
