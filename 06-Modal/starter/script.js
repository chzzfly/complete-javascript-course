'use strict';

const modal = document.querySelector('.modal');
const overly = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const hidden = document.querySelector('.hidden');

// console.log(btnsOpenModal);

const openModal = function () {
  // console.log('Button clicked!');
  // 删除modal元素的hidden类
  modal.classList.remove('hidden');
  overly.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overly.classList.add('hidden');
  // console.log('a key was pressed');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  // const element = btnsOpenModal[i];
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);

overly.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
