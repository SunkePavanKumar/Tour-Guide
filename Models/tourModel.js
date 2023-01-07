const mongoose = require('mongoose');
// Model Declaration
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Name  Should not be Empty`],
      unique: true,
      maxlength: [40, 'A tour name should have the maximum 40 characters'],
      minlength: [10, 'A tour name should be having minimum 10 characters'],
      min: [1, 'A rating should have the minimum of 1 '],
      max: [5, 'The maximum rating of the tour should not cross 5'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour Must have the duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have the group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour  must have the difficulty'],
      enum: {
        values: ['difficult', 'medium', 'easy'],
        message: 'The difficulty is having only three fields',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour should have the price declared'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      required: [true, 'A tour must have the description'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour should have the  cover image!'],
    },
    images: [String],
    createAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual Properties
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
