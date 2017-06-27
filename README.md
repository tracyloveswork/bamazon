# bamazon
A command line shopping app using SQL and node.js.
# Files
- bamazonCustomer.js | Contains script to be run with node command line
- bamazonSchema.sql | Contains the SQL to create and populate the initial database
- package.jason | node modules to be installed

# Customer View
node bamazonCustomer.js
- User is prompted to confirm they would like to see a list of items.
- If they choose no, the app is closed and the user is returned to the terminal prompt.
- If they choose yes, a query is made to the database and a list of items including an ID and price is displayed.
- The user is then asked to provide the ID of an item they would like to purchase.  If the response is determined to be valid, the user will then be prompted to provide quantity. 
- If the requested quantity is determined to be less than the stock quantity, the user will get an affirmation and total amount.  The purchased quantity is subtracted from the stock in the database.
- If the quantity requested is greater than the stock available, the user will get a message stating the transaction cannot be completed.
- The user is again prompted if they would like to see the product list.

# Screenshots
- Initial view of database 
![Image of Initial State of Database](https://github.com/tracyloveswork/bamazon/blob/master/screenshots/database_initial.jpg)
- Updated database after purchases 
![Image of Updated State of Database](https://github.com/tracyloveswork/bamazon/blob/master/screenshots/database_updated.jpg)
- Successful purchase at command line 
![Image of Successful Purchase](https://github.com/tracyloveswork/bamazon/blob/master/screenshots/bamazon_successfulPurchase.jpg)
- Quantity not available at command line 
![Image of Quantity Not Available](https://github.com/tracyloveswork/bamazon/blob/master/screenshots/bamazon_quantityNotAvailable.jpg)
