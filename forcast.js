const request = require("request");
const forcastt = (lat, long, callback) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=1aa2b88031754e27a1354753242801&q=${lat},${long}&aqi=no`;

  request({ url: url, json: true }, (err, response) => {

    if (err) {
      callback("Does Not Found", undefined);
    } else if (response.body.error) {
      callback("Location does not found");
    } else {
      console.log(response.body)
      callback(undefined, response.body);
    }
  });
};
module.exports = forcastt;


// 5XVRJJFFYU9Q9ZBD8CJMQWCFP -- api for visualcrossing