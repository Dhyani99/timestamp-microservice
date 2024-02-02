// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/", function(req, res){

  const curr_date = new Date(Date.now());
  const unix_time = curr_date.getTime(); 
  const utc_date = curr_date.toUTCString();
  res.json({unix: unix_time, utc: utc_date});

});
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", function (req, res) {
  let date_str = req.params.date;
  const date = new Date(date_str);
  
  if(date == "Invalid Date"){
    const myUnixTimestamp = parseInt(date_str); // start with a Unix timestamp
    const myDate = new Date(myUnixTimestamp); // convert timestamp to milliseconds and construct Date object
    console.log(typeof(Number(myDate)));
    res.json({unix: Number(myDate), utc: myDate.toUTCString()});
  }else{
    const timeInMillisecond = date.getTime();
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    res.json({unix: unixTimestamp, utc: date.toUTCString()});
  }
  
});

// listen for requests :)

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
