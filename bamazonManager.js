// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  // use database bamazon
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();

});

// Start function gives user a menu of actions. 
function start() {

  inquirer
  .prompt({
    name: "menu",
    type: "list",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"],
    message: "Choose one: "

  }).then(function(answer){
    if(answer.menu == "View Products for Sale"){
      viewProducts();
    } else if (answer.menu == "View Low Inventory"){
      viewLow();
    } else if (answer.menu == "Add to Inventory"){
      addStock();
    } else {
      addProduct();
    }
    
  });

} // End of start function

// viewProducts function
function viewProducts(){
  // query the database for all items being sold
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // List items for sale
    console.log("Products for Sale: ");
    for (var i = 0; i < results.length; i++) {
      console.log("----------------------------------\n");
      console.log("Product ID: " + results[i].item_id + " Item: " + results[i].product_name + " Price: $" + results[i].price);
     };
     console.log("----------------------------------\n");
    // End of List
    start();
  }); // End of query
}

// addProduct function
function addProduct(){
  console.log("Add New Product: ");
  inquirer
  .prompt([{
    type: "input",
    name: "product",
    message: "What is the product name?"
  },
  {
    type: "input",
    name: "department",
    message: "In what department would it appear?"
  },
  {
    type: "input",
    name: "price",
    message: "How much will it sell for?"
  },
  {
    type: "input",
    name: "quantity",
    message: "How many units are available for sale?"
  }
  ]).then(function(answer){
    // query the database to add new product to table
    connection.query("INSERT INTO products SET ?",
    {
      product_name: answer.product,
      department_name: answer.department,
      price: answer.price,
      stock_quantity: answer.quantity
    }, function(err, results) {
      console.log("Product added!")
      start();
    }); // End of query
  }); // End of prompt
}; // End of addProduct function

// Add Inventory function
function addStock(){
  console.log("Update Inventory: ");

  // query the database for all items being sold
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // List items for sale
    for (var i = 0; i < results.length; i++) {
      console.log("----------------------------------\n");
      console.log("Product ID: " + results[i].item_id + " Item: " + results[i].product_name + " Price: $" + results[i].price + " Stock: " + results[i].stock_quantity);
     };
     console.log("----------------------------------\n");
    // once you have the items, prompt the user for which product they'd like to update
    inquirer
      .prompt([
        {
          name: "chooseProduct",
          type: "input",
          message: "Please provide the product id of the item you would like to update:",
          // validate if input is a number and an available id
          validate: function(value) {
            if (isNaN(value) === false && value <= results.length) {
              return true;
              }
            return false;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How much additional stock?",
          // validate input is a number
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // Create object from user response
        var chosenProduct;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id == answer.chooseProduct) {
            chosenProduct = results[i];
          }
        }
        // console.log(chosenProduct);

        var addQuantity = parseInt(answer.quantity);

        // Add current and additional stock quantity
        
        var updateQuantity = chosenProduct.stock_quantity + addQuantity;

          // Update quantity in database
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updateQuantity
              },
              {
                item_id: chosenProduct.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("The inventory was updated successfully!");
              console.log(chosenProduct.product_name + " now has " + updateQuantity + " units available.");
              start();
            }); // End of update query
      }); // End of inquirer
  }); // End of query
} // End of addStock

// View Low Inventory function
function viewLow(){
  console.log("Products with Low Inventory");

  // query the database for all items being sold
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
    if (err) throw err;
    console.log("Products with stock quantity below 5 units: ");
    // List items with low inventory... if they exist.
    if (results.length >= 1){
      for (var i = 0; i < results.length; i++) {
      console.log("----------------------------------\n");
      console.log("Product ID: " + results[i].item_id + " Item: " + results[i].product_name + " Price: $" + results[i].price);
     };
     console.log("----------------------------------\n");
    } else {
      console.log("There are no low stock items.");
      console.log("----------------------------------\n");
    }
    // End of List
    start();
  }); // End of query
} // End of viewLow function
