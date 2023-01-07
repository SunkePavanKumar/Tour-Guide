const fetch = require('node-fetch');

const fun = async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/github');
    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.log('Error in fetching the data ', err);
  }
};
fun();
