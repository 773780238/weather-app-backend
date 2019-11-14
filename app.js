var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var request = require('request');
var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hike = require('./routes/hike');
var app = express();
app.use(cors());
app.get('/hikes', hike.index);
app.post('/add_hike', hike.add_hike);
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


make_API_call = function(url){
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
  make_API_call(url)
  .then(response => {
      console.log(res.json(response));
  })
});
app.get('/geoWeather', function(req, res){
  let geo = req.query.lati+","+req.query.longi;
  let url = "https://api.darksky.net/forecast/5669a5a7a9e6426cc2709ce9abc507fe/"+geo;
  make_API_call(url)
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
make_API_call(url)
.then(response => {
   console.log(res.json(response));
})
});

module.exports = app;
