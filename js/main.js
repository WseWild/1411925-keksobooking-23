// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE
const randomNumber = function getRandomInt(min, max) {
  Math.floor(Math.random() * (max - min + 1)) + min;
};

randomNumber(1, 10);


const randomFloatNumber = function getRandomFloatNumber(min, max, frac) {
  if (min >= 0 && max > 0 && min < max) {
    const num = Math.random() * (max - min + 1) + min;
    return num.toFixed(frac);
  }
  else {
    return Error('Введены некорректные значения диапазона географических координат');
  }
};

randomFloatNumber(-1, 0.01, 3);
