const mysql = require('mysql2')
const chalk = require('chalk')


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bamazon_db'
})

