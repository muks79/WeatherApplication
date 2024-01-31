const path = require("path");
const express = require("express");
const app = express();
let hbs = require("hbs");
const forcast = require("./forcast");
const bodyParser = require("body-parser");
const geocode = require("./geocode");
const port = process.env.PORT || 5545

app.use(bodyParser.urlencoded({ extended: true }));

//serving html file and deifining path
app.use(express.static(path.join(`${__dirname}`, "/public"))); //it will send static html ,css,js file and search for that file with the name given in url path
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mukul",
    copyright: "Copy Right ALL right reserved",
  });
});

app.post("/weather", (req, res) => {
  const location = req.body.location;

  if (!location) {
    return res.send({
      error: "You must provide a address",
    });
  }
  //req.query.address

  geocode(location, (err, data) => {
    forcast(data.latitude, data.longitude, (err2, data2) => {
      // res.send({
      //   Address: req.query.address,
      //   latitude: data.latitude,
      //   longitude: data.longitude,
      //   temperature: data2,
      // });
      res.render("index", {
        time: data2.datetime,
        temp: data2.temp,
        humidity: data2.humidity,
        dew: data2.dew,
        windspeed: data2.windspeed,
        sunrise: data2.sunrise,
        sunset: data2.sunset,
      });
    });
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    error: "404 ERror",
  });
});

app.get("/json", (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  res.send({ weather: "bad" });
});
app.listen(port);
