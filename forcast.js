const request = require("request");
const forcastt = (lat, long, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=1aa2b88031754e27a1354753242801&q=${lat},${long}&aqi=no`;

  request({ url: url, json: true }, (err, response) => {

    if (err) {
      callback("Does Not Found", undefined);
    } else if (response.body.error) {
      callback("Location does not found");
    } else {
      console.log(response.body.location.name)
      callback(undefined, response.body);
    }
  });
};
module.exports = forcastt;
