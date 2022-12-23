/*
let js = 'amazing';

40 + 8 + 23 - 10;
console.log(40 + 8 + 23 - 10);
let myFirstJob = 'Programmer';
let myCurrentJob = 'Teacher';

console.log(myCurrentJob);
// console.log(myFirstJob);


let x = 10 + 5;
x += 10;
x *= 4;
x++;
x--;
console.log(x);
*/

/*
// code challenge #1
let markMass = 95, markHeight = 1.88;
let johnMass = 85, johnHeight = 1.76;
let markBMI = markMass / (markHeight ** 2);
let johnBMI = johnMass / (johnHeight ** 2);

let markHighterBMI = markBMI > johnBMI;

console.log(markBMI, johnBMI, markHighterBMI);


const firstName = 'Jonas';
const job = 'Teacher';
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ", a " + (year - birthYear) + ' years old ' + job + '!';
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(jonasNew);

console.log(`mutiple lines
like this.
wow
interesting!`);

const age = 17;

if (age >= 18) {
    console.log('Sarah can start diriving license 🚗');
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wate another
    ${yearsLeft} years :)`);
}

// code challenge #2
let markMass = 95, markHeight = 1.88;
let johnMass = 85, johnHeight = 1.76;
let markBMI = markMass / (markHeight ** 2);
let johnBMI = johnMass / (johnHeight ** 2);

let markHighterBMI = markBMI > johnBMI;
if (markHighterBMI) {
    console.log(`Mark's BMI(${markBMI}) is higher than John's(${johnBMI})!`);
} else {
    console.log(`John's BMI(${johnBMI}) is higher than Mark's(${markBMI}).`);
}


const inputYear = '1991';
console.log(Number(inputYear), inputYear, typeof inputYear);

const favorite = Number(prompt("what's your favorite number? "));
console.log(favorite, typeof favorite);


// code challenge #3

const scoreDolphins1 = Number(prompt('please input first score: '));
const scoreDolphins2 = Number(prompt('please input second score: '));
const scoreDolphins3 = Number(prompt('please input thrid score: '));
const averageScoreDol = (scoreDolphins1 + scoreDolphins2 + scoreDolphins3) / 3;

const scoreKoalas1 = Number(prompt('please input first score: '));
const scoreKoalas2 = Number(prompt('please input second score: '));
const scoreKoalas3 = Number(prompt('please input thrid score: '));
const averageScoreKoa = (scoreKoalas1 + scoreKoalas2 + scoreKoalas3) / 3;

if (averageScoreDol > averageScoreKoa && averageScoreDol >= 100) {
    console.log("Dolphins is the winner!");
} else if (averageScoreDol === averageScoreKoa && averageScoreDol >= 100) {
    console.log("Tie.");
} else if (averageScoreKoa > averageScoreDol && averageScoreKoa >= 100) {
    console.log("Koalas is the winner!");
} else {
    console.log('No one wins😭');
}
*/

// code challenge #4

let tip;
let bill = 40;
tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
// if (bill >= 50 && bill <= 300) {
//     tip = bill * 0.15;
// }

console.log(`the bill was ${bill}, the tip was ${tip}, and the total value was ${tip + bill}`)