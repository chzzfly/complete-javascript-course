'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (stratIndex, mainIndex) {
    return [this.starterMenu[stratIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

const [pizza, , risotto, ...otherFoods] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFoods);

console.log(undefined || 0 || null || NaN);

/*
const arr = [7, 8, 9];
const arr1 = arr.unshift(1, 2);
console.log(arr1, typeof arr1, arr);
const newArr = [1, 2, ...arr];
console.log(newArr);
*/

/*
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 15 };
({ a, b } = obj);
console.log(a, b);

const {
  thu: { open: o, close: c },
} = restaurant.openingHours;
console.log(o, c);
*/

// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;
// console.log(x, y, z);

// const [first1, , , second1 = null] = restaurant.mainMenu;
// console.log(first1, second1);

// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// const {
//   name: first = 1,
//   categories: second = 1,
//   notEx: third = 1,
// } = restaurant;
// console.log(first, `\n`, second, third);

const restR = new Map();
restR.set(1, '山西，中国');
// console.log(restR.set(2, '济源,中国'));

restR
  .set(3, '不知道写啥了')
  .set('onceMore', 'yes, another element')
  .set('lastEl', true)
  .set(true, 'We are open')
  .set(false, 'we are closed');

console.log(restR);

// console.log(restR.get('lastEl'));

const time = 21;

const test = [...restR];
console.log(test);
