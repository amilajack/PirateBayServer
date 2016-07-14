const PirateBay = require('thepiratebay');
const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  console.log('some.....');
  next()
});

app.get('/search/:searchQuery', (req, res, next) => {
  const { searchQuery } = req.params;

  PirateBay
    .search(searchQuery)
    .then(results => res.send(results));
});

app.listen(3000);
