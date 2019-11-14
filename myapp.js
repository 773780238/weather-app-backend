var cors = require('cors');
var express = require('express');
var request = require('request');

var app = express();


app.use(cors());
  app.make_API_call = function(url){
    return  new Promise((resolve, reject) => {
        request(url, { json: true }, (err, res, body) => {
          if (err) reject(err)
          resolve(body)
        });
    })
}
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/getGeocode', function(req, res){
    let address = req.query.address;
    let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyBZ39LMjZ4qjaDqUbUoG7zxa9LTRW89awA";
    app.make_API_call(url)
    .then(response => {
        console.log(res.json(response));
    })
});
app.get('/geoWeather', function(req, res){
    let geo = req.query.lati+","+req.query.longi;
    let url = "https://api.darksky.net/forecast/5669a5a7a9e6426cc2709ce9abc507fe/"+geo;
    app.make_API_call(url)
    .then(response => {
       console.log(res.json(response));
    })
});
app.get('/geoTimeWeather', function(req, res){
  let lati = req.query.lati;
  let longi = req.query.longi;
  let time = req.query.time;
  let geotime = lati+","+longi+","+time;
  let url = "https://api.darksky.net/forecast/5669a5a7a9e6426cc2709ce9abc507fe/"+geotime;
  app.make_API_call(url)
  .then(response => {
     console.log(res.json(response));
  })
});
app.get('')
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;