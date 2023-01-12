'use strict';
///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.

/* 验证自己的想法
const test = [...gameEvents]; // test是数组的数组
const test1 = [1, 2, 3, 4];
console.log(test);
// console.log(Object.values(...gameEvents)); // 这只能针对对象使用，而不是map,但可以把map转成对象。map是无法转成对象的，因为对象的key很局限，一般是字符串。

const gameEventsOb = new Object(test);

console.log(gameEventsOb, typeof gameEventsOb, typeof test1);


*/
//老师的做法：
console.log(gameEvents.values());
console.log([...gameEvents.values()]);
const events = [...new Set([...gameEvents.values()])];
console.log(events);

/*
//自己的做法：

let eventsArr = [];

function getvalues(map) {
  for (let [time, event] of map) {
    if (typeof time === 'number') {
      eventsArr.push(event);
    }
  }
  return eventsArr;
}

eventsArr = getvalues(gameEvents);

// console.log(eventsArr);

const events = new Set(eventsArr);
console.log(events);
*/

// 2.

gameEvents.delete(64);
// console.log(gameEvents);

// 3.

// console.log(gameEvents.size);

let times = 90 / gameEvents.size;

// 非常难以阅读和理解的代码，但非常简单，只是写的像一坨狗屎！
times =
  [...gameEvents.keys()][[...gameEvents.keys()].length - 1] / gameEvents.size;
// console.log(times);

console.log(`An event happened, on average, every ${times} minutes`);

// 4.
for (let [time, event] of [...gameEvents]) {
  if (time > 45) {
    console.log(`[LAST HALF] ${time}: ${event}`);
  } else {
    console.log(`[FIRST HALF] ${time}: ${event}`);
  }
}

/*

// test 对象和map的异同。
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

// console.log(game.keys());
console.log(Object.keys(game));

console.log(gameEvents);
console.log(...gameEvents);
console.log([...gameEvents.entries()]);
console.log([...gameEvents.keys()]);
console.log([...gameEvents.values()]);
*/
