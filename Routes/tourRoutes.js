const express = require('express');
// const Tour = require('../Models/tourModel');

const router = express.Router();
// router.param('id', (req, res, next, val) => {
//   console.log(`Tour is is ${val}`);
//   next();
// });
const {
  getData,
  addData,
  PickData,
  UpdateData,
  DeleteData,
  topTours,
  gettourStats,
  getMonthlyPlan,
  indexingPractice,
  //  eslint-disable-next-line import/no-absolute-path
} = require('../controllers/tourcontroller');
// reading the JSON data Sync
router.route('/monthlyplan/:year').get(getMonthlyPlan);
// indexing practice
router.route('/practice').get(indexingPractice);

router.route('/aggregation').get(gettourStats);
router.route('/top-5-cheap').get(topTours, getData);
router.route('/').get(getData).post(addData);
router.route('/:id').get(PickData).patch(UpdateData).delete(DeleteData);

module.exports = router;
