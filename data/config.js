// Define which database type to use
const dbEngine = process.env.NODE_ENV || "development";

// Import the knexfile using the specified database type
const config = require("../knexfile.js")[dbEngine];

// Export the configuration
module.exports = require("knex")(config);
