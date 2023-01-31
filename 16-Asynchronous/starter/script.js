"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

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

// 渲染获取的数据到HTML文档中，显示在网页上。
const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src=${data.flags.svg} />
    <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
    </div>
</article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
};

// 在网页上输出错误消息

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

/*
// 函数：调取某国家的数据
const getCountryAndNeighbour = function (country) {
  // 1. 获取当前的country国家
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  // send 请求将在后台运行，一旦得到数据就会触发“load"，然后开始加载回调函数。
  request.addEventListener('load', function () {
    // 只取第1个，这个库里中国有4个地区
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
// 使用 fetch 发送一个 get 请求，它还有很多参数，不过现在不深究
// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

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

// 将获取JSON和捕获错误封装到一个函数中：
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    // console.log(response);

    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};

// 使用箭头函数简化代码：
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found. ${response.status}`);

//       return response.json();
//     })
//     // 下面的then方法被return后，接着处理。
//     // 不要在fetch获取数据后直接.then进行处理，这等于还是在上一个then里面继续调用then，回到了回调地狱。
//     // 不过感觉then方法更加地狱了
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       // 如果不存在，立即返回
//       if (!neighbour) return;

//       // 获取邻国
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     // 以下处理的是上个then方法return后的数据
//     .then(response => getJSON(response))
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} 💥💢💥`);
//       renderError(`Something went wrong 💥💢💥 ${err.message} Try again!</br>`);
//     });

//   //   // 获取邻国的邻国
//   //   const neighbour1 = data[0].borders[0];
//   //   return fetch(`https://restcountries.com/v3.1/alpha/${neighbour1}`);
//   // })
//   // .then(response => response.json())
//   // .then(data => renderCountry(data[0], 'neighbour'));
// };

// 使用getJSON函数简化代码
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];

      // 如果不存在，立即返回
      if (!neighbour) throw new Error("No neighbour!");

      // 获取邻国
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then((data) => {
      renderCountry(data[0], "neighbour");
    })
    .catch((err) => {
      console.error(`${err} 💥💢💥`);
      renderError(`Something went wrong 💥💢💥 ${err.message} Try again!</br>`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", function () {
  getCountryData("cn");
});

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// whereAmI()函数 会 return 整个fetch chain，所以调用这个函数后才会有所反映，而不只是做了AJAX的动作。
const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=JSON&auth=212337148291713544268x30075 `
  )
    .then((response) => {
      // console.log(response);
      if (!response.ok)
        throw new Error(`${response.status}, This is the message.`);
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country);
    })
    .catch((err) => console.error(`Something Wrong. ${err.message}`));
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

/*
// The event loop in practice
// js engine 里面的代码被优先执行，打印2行输出，注册两个回调函数，都在0秒后执行。
// 这两个回调函数，一个在microtasks queue，一个在 callback queue，因此，promise先执行。
// setTimeout()，不能保证时间，只能保证不在这个时间之前。因为要放进callback 队列等待执行，如果被微任务队列阻塞，将会花费很长时间。
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 1; i < 100000000; i++) {} // 累死我的电脑了
  console.log(res);
});
console.log('Test end');

*/

/*
// build a simple promise,promise(executor function)

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🎈');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You Win 🍟');
    } else {
      reject(new Error('You lose your money 💥'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

*/

// 将setTimeout promisifying 承诺化，不能理解这个转化
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('5 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('6 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// 通过Promise类上的static方法，创建一个promise,fulfilled and reject.
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('abc')).catch(x => console.error(x));

// 这是一个异步请求，把任务弄到web api那里去完成，然后立即到下一行，因此下一行先在控制台打印。
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// console.log('Getting position');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// 选择图片要插入的地方
const imgContainer = document.querySelector(".images");

// 1. 创建一个promise，值为路径
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath; // 这本身就是个异步的操作
    // imgContainer.append(img); // 这里就可以直接加载，甚至不需要promise，resolve或reject

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not fond."));
    });
  });
};

let currentImg;

createImage("./img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log(` image 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("./img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log(` image 2 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("./img/img-3.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log(` image 3 loaded`);
    return wait(2);
  })
  .catch((err) => console.error(err));
