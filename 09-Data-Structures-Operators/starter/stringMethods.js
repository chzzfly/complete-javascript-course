'use strict';
console.log('hello!');

const str = String("Yes, I'm constructor build.");
const str1 = "Yes, I'm a directly string.";

console.log(str, str1);

console.log(str[0], str[4]);
console.log(str.indexOf('build'));

console.log(str.slice(0, -1));
// console.log(str.replace('Y', 'y'));
console.log(str.replace('Y', 'y').replace('I', 'i').replace('build', 'String'));

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are Not allowed on board.');
  } else {
    console.log('Welcome aboard.');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife.');
checkBaggage('Socks and camera');
checkBaggage('Got some snake and a gun for protection.');

console.log(str.split(' '));

// 将每个单词的首字母都大写
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // const firstL = n[0];
    const nUpper = n.replace(n[0], n[0].toUpperCase());
    namesUpper.push(nUpper);
  }

  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');
