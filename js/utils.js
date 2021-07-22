
const getRandomPositiveInteger = (int1, int2) => {
  const lower = Math.ceil(Math.min(Math.abs(int1), Math.abs(int2)));
  const upper = Math.floor(Math.max(Math.abs(int1), Math.abs(int2)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (int1, int2, digits = 1) => {
  const lower = Math.min(Math.abs(int1), Math.abs(int2));
  const upper = Math.max(Math.abs(int1), Math.abs(int2));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const randomArray = (array) => {
  const maxLength = array.length;
  const lengthOfArray = getRandomPositiveInteger(0, maxLength - 1);
  const anyArray = [];

  while (anyArray.length < lengthOfArray) {
    const indexElement = getRandomPositiveInteger(0, maxLength - 1);
    const element = array[indexElement];

    if (!anyArray.includes(element)) {
      anyArray.push(element);
    }
  }
  return anyArray;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

export {getRandomPositiveInteger, getRandomPositiveFloat, randomArray, getRandomArrayElement};

