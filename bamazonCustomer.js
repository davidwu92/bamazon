const mysql = require('mysql2')
const chalk = require('chalk')
const inquirer = require('inquirer')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bamazon_db'
})

