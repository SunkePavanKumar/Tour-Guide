const express = require('express');

const router = express.Router();
const controllers = require('../controllers/authUser');
const {
  getAllUsers,
  CreateUsers,
  getUsers,

  deleteUsers,
} = require('../controllers/userController');

router.route('/signup').post(controllers.signup);

router.route('/login').post(controllers.login);

router.route('/').get(getAllUsers).post(CreateUsers);

router.route('/:id').get(getUsers).delete(deleteUsers);
module.exports = router;
