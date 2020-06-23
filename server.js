
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '07870c534628530f296d43ceb11f1c82';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let città = req.body.città;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${città}&units=Metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `Ci sono ${weather.main.temp} gradi Celsius a ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App in ascolto sulla porta ${ PORT }`);
});