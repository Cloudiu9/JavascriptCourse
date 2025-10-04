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

// top level await (outside of async func, only in modules)
// BLOCKS CODE EXECUTION IMP
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// by the time this gets executed, data has not yet arrived
// ==> returns pending promise
const lastPost = getLastPost();
console.log(lastPost);

// this actually returns the intended object, but not very clean
lastPost.then(last => console.log(last));

// fix: top level await
// wrap it in an async IIFE to fix parcel error
(async () => {
  const lastPost2 = await getLastPost();
  console.log(lastPost2);
})();

// Old module pattern (before ES6)
// reason to use: encapsulate data, private data, expose public API
// ==> use functions

// usually make an IIFE (don't have to call it separately, ensure it's only called once)
// purpose: make a new scope, return data once

// also a closure: this func has access to all the variables from its birthplace (addToCart can access shippingCost even if cart isn't exported)
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push(product, quantity);
    console.log(
      `${quantity} ${product} added to cart (shpping cost = ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push(product, quantity);
    console.log(`${quantity} ${product} ordered from supplier.`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apples', 4);
ShoppingCart2.addToCart('pizzas', 2);

const arr = [1, 2, 3, 4, 10, 14];

const sorted = arr.sort((a, b) => a - b);
console.log(sorted);

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'pizza', quantity: 5 },
    { product: 'bread', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
console.log(stateClone);
const deepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone); // also changes to false (shallow copy, bad idea)
console.log(deepClone); // remains true (deep copy, good)

if (module.hot) {
  module.hot.accept();
}
