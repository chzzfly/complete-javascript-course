'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never do this, because everytime we call Person, it will be define
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// prototype

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const jonas = new Person('Jonas', 1991);

// console.log(jonas.calcAge());

// jonas.calcAge();

// console.log(jonas instanceof Person);

// console.log(jonas.__proto__);
// console.log(Person.prototype);

// const arr = [3, 4, 5, 6];
// console.log(arr.__proto__.__proto__);

// const h1 = document.querySelector('h1');

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

console.log(BMW);
console.log(Mercedes);

BMW.accelerate();
BMW.accelerate();
BMW.accelerate();
BMW.accelerate();
Mercedes.brake();

console.log(Car);

const hanshu = function () {
  console.log('只是一个测试函数，看看这个普通的函数是否有prototype property');
};

console.log(hanshu);

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  get speedUS() {
    console.log(`${this.make} going at ${this.speed / 1.6} mi/h`);
    return this.speed / 1.6;
  }

  set speedUS(num) {
    this.speed = num * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
ford.speedUS;
console.log(ford.speed);
ford.speedUS = 100;
console.log(ford.speed);
ford.speedUS;
ford.accelerate();
