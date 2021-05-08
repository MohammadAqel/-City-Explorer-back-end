const express = require('express')
const weather1 = require('./assets/weather.json');
const superagent = require('superagent');
const cors = require('cors');
require('dotenv').config();
const app = express()

const PORT = process.env.PORT || 3030;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/weather', (req, res) => {

  try {
    console.log(req.query);
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    console.log(weatherBitUrl);
    superagent.get(weatherBitUrl).then(weatherBitUrl => {
      const arrOfData = weatherBitUrl.body.data.map(data => new Weather(data));
      res.send(arrOfData);


    });

  } catch (error) {
    const arrOfData = weather1.data.map(data => new Weather(data));
    res.send(arrOfData);

  }

});

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}



app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});