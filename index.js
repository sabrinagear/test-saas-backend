require("dotenv").config();
const server = require("./api/server.js");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").load();
// }


const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`\n Server running on port ${port}. \n`));