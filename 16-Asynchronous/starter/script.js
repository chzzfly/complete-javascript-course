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

// 函数：调取某国家，然后在HTML中显示一些数据
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  // send 请求将在后台运行，一旦得到数据就会触发“load"，然后开始加载回调函数。
  request.addEventListener('load', function () {
    // 只取第3个
    const [data, ...others] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
      <article class="country">
      <img class="country__img" src=${data.flags.svg} />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 100000000
            ).toFixed(1)} people</p>
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
  });
};

// 他们的货币是一个对象，里面的key是根据不同国家变化的，如何直接获取值呢？
// 难不倒我 Object.values(data.currencies)[0].name
getCountry('portugal');
getCountry('germany');
getCountry('usa');
getCountry('CN');
getCountry('tw');

// 现代（modern）调用方式
