let express = require('express');
let cors = require('cors');
let app = express();
let PORT = 3000;

app.use(cors());

// Cart Data:

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//Endpoint 1: Add an Item to the Cart
//API Call: http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=1

function addItemToCart(cart, productId, name, price, quantity) {
  let newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(newItem);

  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let result = addItemToCart(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

//Endpoint 2: Edit Quantity of an Item in the Cart
//API Call: http://localhost:3000/cart/edit?productId=2&quantity=3

function updateQuantityByProductId(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantityByProductId(cart, productId, quantity);
  res.json({ cartItems: result });
});

//Endpoint 3: Delete an Item from the Cart
//API Call: http://localhost:3000/cart/delete?productId=1

function deleteItem(cart, productId) {
  return cart.filter((cartItem) => cartItem.productId != productId);
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = deleteItem(cart, productId);
  res.json({ cartItems: cart });
});

//Endpoint 4: Read Items in the Cart
//API Calls: http://localhost:3000/cart

function readItemsInCart(cart) {
  return cart;
}

app.get('/cart', (req, res) => {
  res.json({ cartItems: readItemsInCart(cart) });
});

//Endpoint 5: Calculate Total Quantity of Items in the Cart
//API Call: http://localhost:3000/cart/total-quantity

function findTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = findTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

//Endpoint 6: Calculate Total Price of Items in the Cart
//API Call: http://localhost:3000/cart/total-price

function findTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = findTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(PORT, () => {
  console.log('Server is running at https://localhost:' + PORT);
});
