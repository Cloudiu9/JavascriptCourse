// Exporting
console.log('Exporting...');

// Blocking code
// Blocking the code in the main module as well
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finished fetching users.');

const shippingCost = 10;
export const cart = [];

// to export anything:
// NAMED EXPORTS IMP
// needs to happen in TOP LEVEL CODE (can't be inside an if block)
export const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as qt };

// DEFAULT EXPORTS
// used when exporting only 1 thing per module

export default function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to cart`);
}
