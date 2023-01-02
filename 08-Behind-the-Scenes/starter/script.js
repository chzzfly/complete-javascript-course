'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);

  // 通过作用域链，它去找age和birthYear
  function printAge() {
    const outPut = `You are ${age}, born in ${birthYear}`;
    console.log(outPut);
  }

  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);

console.log(me);
// console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;
