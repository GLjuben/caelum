const path = require("path");
require("dotenv").config({ path: "../.env" });
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//set up express app;
const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsPath);

//set up static direcotry to serve;
app.use(express.static(publicDirPath));

// set up a server to send a response;
//get method to get resource from a specific route;
//1 arg is partial URL, 2 arg is handler (a func);
//req-object with info about incoming reqest to the server;
// res-object with methods to customize what to send to the client(requester);

//home page;
app.get("", (req, res) => {
  //1 arg-the name of the view to render;
  //2 arg- obj which containss all of the values we want that view to have access
  res.render("index", {
    title: "Weather",
    name: "Gorjan Ljuben",
    footer: "contact at 000000000",
  });
});
//about page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    description:
      "The scoliosis that Usain Bolt has is structural and functional",
    name: "Ljuben",
    footer: "contact at 000000000",
  });
});

//help page
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Gorjan",
  });
});

//weather page;
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a location!",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, label } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData = {}) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        label,
        address: req.query.address,
      });
    });
  });
});

//catch 404 for /help
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error",
    text: "Help article not found. Please try another search.",
    name: "Gorjan",
  });
});
// 404 error handling;
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error",
    text: "Page not found. Please try again with a correct URL.",
    name: "Gorjan",
  });
});

//start server;
//1arg: PORT;
// 2arg:callback(handler)
// 3arg:
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
