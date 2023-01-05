'use strict';
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// This is the data.
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.todo bug fixme 为什么可以用const，值不是在变吗？需要结合栈中的数据存储知识来解答，数组所存的是内存中的引用，所以可以用const。115视频的0511分钟弹幕，几天后期待解答。
for (const [index, value] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${value}`);
}

// 2. 计算对象的平均值，一个东西出现了2次，可以重构
let sum = 0;
for (const x of Object.values(game.odds)) {
  sum += x;
}

let average = sum / Object.values(game.odds).length;
console.log(average);

// 3.没有理解要做什么？
/*
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
*/
// fixme 首先只需要根据情况来打印三行中的一行即可。

for (const [team, odd] of Object.entries(game.odds)) {
  // console.log(team, odd);
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`odd of ${teamStr}: ${odd}`);
}

// let winner = game.odds['team1'] < game.odds['team2'] ? game.team1 : game.team2;

// // 怎么判断谁是赢的那一方？
// console.log(`Odd of victory ${winner}: ${
//   game.odds['team1'] < game.odds['team2']
//     ? game.odds['team1']
//     : game.odds['team2']
// }
// Odd of draw: 3.25
// Odd of victory ${winner}: ${
//   game.odds['team1'] > game.odds['team2']
//     ? game.odds['team1']
//     : game.odds['team2']
// }`);

// 4.创建一个scorers的对象，进球的人员作为property，对应的值为得分。
const scorers = {};

//fixme 如果遇到相同的名字，value应该加1
// const jinQiu = function (...players) {
//   for (let x of players) {
//     scorers[`${x}`] = 1;
//   }
// };
// jinQiu('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels');
// console.log(scorers);

for (const player of game.scored) {
  console.log(scorers[player]);
  // todo 如果是第一次遇到这个人，那么这就是undefined的，也就是假的，所以选择后面的表达式，如果第二次遇到这个人，那么这个值就是真的，就是第一个表达式。太精妙了！解决了if else很难解决的问题。学习了！
  scorers[player]
    ? (scorers[player] = scorers[player] + 1)
    : (scorers[player] = 1);
}

console.log(scorers);
