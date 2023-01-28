'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// !!老派的（old school）调用方式!! //
// const request = new XMLHttpRequest();
// request.open('GET', 'https://restcountries.com/v3.1/name/china');

// request.send();
// // 打印respoText没有作用，因为数据发送是non-block行为，在后台进行，当继续到这行代码时，数据还没发过来，因此无法显示。
// // todo 按道理来说，这里dataNone的值应该是undefined或者其他吧，为什么是空白呢。
// console.log(request.responseText);
// const dataNone = request.responseText;
// console.log(dataNone);

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src=${data.flags.svg} />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 100000000
        ).toFixed(1)} 亿人</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
    </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/*
// 函数：调取某国家，然后在HTML中显示一些数据
const getCountryAndNeighbour = function (country) {
  // 1. 获取当前的country国家
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  // send 请求将在后台运行，一旦得到数据就会触发“load"，然后开始加载回调函数。
  request.addEventListener('load', function () {
    // 只取第3个
    const [data, ...others] = JSON.parse(this.responseText);
    console.log(data);
    // 2. 渲染当前的country国家
    renderCountry(data);

    // 3. 获取邻国
    const [neighbour] = data.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    // 在回调函数里，添加了回调函数
    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      // 2. 渲染当前的country国家
      renderCountry(data, 'neighbour');
    });
  });
};

// 他们的货币是一个对象，里面的key是根据不同国家变化的，如何直接获取值呢？
// 难不倒我 Object.values(data.currencies)[0].name
// getCountryAndNeighbour('portugal');
// getCountry('germany');
// getCountry('usa');
getCountryAndNeighbour('CN');
// getCountry('tw');

// callback hell
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

*/

// 现代（modern）调用方式
// 使用 fetch 发送一个 get 请求，它还有很多参数，但现在不深究
const request = fetch('https://restcountries.com/v3.1/name/cn');
console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// 使用箭头函数简化代码：
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('cn');
