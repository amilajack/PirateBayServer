const PirateBay = require('thepiratebay');
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res, next) => {

});

app.get('/search/:searchQuery', (req, res, next) => {
  const { searchQuery } = req.params;

  PirateBay
    .search(searchQuery)
    .then(results => res.send(results));
});

app.listen(port);
