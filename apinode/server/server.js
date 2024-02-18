const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3200;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'LPDB1',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});


module.exports = connection;

