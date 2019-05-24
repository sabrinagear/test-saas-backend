const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const cross = require("./cross");

module.exports = server => {
  server.use(express.json());
  server.use(cross);
  server.use(helmet());
  server.use(morgan("combined"));
  server.use(express.json());
  server.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
};
