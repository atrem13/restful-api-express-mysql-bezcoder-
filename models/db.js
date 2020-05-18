const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

const connection = mysql.createConnection({
  host:dbConfig.host,
  user:dbConfig.user,
  password:dbConfig.password,
  database:dbConfig.database
});

// open mysql connection
connection.connect((error) => {
  if(error) throw error;
  console.log('connected to database');
});

module.exports = connection;