'use strict';

// 1.选择元素
const score0El = document.querySelector('#score--0');
//会比上面稍微快一点
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// 2.初始化游戏条件

let scores, currentScore, activePlayer, playing;

// 初始化 init

const init = function () {
  // 初始化所有值
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // 初始化所有显示
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// 切换玩家

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 3.实现掷骰子功能
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. 生成一个随机的骰子
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    // 2. 显示骰子
    if (diceEl.classList.contains('hidden')) {
      diceEl.classList.remove('hidden');
    }
    diceEl.src = `dice-${dice}.png`;

    // 3.检查骰子
    if (dice !== 1) {
      // 将骰子添加到当前分数上，动态的
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScore0El.textContent = currentScore;
    } else {
      // 切换到另一位玩家，在切换之前，先把当前玩家的当前分数设置为0
      switchPlayer();
    }
  }
});

// 4. 实现Hold功能
btnHold.addEventListener('click', function () {
  if (playing) {
    // 将当前分数加到当前玩家的总分数中，并显示在屏幕上，然后切换玩家
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 如果分数超过100，则胜利
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 切换到另一个玩家
      switchPlayer();
    }
  }
});

// 5.new game 初始化，重新开始游戏
btnNew.addEventListener('click', init);
