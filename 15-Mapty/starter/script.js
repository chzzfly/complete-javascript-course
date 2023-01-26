'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// let map, mapEvent;

// 重构我们的代码
// 建立两个大类：一个是App逻辑，一个是用户数据。
// 所有对象公用的property，写在public field中，每个对象个性化的property，在new时需要传入参数的，写在constructor中
// 建4个类，prettier一直报错？

class App {
  // private filed，但是是所有通过class创建的对象共有的，理解private的含义：外部无法访问。
  #map;
  #mapEvent;

  // new 一个对象时，这个构造器会立即执行
  constructor() {
    // 外面的this，指向的是这个类创造的对象
    // console.log(this);
    this._getPosition();

    // 事件监听函数调用的回调函数“this._newWorkout"，它里面的this会指向form元素，而不是 App class 创建的对象，我们需要重新指向
    form.addEventListener('submit', this._newWorkout.bind(this));

    // 切换跑步和骑车的输入框，这个回调函数里没有包含this，也就不需要处理
    inputType.addEventListener('change', this._toggleElevationfield);
  }

  _getPosition() {
    if (navigator.geolocation)
      // 这个方法需要两个回调函数，一个是成功的获取位置，进行操作；一个是获取失败的提示。
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position!');
        }
      );
  }

  _loadMap(position) {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    // const timeGetPosition = new Date(position.timestamp);
    // console.log(latitude, longitude, timeGetPosition);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    // _loadMap是被getCurrentPosition()方法调用的，普通的调用this不会有指向，因此需要绑定指向
    console.log(this);
    this.#map = L.map('map').setView(coords, 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // 在地图上点击，希望地图出现标记（标记不会关闭）；希望左侧列表出现输入框
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    // 将捕获的mapE映射到公共private变量#mapEvent中，这样类中其他地方也能使用这个变量
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationfield() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // render workout form，渲染锻炼的输入表格-绑定事件：用户提交新的锻炼记录
  _newWorkout(e) {
    e.preventDefault();
    // 清空输入框
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // console.log(mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('cooooool!')
      .openPopup();
  }
}

const app = new App();

// 数据类

class Workout {
  date = new Date();
  // 如果有很多用户，有人在同时创建对象，那么依赖时间的ID就会有冲突
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Runing extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.clacPace();
  }

  clacPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.clacSpeed();
  }

  clacSpeed() {
    // km/hour
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Runing([39, 112], 5, 30, 178);
// const cycling1 = new Cycling([39, 112], 27, 95, 523);
// console.log(run1, cycling1);
