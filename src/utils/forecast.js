const request = require("postman-request");

const forecast_key = process.env.WEATHERSTACK_API_KEY;

const forecast = (lat, long, callback) => {
  const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${forecast_key}&query=${encodeURIComponent(
    lat
  )},${encodeURIComponent(long)}&units=m`;
  request({ url: weatherStackUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (body.error || !body.current) {
      callback("Unable to find weather info. Try another search", undefined);
    } else {
      const temperature = body.current.temperature;
      const feelslike = body.current.feelslike;
      const weather_descriptions = body.current.weather_descriptions;
      callback(undefined, {
        message: `${weather_descriptions}. It feels like ${feelslike}, but it is ${temperature} celsius degrees.`,
        temperature,
        feelslike,
        weather_descriptions,
      });
    }
  });
};
module.exports = forecast;
