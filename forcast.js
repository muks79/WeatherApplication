const request = require("request");
const forcastt = (lat, long, callback) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=5XVRJJFFYU9Q9ZBD8CJMQWCFP`;

  request({ url: url, json: true }, (err, response) => {
    //   console.log(response.body)
    if (err) {
      callback("Does Not Found", undefined);
    } else if (response.body.error) {
      callback("Location does not found");
    } else {
      // callback(undefined, response.body.currentConditions.temp);
      callback(undefined, response.body.currentConditions);
      
    }
  });
};
module.exports = forcastt;
