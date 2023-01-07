/* eslint-disable no-shadow */

const fs = require('fs');
const convert = require('xml-js');
const Tour = require('../Models/tourModel');
const API = require('../utils/API');

// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// getting data  from the  JSON
exports.topTours = (req, res, next) => {
  req.query.limit = '5';
  // eslint-disable-next-line no-unused-expressions, no-sequences
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,,ratingsAverage,summary,difficulty';
  next();
};
exports.getData = async (req, res) => {
  try {
    // FILTERING

    // // Excluding the fields

    // const excludedFields = ['page', 'limit'];

    // excludedFields.forEach((element) => delete queryObject[element]);

    const features = new API(Tour.find(), req.query)
      .filter()
      .sort()
      .limiting()
      .pagination();
    const tours = await features.query;

    res.status(200).json({
      status: 'Success',
      result: tours.length,
      data: { tours: tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
    console.log(err);
  }
};

// Posting data into the JSON
exports.addData = async (req, res) => {
  try {
    console.log(req.body);
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: { tours: newTour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
    console.log(error);
  }
};

// Getting the data  by id
exports.PickData = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  // const tour = await Tour.findOne({ _id: req.params.id });
  try {
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};

// patch (update the  data )
exports.UpdateData = async (req, res) => {
  try {
    const tourUp = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',

      data: { tour: tourUp },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};

// Delete the  data from  the  user
exports.DeleteData = async (_req, res) => {
  try {
    // await Tour.findByIdAndDelete(req.params.id);
    await Tour.deleteMany({ price: { $gte: 10 } });
    res.status(204).json({
      status: 'Successfully deleted this  tour',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};

// Getting the  tour stats using the async function
exports.gettourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          tourCount: { $sum: 1 },
          ratingCount: { $sum: '$ratingsQuantity' },
          averageRating: { $avg: '$ratingsAverage' },
          averagePrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { averagePrice: 1 },
      },
    ]);

    res.status(200).json({
      status: 'Success',
      data: stats,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      { $unwind: '$startDates' },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStates: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTourStates: -1,
        },
      },
    ]);
    res.status(200).json({
      result: plan.length,
      status: 'Success',
      data: plan,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

// practice indexing route handler

exports.indexingPractice = async (req, res) => {
  try {
    // console.log(req);
    const xml = fs.readFileSync('C:/starter/test/test.xml', 'utf-8');
    console.log(xml);
    const result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
    const result2 = convert.xml2json(xml, { compact: false, spaces: 4 });
    console.log(result1);
    console.log(result2);

    const tours = await Tour.find({ price: { $gte: 1500 } });
    res.status(200).json({
      staus: 'success',
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: `something  went wrong ${error}`,
    });
  }
};
