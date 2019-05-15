const express = require("express");
const middleware = require("./middleware/config");
const router = require("./routes/router");
const server = express();

//middleware
middleware(server);

//routes
server.get("/", (req, res) => {
  res.status(200).json({ message: "server up" });
});
server.use("/api", router);

module.exports = server;
