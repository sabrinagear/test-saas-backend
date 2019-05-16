require("dotenv").config();
const server = require("./api/server.js");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").load();
// }

<<<<<<< HEAD
// const port = process.env.PORT || 9000;
const port = 9000;
=======
const port = process.env.PORT || 9000;

>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
server.listen(port, () => console.log(`\n Server running on port ${port}. \n`));
