const Provider = require("./Provider.js");

const cityLatitude = 51.5074;
const cityLongtitude = 0.1278;

const printRequirements = async () => {
  const city = await Provider.findCityByCoord(cityLongtitude, cityLatitude);
  const cityName = city.name;
  const weather = await Provider.getWeather(cityName);
  const localCurrency = await Provider.getLocalCurrency(cityName);

  // first requirement
  console.log(cityName);

  // second requirement
  console.log(`The weather of ${cityName} is ${weather}`);

  // third requirement
  console.log(`The local currency of ${cityName} is ${localCurrency}`);
};

printRequirements();
