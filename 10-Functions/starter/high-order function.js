"use strict";

//------回调函数-------//

// 把 str字符串的空格替换为没有，然后将所有字母小写
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

// 把 str 的第一个单词大写，然后返回
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// 创建一个高阶函数，接收其他函数作为参数
// 高阶函数去调用这个回调函数！而不是我们自己。
const transformer = function (str, fn) {
  const str1 = fn(str);
  console.log(str1);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

//-----返回函数-----------//
// 返回一个匿名函数
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}`);
  };
};
// const greet = (greeting) => (name) => console.log(`${greeting}, ${name}`);
// //这个greeterHey实际上是我们返回的函数了
const greeterHey = greet("Fuck");

console.log(greet("hey"));
greeterHey("jonas");

greet("hello")("madaed");
