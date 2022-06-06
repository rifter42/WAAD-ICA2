// Import mysql
const mysql = require("mysql2");

// Create parameters for database connection 
const db = mysql.createPool({
  host: process.env.dbhost,,
  user: process.env.dbuser,
  password: process.env.dbpass,
  database: process.env.db
});

module.exports = db;
