// Importing
// named imports: have to have same name, curly braces IMP
// import { addToCart, totalPrice as price, qt } from './shoppingCart';
// console.log(shippingCost); ERROR IMP (defined in other module)

// addToCart('bread', 5);
// console.log(price, qt);

// modules get executed first (hoisted up)

console.log('Importing...');

// creating an object that contains every import IMP
// like exporting a public API as a class
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// imports the DEFAULT EXPORT, no matter what it's called IMP
// we CAN mix both exports, but it's not advised IMP
// import add, { addToCart, totalPrice as price, qt } from './shoppingCart.js';

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);

// imports are a LIVE CONNECTION, not a simple copy IMP:
// we export empty cart array, but it gets filled away
console.log(cart);
