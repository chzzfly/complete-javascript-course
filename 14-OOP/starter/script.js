'use strict';

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // never do this, because everytime we call Person, it will be define
//   //   this.calcAge = function () {
//   //     console.log(2037 - this.birthYear);
//   //   };
// };

// // prototype

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const jonas = new Person('Jonas', 1991);

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

// console.log(BMW);
// console.log(Mercedes);

// BMW.accelerate();
// BMW.accelerate();
// BMW.accelerate();
// BMW.accelerate();
// Mercedes.brake();

// console.log(Car);

// const hanshu = function () {
//   console.log('只是一个测试函数，看看这个普通的函数是否有prototype property');
// };

// console.log(hanshu);

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
/*
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
// ford.speedUS;
// console.log(ford.speed);
// ford.speedUS = 100;
// console.log(ford.speed);
// ford.speedUS;
// ford.accelerate();
*/
///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// console.log(Car);

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // 将ev类的原型链接到父类的原型，这将创建一个有继承关系的新对象
// EV.prototype = Object.create(Car.prototype);

// // 创建对象的方法
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// // 多态：子类的加速方法覆盖了父类的加速方法
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);

// // 查看EV类的原型对象的构造函数，应该是EV，现在是Car
// console.log(EV.prototype.constructor);
// // tesla实例的原型proto应该是EV，EV的原型proto是Car，现在是不对的，更改它：
// EV.prototype.constructor = EV;

// // 没有什么大的影响，只是构造函数变了
// console.log(EV.prototype.constructor);

// // 测试程序是否正常工作
// console.log(tesla);
// console.log(tesla.speed);
// tesla.accelerate();
// tesla.accelerate();
// tesla.chargeBattery(100);
// tesla.accelerate();
// tesla.brake();
// tesla.brake();
// tesla.brake();
// tesla.brake();
// tesla.brake();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();

// 使用ES6 class 的写法来实现类之间的继承
/*
class Person {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

const jonas = new Person('Jonas', 1991);

class Student extends Person {
  // 设置一个private property，只能在类中使用
  #deposite = 100;

  // 如果 child class 没有新的参数要添加，那完全可以不要下面的构造代码
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }

  // 私有方法，只能在class内部访问
  #calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }

  // 公共方法，外部可以访问的
  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }

  changeDeposite(val) {
    console.log(this.#deposite);
    this.#deposite = val;
    console.log(this.#deposite);
  }

  archivePrivateMe() {
    this.#calcAge();
  }

  // static method，只能在class上访问，不能在实例中访问，不在原型中
  static helper() {
    console.log('Helper');
  }
}

const martha = new Student('Martha', 1992, 'cs');

console.log(martha);

// martha.#calcAge();
martha.archivePrivateMe();

martha.changeDeposite(150);

// martha.#deposite;
//

*/

///////////////////////////////////////
// Coding Challenge #4
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCL extends CarCl {
  // private field
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  // 多态：子类的加速方法覆盖了父类的加速方法
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCL('Rivian', 120, 23);

console.log(rivian);
rivian.accelerate().brake().brake().chargeBattery(50).accelerate();
console.log(rivian.speedUS);
