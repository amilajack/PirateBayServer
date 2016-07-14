const PirateBay = require('thepiratebay');
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

console.log(`Serving on localhost:${port}`);

app.get('/', (req, res, next) => {
  res.send('API')
});

app.get('/search/:searchQuery', (req, res, next) => {
  const { searchQuery } = req.params;

  console.log('Searching for: ', searchQuery);

  PirateBay
    .search(searchQuery, Object.assign(
      {},
      PirateBay.default.searchDefaults
      req.query
    ))
    .then(results => res.send(results));
});

app.listen(port);
