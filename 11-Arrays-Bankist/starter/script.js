"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// computing usernames
const createUserNames = function (names) {
  names.forEach(function (name) {
    name.userName = name.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);
// console.log(accounts);

// 获取存取款信息
const displayMovements = function (movements, sort = false) {
  //我们不想让sort改变原数组，因为要做一个拷贝
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

// 计算余额

const calcDisplayBalance = function (acc) {
  // JS中默认的程序拷贝都是浅拷贝，指定对象的元素的值更改会改变原来的值
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// calcDisplayBalance(account1.movements);

// 计算存款，取款，利息
const eurToUsd = 1.1;
const calcDisplaySummary = function (acc) {
  const sumIn = acc.movements
    .filter((mov) => mov > 0)
    // .map((mov) => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${sumIn}€`;

  const sumOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(sumOut)}€`;

  //每次存入一次，得到存款1.2%的利息，我们的规则，低于1的利息不算数
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * (acc.interestRate / 100))
    .filter((interest) => interest >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  // console.log(interest);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

// 更新UI函数

const updateUI = function (acc) {
  // 显示存取款详情
  displayMovements(acc.movements);
  // 显示余额
  calcDisplayBalance(acc);
  // 显示总结
  calcDisplaySummary(acc);
};

// event handler，实现登陆功能
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // 阻止页面自动刷新（提交）
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // 登陆成功的话，清空用户名和密码两个输入框
    // console.log(currentAccount);
    // inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    // 显示账户界面和登陆消息
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  } else {
    containerApp.style.opacity = 0;
    alert("Wrong username or password.");
  }
});

// 实现转账功能

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const accountTo = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);

  // 清空两个输入框
  inputTransferAmount.value = inputTransferTo.value = "";

  // 对转出账户，如果转出金额小于本账户余额，则先对本账户的余额进行扣除，显示这个转出操作，执行转出
  if (
    accountTo &&
    accountTo !== currentAccount &&
    amount > 0 &&
    amount <= currentAccount.balance
  ) {
    currentAccount.movements.push(-amount);
    accountTo.movements.push(amount);
    updateUI(currentAccount);
  } else console.log("something wrong.");
});
// 通过其他方式获得账户余额
// console.log(Number(labelBalance.textContent.slice(0, -1)));
//   if (amount <= Number(labelBalance.textContent.slice(0, -1))) {
//     // 妙啊，直接给当前账户的操作添加一个负的转入
//     currentAccount.movements.push(-amount);
//     displayMovements(currentAccount.movements);
//     calcDisplayBalance(currentAccount.movements);
//     calcDisplaySummary(currentAccount);
//     accounts.find((acc) => acc.userName === accountTo).movements.push(amount);
//     console.log(currentAccount.movements);
//   } else {
//     alert("请检查账户余额");
//   }
// });

// 向银行申请贷款，需要有一笔存款且大于等于贷款金额的10%
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

// 注销账户

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(
  //   inputClosePin.value,
  //   inputCloseUsername.value,
  //   currentAccount.userName,
  //   currentAccount.pin
  // );
  if (
    inputCloseUsername.value === currentAccount.userName &&
    inputClosePin.value === String(currentAccount.pin)
  ) {
    // console.log("deleted");
    const index = accounts.findIndex(
      (acc) => acc.userName === inputCloseUsername.value
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputCloseUsername.value = "";
  }
});

// 对账户的操作进行排序，降序排列
// 表明状态的变量
let flag = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !flag);
  flag = !flag;
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// function checkGogs(dogsJulia, dogsKate) {}

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJuliaCorrected);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  dogs.forEach(function (age, i, all) {
    const ageDe = age >= 3 ? "an adult" : "a puppy";
    console.log(`Dog number ${i + 1} is ${ageDe}`);
  });
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

/* learn about map methods
const movementsUSD = movements.map((mov) => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsTEST = movements.forEach(function (mov, i) {
  return mov * eurToUsd;
});

console.log(movementsTEST);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions.join("；"));
console.log(movementsDescriptions.join("；").split(":"));
*/

// console.log(username);
// console.log(`${createUserNames(user)}`);

// console.log(movements.filter((mov) => mov < 0));

// reduce 方法学习
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}, ${cur}`);
//   // console.log(acc, cur, i);
//   return acc + cur;
// }, 0);

// console.log(balance);

// 获取最大值
const max = movements.reduce(function (acc, cur) {
  if (acc < cur) acc = cur;
  return acc;
}, movements[0]);

// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const calcAverageHumanAge = function (ages) {
  // 使用了 箭头函数、三元表达式
  const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  const humanAgesAdult = humanAges.filter(function (humanAge) {
    return humanAge >= 18;
  });
  console.log(humanAgesAdult);
  // const avgHumanAgesAdult = humanAgesAdult.reduce(function (acc, age, n) {
  //   // 平均数 = 每个年龄加起来，除以总数
  //   // return (acc + age) / 2;
  //   console.log(`第${n}个元素：${age}, 总和为${acc}`);
  //   return acc + age;
  // }, 0)/humanAgesAdult.length;
  // 平均数的另一种算法，把每个数都除以总数再加起来
  const avgHumanAgesAdult = humanAgesAdult.reduce(
    (acc, age, n, arr) => acc + age / arr.length,
    0
  );
  return [humanAges, humanAgesAdult, avgHumanAgesAdult];
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

console.log((36 + 32 + 76 + 48 + 28) / 5);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const calcAverageHumanAge = function (arrs) {
  return arrs.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// 使用for-of方法重构此功能
console.log(accounts);

const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);

for (const acc of accounts) {
  if (acc.owner === "Jonas Schmedtmann") console.log(acc);
}
*/

// const x = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 100));
// console.log(x);

/* array methods practices.

const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((deposit) => deposit > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// reduce 返回一个对象，初始化对象
const bankSums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? "deposit" : "withdraws"] += cur;
      // console.log(cur);
      // console.log(sums["deposit"]);
      return sums;
    },
    { deposit: 0, withdraws: 0 }
  );

const { deposit, withdraws } = bankSums;
console.log(deposit, withdraws);

// 转换字符串：this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitzalize = (str) => str[0].toUpperCase() + str.slice(1);
  const exception = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
  // return title
  //   .split(" ")
  //   .map((cur) => {
  //     if (!exception.includes(cur)) {
  //       return cur[0].toUpperCase() + cur.toLowerCase().slice(1);
  //     } else {
  //       return cur[0] + cur.toLowerCase().slice(1);
  //     }
  //   })
  //   .join(" ");
  // =======老师的讲解========//
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exception.includes(word) ? word : capitzalize(word)))
    .join(" ");
  // console.log(titleCase);
  return capitzalize(titleCase);
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));

*/
///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1.
// dogs.map((dog) => (dog["recommendedFood"] = dog.weight ** 0.75 * 28));

dogs.forEach(function (dog) {
  dog["recommendedFood"] = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

// 2.
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
if (dogSarah.curFood > dogSarah.recommendedFood * 1.1)
  console.log("Eating too much.");
else if (dogSarah.curFood < dogSarah.recommendedFood * 0.9)
  console.log("Eating too little.");
// console.log(dogSarah);

// 3.
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood * 1.1)
  .flatMap((dog) => dog.owners);
const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood * 0.9)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4.

console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

// 5.
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));
// 6.
console.log(
  dogs.some(
    (dog) =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);

const dogsOk = dogs.filter(
  (dog) =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);

console.log(dogsOk);

// 7. 最不拿手的sort，直接看文档，直接看例子，甚至不需要弄懂就能用，呵呵哈哈呼呼！

const dogsAscending = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsAscending);
