// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*
const xshell = 23;
if (xshell === 23) console.log(23);

console.log(xshell);
console.log("what's your name");
console.log("yes, double quote is ok!");
//fixme todo bug

const temps = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  //   console.log(max, min);
  return max - min;
};

// calcTempAmplitude([3, 7, 4, 1, 8, -5, "hello", "-9", "20"]);

console.log(calcTempAmplitude(temps));
*/

// todo code challenge #1

const printForecast = function (arr) {
  let mesg = "";
  for (let i = 0; i < arr.length; i++) {
    mesg += `... ${arr[i]}℃ in ${i + 1} days`;
  }
  console.log(mesg + "...");
};

printForecast([17, 21, 23, 40]);
