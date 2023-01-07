// eslint-disable-next-line import/newline-after-import
// const express = require('express');
const app = require('./app');
// eslint-disable-next-line no-unused-vars

const port = 8083;
app.listen(port, () => {
  console.log(`Listening  to the poet ${port}`);
});
