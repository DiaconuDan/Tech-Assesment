const axios = require("axios");

const limit = 1;
const WEATHER_API_KEY = "e37c61cca129939ae3063919ecb01b5d"; // ideal hidden, but kept it so repository can be tested for now

class Provider {
  // Gets the weather for a given city
  static async getWeather(city) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=${limit}&&appid=${WEATHER_API_KEY}`;

    return axios
      .get(apiUrl)
      .then((res) => {
        const weatherType = res.data.weather[0].main;

        return weatherType;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Gets the currency for a given city
  static async getLocalCurrency(city) {
    const fetchedCity = await this.findCityByName(city);
    const countryCode = fetchedCity.country;
    const apiUrl = `https://restcountries.com/v3.1/alpha/${countryCode}`;

    return axios
      .get(apiUrl)
      .then((res) => {
        const currencies = res.data[0].currencies;
        const firstCurrency = Object.keys(currencies)[0];

        return firstCurrency;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Given Longtitude and latitude, this function returns a city

  static async findCityByCoord(long, lat) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=${limit}&appid=${WEATHER_API_KEY}`;

    return axios
      .get(apiUrl)
      .then((res) => {
        const city = res.data[0];
        return city;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Given name of the city, this function returns the city details

  static async findCityByName(name) {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=${limit}&appid=${WEATHER_API_KEY}`;

    return axios
      .get(apiUrl)
      .then((res) => {
        const city = res.data[0];
        return city;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = Provider;
