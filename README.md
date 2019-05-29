# bamazon

 Amazon-like storefront - the web app takes in orders from customers and depletes stock from the store's inventory.

## Customer view

The customer is provided with a listing of products available to purchase and the price. Customers should be able to select an item and specify a quantity, and then submit the order.

Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request. If not, the app displays a phrase like `Insufficient quantity!`, and then prevents the order from going through.

However, if the store _does_ have enough of the product, it should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, the customer is shown the total cost of their purchase.

 ## Manager view

The app also contains a page for a Manager's overview of the store. This view displays the below:
  
  * View Products for Sale (every available item: the item IDs, names, prices, and quantities)
  * View Low Inventory (all items with an inventory count lower than five)
  * Add to Inventory (an input that will let the manager "add more" of any item currently in the store)
  * Add New Product (allows the manager to add a completely new product to the store.)
