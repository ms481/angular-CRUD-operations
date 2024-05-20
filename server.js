// server.js
var express = require("express");
var jsonServer = require("json-server");

var server = express();

const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");

const domainList = ["http://localhost:4200"];

server.use(middlewares);
server.use(router);

// https://expressjs.com/en/resources/middleware/cors.html
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (domainList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

server.get("/books", cors(corsOptionsDelegate), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for an allowed domain." });
});

server.options("*", cors());
server.listen(3000, () => {
  console.log("JSON Server is running");
});
