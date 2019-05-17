<<<<<<< HEAD
require("dotenv").config();
const server = require("./api/server.js");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").load();
// }

const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`\n Server running on port ${port}. \n`));
=======
require("dotenv").config();
const server = require("./api/server.js");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").load();
// }

// const port = process.env.PORT || 9000;
const port = 9000;
server.listen(port, () => console.log(`\n Server running on port ${port}. \n`));
>>>>>>> 0a1b9e5ee2020e4ad65b0dc4254cc2ee7d1d13a3
