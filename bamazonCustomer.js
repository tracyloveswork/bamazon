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

// Start function asks user if they would like to view items. 
function start() {

	inquirer
	.prompt({
		name: "display",
		type: "confirm",
		message: "View products available?"

	}).then(function(answer){
		if(answer.display == true){
			makePurchase();
		} else {
			// End Connection
			connection.end();
		}
		
	});

} // End of start function

// function that processes purchase and updates database
function makePurchase() {

	  // query the database for all items being sold
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // List items for sale
    for (var i = 0; i < results.length; i++) {
    	console.log("----------------------------------\n");
    	console.log("Product ID: " + results[i].item_id + " Item: " + results[i].product_name + " Price: $" + results[i].price);
     };
     console.log("----------------------------------\n");
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "chooseProduct",
          type: "input",
          message: "Please provide the product id of the item you would like to purchase:",
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
          message: "How many would you like?",
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

        var purchaseQuantity = parseInt(answer.quantity);

        // determine if quantity is available
        if (chosenProduct.stock_quantity > purchaseQuantity) {
          // If the quantity is available, calculate cost and update quantity by subtracting number from database
          var total = purchaseQuantity * chosenProduct.price;
          var updateQuantity = chosenProduct.stock_quantity - purchaseQuantity;

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
              console.log("Your order was placed successfully!");
              console.log("Your total was $" + total.toFixed(2));
              start();
            }
          );
        }
        else {
          // The quantity is not available, so apologize and start over
          console.log("Sorry but the quantity you requested is not available. Please try again...");
          start();
        }
      });
  }); // End of query
  
} // End of makePurchase function