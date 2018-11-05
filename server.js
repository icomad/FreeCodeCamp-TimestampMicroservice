// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello world' });
});

app.get('/api/timestamp/:date_string?',
  (req, res, next) => {
    if (req.params.date_string !== undefined) {
      req.d = isNaN(req.params.date_string) ?
        new Date(req.params.date_string) :
        new Date(parseInt(req.params.date_string));
      if (req.d == 'Invalid Date') res.json({ error: 'Invalid Date' });
      next();
    }
    req.d = new Date(Date.now());
    next();
  },
  (req, res) => {
    res.json({ unix: req.d.getTime(), utc: req.d.toUTCString() });
  }
);



// listen for requests :)
var listener = app.listen(process.env.PORT || 8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});