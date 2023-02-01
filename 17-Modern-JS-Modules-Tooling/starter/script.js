// Importing module

// 1.导入部分值
console.log('Importing module');
// import { addToCart, totalPrice as price, tq } from './shopppingCart.js';
// 无法访问module的值，因为那是private，不是global scoop的，必须要导出才能访问
// console.log(shippingCost);
// addToCart('辣条', 3);
// console.log(price, tq);

// 2. 导入所有export的
// 将shoppingCart文件中所有export的东西都导入进来；并且给这些导入的值一个namespace.
// 可以理解为模块是一个类，ShoppingCart 是根据类创建的一个对象，这个对象有方法也有property。也可以理解成一个public api，因为不导出的内容都是private。

// import * as ShoppingCart from './shopppingCart.js';

// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// 3. default exports and mix use，但我们从来不会混合使用它们！不要这么做！
// import add, { addToCart, totalPrice as price, tq } from './shopppingCart.js';
// console.log(price, tq);

// 默认导出无须名字，通常一个模块只有一个，我们可以在导入时任意起名字，还不需要花括号。

/*
import add, { cart } from './shopppingCart.js';

add('tomato', 33);
add('bread', 3);
add('apples', 333);

// 为了示范 import的内容和export是联系的，live connetion
console.log(cart);

// await 可以在模块中 top-level 执行，但会阻塞模块的执行
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  // console.log(data);

  return { titile: data.at(-1).titile, text: data.at(-1).body };
};

const lastPost = getLastPost();

// async function 的返回值永远是 promise
console.log(lastPost);

// 为研究而使用then，永远不使用这玩意！
// lastPost.then(last => console.log(last));

// 使用 top-level await
const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

// 模块pattern；模块模式
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

// 函数已经执行完毕，返回了这四个值，为什么还能访问之前的数据，因为闭包。
// 闭包允许函数访问它出生时所有存在的变量，比如addtocart函数可以访问cart数据变量。
ShoppingCart2.addToCart('apple', 4);
console.log(ShoppingCart2.cart);
