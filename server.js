
// Meteo 

const express = require('express');          // init modulo EXPRESS
const app = express() 						  
const bodyParser = require('body-parser');   // init altri Moduli
const request = require('request');          // deprecato ( bent)

const apiKey = '';            	 // set chiave api 

app.use(express.static('public'));          		    // fornisco il nome della directory da gestire tramite express
app.use(bodyParser.urlencoded({ extended: true }));   	// Parsing dei risultati da URL per manipolazione diretta tramite javascript
app.set('view engine', 'ejs')   		   			    // Utilizzo EJS come Template Engine anzichè handlebars

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});   // prima rotta / Homepage rendering - Stato iniziale 
})

// Corpo

app.post('/', function (req, res) {                   // Metodo POST verso API / rotta
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/forecast?id=${city}&units=celsius&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'ERRORE!'});  // Controllo dell'errore o dell'undefined - ERR
    } else {
      let weather = JSON.parse(body)  // JSON Parsing della riposta
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'ERRORE!'}); // ERR
      } else {
        let weatherText = `Ci sono ${weather.main.temp} gradi a ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});  // OK
      }
    }															
  });
})

app.listen(3000, function () {
  console.log('APP in ascolto sulla porta 3000!')
})