'use strict';

/*
function logger() {
    console.log('Today is Sateday, ohh!');
}

logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);


// function declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

console.log(calcAge1(1991));

// function expression

const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

console.log(calcAge2(1991));

// arrow function

const calcAge3 = birthYear => 2037 - birthYear;

console.log(calcAge3(1991));

// arrow function complex
const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years.`;
}

console.log(yearsUntilRetirement(1991, 'Jonas'));

function cutFruitPieces(fruit) {
    return fruit * 4;
}


function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} apples and ${orangePieces} oranges.`;
    return juice;
}

console.log(fruitProcessor(2, 3));

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const avgDolphins = calcAverage(44, 23, 71);
const avgKoalas = calcAverage(65, 202, 49);
console.log(avgDolphins, avgKoalas);

function checkWinner(avgDolphins, avgKoalas) {
    let winner;
    if (avgDolphins >= avgKoalas * 2) {
        winner = 'Dolphins';
        console.log(`${winner} win (${avgDolphins} vs ${avgKoalas})`)
    } else if (avgKoalas >= avgDolphins * 2) {
        winner = 'Koalas';
        console.log(`${winner} win (${avgDolphins} vs ${avgKoalas})`)
    } else {
        console.log('No team wins...');
    }
    return winner;
}

checkWinner(avgDolphins, avgKoalas);


// code challenge #2
// function calcTip(bill) {
//     if (bill >= 50 && bill <= 300) {
//         return bill * 0.15;
//     } else {
//         return bill * 0.20;
//     }
// }
// create an arrow function，parameter is bill，and the function body is ternary expression. finally calling this function.
const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[bills.length - 1]), typeof calcTip];
console.log(tips);


const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    calcAge: function (birthYear) {
        return 2022 - 1991;
    }
};

console.log(jonas);
console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}.`)
const age = jonas.calcAge(1991);
const age1 = jonas['calcAge'](1991);
console.log(age, age1);


// this
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: false,
    calcAge: function () {
        // console.log(this);
        this.age = 2022 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.age}-years old teacher, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }
};

console.log(jonas.calcAge());
console.log(jonas.age);

// challenge

console.log(`${jonas.firstName} is a ${jonas.age}-years old teacher, and he has ${jonas.hasDriversLicense ? 'a' : 'no'} driver's license.`);
console.log(jonas.getSummary());


// code challenge #3

const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    }
}

const john = {
    firstName: 'John',
    lastName: 'Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    }
}


const higher = mark.calcBMI() > john.calcBMI() ? mark : john;
const lower = mark.BMI < john.BMI ? mark : john;

const result = `${higher.firstName} ${higher.lastName}'s BMI(${higher.BMI}) is higher than ${lower.firstName} ${lower.lastName}'s BMI(${lower.BMI})! `;

console.log(result);


let dice = Math.trunc(Math.random() * 6 + 1);

while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6 + 1);
}
*/

// code challenge #4

const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [], totals = [];

for (let i = 0; i < 10; i++) {
    tips.push(calcTip(bills[i]))
    totals.push(tips[i] + bills[i])
}
console.log(tips, totals);

function calcAverage(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    console.log(typeof arr.length)
    return sum / arr.length;
}

console.log(calcAverage(bills), calcAverage(tips), calcAverage(totals));