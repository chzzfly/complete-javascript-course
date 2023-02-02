'use strict'; // 在module模块中隐含;

// 概念：所有变量、数据的不变性，纯函数，更多使用三元运算符

// 程序；花费清单，每人有金额限制，可以检查是否超出金额，可以检查多于某金额的支出。
// 应用函数式编程的不变性，冻结对象。事实上，冻结只能浅冻结，也就是冻结第一层。
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// 和 || 一样，遇到ture直接返回；如果不是，后面的0对于？？来说也是true，只有undefined和null 才是false
// 如果这个对象里有user则返回user的值，如果没有则返回0
// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

// 这个函数不是pure function，因为它在修改它之外的数据 budget。我们已经冻结了budget，在这里最好弄个数据的拷贝。
// 现在它已经是一个pure function了。
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(spendingLimits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// budget 已经被冻结了，但还能被修改第二层的数据，如下第一行不可修改，第二行可以修改。
// budget[0] = 233
// newBudget3[0] = 233;

// 这个函数修改了已冻结的对象数据，不可取，不是pure function，改一下。
// const checkExpenses = function (state, limits) {
//   // 这个代码修改了传入的newBudget3数组，不好！
//   // state.forEach(entry => {
//   //   if (-entry.value > getLimit(limits, entry.user)) {
//   //     entry.flag = 'limit';
//   //   }
//   // });
//   return state.map(entry => {
//     return -entry.value > getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
// };

// 使用箭头函数重写上面的代码：有点太聪明了，不如上面的阅读性好。
const checkExpenses = (state, limits) =>
  state.map(entry =>
    -entry.value > getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// 依然是在不停的操作budget数组，这完全不科学！
const logBigExpenses = function (state, bigLimit) {
  const BigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    // .map(entry => entry.description.slice(-2))
    // .join('/');
    .reduce((str, entry) => `${str} / ${entry.description.slice(-2)}`, '');

  const BigExpenses1 = BigExpenses.slice(2);
  console.log(BigExpenses1);

  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} /` : '';

  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

// console.log(budget);

logBigExpenses(finalBudget, 100);
