import express from 'express';
import { convertSubtitlesFromUrl } from './Subtitle';


const port = process.env.PORT || 3000;
const app = express();

console.log(`Serving on localhost:${port}`);

app.get('/', (req, res) => {
  res.send('API');
});

app.get('/subtitles/:srtUrl', async (req, res) => {
  const srtUrl = req.params.srtUrl;

  console.log(srtUrl);
  console.log('http://dl.opensubtitles.org/en/download/src-api/vrf-19f00c62/sid-9762j5nq6vsvu4tf83bnhenqu5/filead/1951988772');

  console.log('Searching for: ', srtUrl);

  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }

  res.writeHead(200, {
    'Content-Type': 'text/vtt'
  });

  const buffer = await convertSubtitlesFromUrl(srtUrl);

  res.end(buffer, 'base64');
});

app.listen(port);

module.exports = app;
