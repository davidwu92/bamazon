const mysql = require('mysql2')
const chalk = require('chalk')
const inquirer = require('inquirer')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bamazon_db'
})

// Displaying Products from products table

const displayItems = () => {
  db.query('SELECT * FROM products', (e, products)=>{
    if (e) {console.log(e)}
    console.log(products)
    customerInput(products.length) //Passing the max itemID possible into function
  })
}
displayItems()

//Asking for user input
const customerInput = (totalItems) => {
  inquirer.prompt([
    {type: 'number',
    name: 'itemId',
    message: 'What is the item ID of the product you wish to purchase?',
    },
    {type: 'number',
    name: 'quantity',
    message: 'How many would you like to purchase?'
    }
  ])
    .then(input => {
      // CUSTOMER'S input: {itemId: X, quantity: Y}
      if (input.itemId > totalItems){ //Invalid item ID
        inquirer.prompt({
          type: 'confirm',
          name: 'restart',
          message: 'We do not have an item with that ID. Would you like to view the item list again?'
        })
        .then(bool => {
          if (bool) {displayItems()
          } else {customerInput()}
        })
        .catch(e => {console.log(e)})
      } else { //Customer gave a valid item ID: grabbing stock, productname, and price
        db.query(`SELECT stock_quantity, product_name, price FROM products WHERE item_id = ${input.itemId}`, (e, itemData)=>{
          if (e) {console.log(e)}
          //itemData [{stock_quantity: X, product_name: 'Y', price: 'Z'}]
          if (input.quantity >= (itemData[0].stock_quantity)) { //Customer tries to order too many
            inquirer.prompt({
              type: 'confirm',
              name: 'restart',
              message: 'We do not have that many in stock. Would you like to view the inventory again?'
            })
            .then(bool => {
              if (bool) {displayItems()
              } else {customerInput()}
            })
            .catch(e => {console.log(e)})
          } else { //VALID ORDER QUANTITY            
            //Updating the products to show a change in item stock
            let receipt = {
              item: itemData[0].product_name,
              quantity: input.quantity,  
              total: input.quantity * itemData[0].price
            }
            console.log("Your order has been placed:")
            console.log(receipt)
            db.query(`UPDATE products 
            SET stock_quantity = ${itemData[0].stock_quantity - input.quantity} 
            WHERE item_id = ${input.itemId}`, (e)=>{
              if (e) {console.log(e)}
            })
          }
        })
      }
    })
    .catch(e => {console.log(e)})
}