const request = require("request");

const geocode = (address, callback) => {
  const url = `https://geocode.maps.co/search?q=${encodeURIComponent(
    address
  )}&api_key=65b5fec2140fe811027670kvf10a667`;
  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback(`Unable to connect to location services`, undefined);
    } else if (response.body.length == 0) {
      callback(`Unable to find location.Try another location`, undefined);
    } else {
      callback(undefined, {
        latitude: response.body[0].lat,
        longitude: response.body[0].lon,
      });
    }
  });
};

module.exports = geocode;
