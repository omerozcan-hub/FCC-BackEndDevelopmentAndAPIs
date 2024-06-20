require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const dns = require('dns');
const bodyParser = require('body-parser');


// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy database to store original and short URLs
let urls = [];
let nextShortUrl = 1;

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  try {
    const { hostname } = new URL(originalUrl);
    dns.lookup(hostname, (err, address, family) => {
      if (err) {
        return res.json({ error: 'invalid url' });
      }

      urls.push({ originalUrl, shortUrl: nextShortUrl });

      res.json({ original_url: originalUrl, short_url: nextShortUrl });

      nextShortUrl++;
    });
  } catch (error) {
    return res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = parseInt(req.params.short_url);

  const urlObject = urls.find(url => url.shortUrl === shortUrl);

  if (!urlObject) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(urlObject.originalUrl);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
