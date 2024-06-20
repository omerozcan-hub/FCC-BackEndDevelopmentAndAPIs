// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//o
app.get("/api/:date",(req, res) => {
  const date = req.params.date;
  let dateObject;

  //isNaN -- is not a number
  if (!isNaN(date)) {
    dateObject = new Date(parseInt(date));
  }else if(!isNaN(Date.parse(date))){
    dateObject = new Date(date);
  }else{
    return res.json({"error": "Invalid Date"});
  }

  const unixTimestamp = new Date(dateObject).getTime();
  const utcDate = new Date(dateObject).toUTCString();

  res.status(200).json({ unix: unixTimestamp, utc: utcDate });
})

app.get("/api/", (req, res) => {
  const date = new Date(Date.now());

  const unix = date.getTime();
  const utc = date.toUTCString();

  res.json({unix: unix, utc: utc});
});


// listen for requests :)
app.listen(8000, () => {
   console.log("Your app is listening on port 8000...");
});

//var listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
//});
