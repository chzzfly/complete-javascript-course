"use strict";
/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🍕 Correct Number!';

console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

// 定义一个数字，定义一个当前分数，定义一个最高分数。
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
// 在控制台提示我们正确的数字是什么。
console.log(secretNumber);

// 重构代码
// 3种函数的定义方式，最终使用箭头函数
// function displayMessage(message) {
//   document.querySelector('.message').textContent = message;
// }

// const displayMessage = function (message) {
//   document.querySelector('.message').textContent = message;
// };
// Arror function
const displayMessage = (message) =>
  (document.querySelector(".message").textContent = message);

// Again按钮的操作，初始化所有设置.
// 难道要我把原来的东西再写一遍吗？能不能直接删除已经有的改变。
document.querySelector(".again").addEventListener("click", function () {
  // 重新设定随机数，重新设定得分
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  console.log(secretNumber);
  // 重置页面的内容：？，20分，开始猜测
  document.querySelector(".number").textContent = "?";
  document.querySelector(".score").textContent = score;
  document.querySelector(".message").textContent = "Start guessing ...";
  document.querySelector(".guess").value = "";
  // 重置页面的CSS样式
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});

// check按钮的操作
document.querySelector(".check").addEventListener("click", function () {
  //   console.log(document.querySelector('.guess').value);
  const guess = Number(document.querySelector(".guess").value);
  // console.log(guess, typeof guess);
  // 当分数>0时，才可以玩
  if (score > 0) {
    // 错误的输入只会提示，不会减分
    if (!guess) {
      displayMessage("❌ No number!");

      // 当玩家赢得比赛时
    } else if (guess === secretNumber) {
      displayMessage("🍕 Correct Number!");
      document.querySelector(".number").textContent = secretNumber;

      //如果当前的分数大于当前的最高分，则刷新最高分
      if (score > highScore) {
        document.querySelector(".highscore").textContent = score;
        highScore = score;
      }

      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";

      // 如果玩家猜错了
    } else if (guess !== secretNumber) {
      //使用三元表达式，如果大了显示这个，小了显示那个
      displayMessage(guess > secretNumber ? "↗ Too High!" : "↘ Too Low!");
      score--;
      document.querySelector(".score").textContent = score;
    }

    /*
    // 猜的数字太大了
    else if (guess > secretNumber) {
      document.querySelector('.message').textContent = '↗ Too High!';
      score--;
      document.querySelector('.score').textContent = score;

      // 猜的数字太小了
    } else if (guess < secretNumber) {
      document.querySelector('.message').textContent = '↘ Too Low!';
      score--;
      document.querySelector('.score').textContent = score;
    }
    */

    // 没有机会再猜了
  } else {
    // document.querySelector('.message').textContent = '💥 You lost the game!';
    displayMessage("💥 You lost the game!");
  }
});
