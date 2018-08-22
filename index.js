const PirateBay = require('thepiratebay');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

console.log(`Serving on localhost:${port}`);

app.get('/', (req, res) => {
  res.send('API');
});

app.get('/search/:searchQuery', (req, res) => {
  const { searchQuery } = req.params;

  console.log('Searching for: ', searchQuery);

  PirateBay
    .search(searchQuery, Object.assign(
      {},
      PirateBay.default.searchDefaults,
      req.query
    ))
    .then(results => res.send(results))
    .catch(console.log);
});

module.exports = app.listen(port);
