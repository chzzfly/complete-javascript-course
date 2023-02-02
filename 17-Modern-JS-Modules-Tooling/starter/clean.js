// 'use strict'; 在module模块中隐含

// 程序；花费清单，每人有金额限制，可以检查是否超出金额，可以检查多于某金额的支出。
const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

// 和 || 一样，遇到ture直接返回；如果不是，后面的0对于？？来说也是true，只有undefined和null 才是false
// 如果这个对象里有user则返回user的值，如果没有则返回0
const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpense = function (value, description, user = 'jonas') {
  // 设置参数的默认值
  // if (!user) user = 'jonas';
  user = user.toLowerCase();

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');

console.log(budget);

const checkExpenses = function () {
  // for (const entry of budget) {
  //   // 和 || 一样，遇到ture直接返回；如果不是，后面的0对于？？来说也是true，只有undefined和null 才是false
  //   // const limit = spendingLimits?.[entry.user] ?? 0;
  //   if (entry.value < -getLimit(entry.user)) {
  //     entry.flag = 'limit';
  //   }
  // }
  budget.forEach(entry => {
    if (-entry.value > getLimit(entry.user)) {
      entry.flag = 'limit';
    }
  });
};
checkExpenses();

const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget)
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} /` : '';

  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

console.log(budget);

logBigExpenses(100);
