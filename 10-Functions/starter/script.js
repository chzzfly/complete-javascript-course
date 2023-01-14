"use strict";

/*
const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 243434325343,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr." + passenger.name;
  console.log(flightNum);

  if (passenger.passport === 243434325343) {
    alert("Check in.");
  } else {
    alert("Wrong passport.");
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// flight 不会改变，因为它的execution context 是外面，在函数里面又创建了一个它，但不会影响外面的flight
// Jonas会改变，因为它在stack中是存储的引用，真正的值在heap中，所以里面改了heap里的值，外面也会变。

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting}, ${name}`);
//   };
// };

const greet = (greeting) => (name) => console.log(`${greeting}, ${name}`);

// const greeterHey = greet("Hey"); //这个greeterHey实际上是我们返回的函数了
// greeterHey("Jonas");
greet("Hey")("Jonas123");

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

// 使用return function 的方式，重写addVAT函数，复现bind的功能

const addVATSimilar = function (rate) {
  // console.log(rate);
  return function (value) {
    return value + value * rate;
  };
};

const addVATNew = addVATSimilar(0.23);

console.log(addVATNew(100));

*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // const number = Number(
    //   prompt(`What is your favourite programming language?
    // 0: JavaScript
    // 1: Python
    // 2: Rust
    // 3: C++
    // (Write option number)`)
    // );
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );

    // console.log(this);

    // switch (number) {
    //   case 0:
    //     console.log(0);
    //     this.answers[number] += 1;
    //     break;
    //   case 1:
    //     console.log(1);
    //     this.answers[number] += 1;
    //     break;
    //   case 2:
    //     console.log(2);
    //     this.answers[number] += 1;
    //     break;
    //   case 3:
    //     console.log(3);
    //     this.answers[number] += 1;
    //     break;
    //   default:
    //     console.log("check your answer please.");
    // }
    if (
      answer >= 0 &&
      answer <= this.answers.length &&
      Number.isInteger(answer)
    ) {
      this.answers[answer] += 1;
      // console.log(this.answers);
      this.displayResults();
      this.displayResults("string");
    } else {
      console.log("Please check your answer.");
    }
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      // 为什么不能直接扩展数组？
      // const result = `${...this.answers}`;
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

// poll.displayResults();
// poll.displayResults("string");

const display = poll.displayResults.bind({ answers: [5, 2, 3] }, "string");

display();

poll.displayResults.call({ answers: [5, 2, 3] });
