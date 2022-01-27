const { init } = require('express/lib/application');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
    {
      host: "127.0.0.1",  
      user: "root",
      port: 3306,
      password: process.env.DB_PASSWORD,
      database: "employee_tracker_db"
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

connection.connect(err => {
    if (err) {
        console.log(err)
        throw err;
    }
});

module.exports = connection;
