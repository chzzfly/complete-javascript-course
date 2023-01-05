'use strict';
///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

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
    team1: 133,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.各个队的玩家
// const players1 = [...[...game.players][0]];
// const players2 = [...[...game.players][1]];
const [players1, players2] = game.players;
// console.log(players1, players2);

// 2. 玩家数组中的第一个人是分数保持者（goalkeeper），其他是剩下的参赛员工。比如第一队，gk是goalkeeper的名字，fieldplayers是其他10个参赛人员
const [gk, ...fieldPlayers] = players1; //解构

// 3.所有玩家
const allPlayers = [...[...game.players][0], ...[...game.players[1]]];

// 4.替补队员
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// 5.解构odds
// const { team1, x: draw, team2 } = game.odds;
const {
  odds: { team1, x: draw, team2 },
} = game;

// 6.函数，接收一个任意数量的队员名字，打印他们的每一个在控制台，同时如果某个队员得分就+1分，打印出总得分。

//将传入的内容，放到一个names数组内
const printGoals = function (...names) {
  // console.log(...names);
  let score = 0;
  // console.log(names);
  for (let i = 0; i < names.length; i++) {
    // console.log(i);
    let boo = game.scored.includes(names[i]);
    // console.log(boo);
    if (boo) {
      score = score + 1;
      // console.log(score);
    }
  }
  return score;
};

const printGoals1 = function (...players) {
  let str = '';
  for (const x of players) {
    str += `${x},`;
  }
  console.log(`${str} total ${players.length} goals were scored.`);
};

printGoals1('Neuer', 'Gnarby', 'Lewandowski', 'Hummels');

// console.log(printGoals('Neuer', 'Gnarby', 'Lewandowski', 'Hummels'));

// 7.低赔率的队伍更可能获胜，在不使用if语句或三元表达式的情况下，打印哪个队伍更可能获胜。

//没有考虑赔率相等的情况，如何做到？todo.
// const winner = team1 < team2 ? game.team1 : game.team2;

// 这是三元表达式的写法
// const winner = team1 < team2 || team1 > team2 || team1 === team2;

// 逻辑运算符的写法是这样的
team1 < team2 && console.log('Team1 is more likely to win.');
team1 > team2 && console.log('Team2 is more likely to win.');

// demonstrate 结果数据演示

const results = {
  first: `队伍1：${players1}, 队伍2：${players2}`,
  second: `第一名：${gk}，剩下的队员：${fieldPlayers}`,
  third: `所有比赛人员：${allPlayers}`,
  forth: `替补人员：${players1Final}`,
  fifth: `得分：${team1},${draw}, ${team2}}`,
  sixth: printGoals('Neuer', 'Pavard', 'Martinez', 'Gnarby', 'Lewandowski'),
  // seventh: `赔率低的队伍是：${winner}`,
};

console.log(results);
