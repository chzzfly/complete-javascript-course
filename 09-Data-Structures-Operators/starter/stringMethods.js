'use strict';
console.log('hello!');

/*
const str = String("Yes, I'm constructor build.");
const str1 = "Yes, I'm a directly string.";

console.log(str, str1);

console.log(str[0], str[4]);
console.log(str.indexOf('build'));

console.log(str.slice(0, -1));
// console.log(str.replace('Y', 'y'));
console.log(str.replace('Y', 'y').replace('I', 'i').replace('build', 'String'));

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are Not allowed on board.');
  } else {
    console.log('Welcome aboard.');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife.');
checkBaggage('Socks and camera');
checkBaggage('Got some snake and a gun for protection.');

console.log(str.split(' '));

// 将每个单词的首字母都大写
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // const firstL = n[0];
    const nUpper = n.replace(n[0], n[0].toUpperCase());
    namesUpper.push(nUpper);
  }

  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new row in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// 1.获取用户输入的数据，对数据进行清洗，然后转换

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');

btn.addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  // console.log(text);
  // 按换行符，把整个分成5行，每一行都是个数组
  const rows = text.split('\n');
  // console.log(rows);
  let i = 1;
  for (const row of rows) {
    let [first, second] = row.toLowerCase().trim().split('_');
    // first.replace(first[0], first[0].toUpperCase());
    second = second[0].toUpperCase() + second.slice(1);
    const output = [first, second].join('');
    console.log(output.padEnd(20, ' ') + '✅'.repeat(i));
    i += 1;
  }
});

///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  // console.log(flight.length);
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ' '} ${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(45, ' ');
  console.log(output);
}

///////////////////////////////////////

// const getCode = str => str.slice(0, 3).toUpperCase();

// for (const flight of flights.split('+')) {
//   const [type, from, to, time] = flight.split(';');
//   const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
//     '_',
//     ' '
//   )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
//   console.log(output);
// }
