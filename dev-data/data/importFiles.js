const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Tour = require('../../Models/tourModel');
require('dotenv');

const tour = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tours-simple.json'), 'utf-8')
);
// const DB = process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://user3:root@cluster0.r7nwori.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    // console.log(con.connection);
    console.log("'connnected to the database Successfully");
  });

const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('successfully import the json');
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('All the Tours  are Successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
