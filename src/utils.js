export const parseAddition = (question) => {
  const numbers = question.match(/\d+/gimu);
  return numbers.reduce((sum, number) => sum + Number.parseInt(number, 10), 0);
};

export const parseWords = (question) => {
  if (!question) return `0-0-0`;

  let words = 1;
  let consonants = 0;
  let vowels = 0;

  for (const character of question) {
    if (character === ' ') {
      words++;
    } else if (/[aeiou]/gimu.test(character)) {
      vowels++;
    } else {
      consonants++;
    }
  }

  return `${words}-${consonants}-${vowels}`;
};

export const parseCombination = (question) => {
  const numbers = question
    .slice(2, -2)
    .split(' ')
    .map((number) => Number.parseInt(number, 10))
    // eslint-disable-next-line id-length
    .sort((a, b) => a - b);

  const even = [];
  const odd = [];

  const arraySize = numbers.length / 2;
  const numbersX = numbers.slice(arraySize).reverse();
  const numbersY = numbers.slice(0, arraySize);

  for (const numberY of numbersY) {
    for (const numberX of numbersX) {
      const sum = numberX + numberY;

      if (sum % 2 === 0) {
        continue;
      }

      numbersX.splice(numbersX.indexOf(numberX), 1);

      if (numberX % 2 === 0) {
        even.push(sum);
      } else {
        odd.unshift(sum);
      }

      break;
    }
  }

  return [...even, ...odd].join(' ');
};

export const parseOrder = (question) => {
  const letters = new Map();
  const result = [];

  let normalMode = true;
  let currentIndex = 0;
  let lastOperationChar;

  // actual parsing process
  for (const index in question) {
    const character = question[index];
    if (/\w/gimu.test(character)) {
      if (letters.has(character)) {
        if (result.length === 0) {
          result.push(...letters.keys());
        }
        currentIndex = letters.get(character);
      } else {
        letters.set(character, letters.size);
      }
    } else {
      const realIndex =
        Number.parseInt(index, 10) - letters.size - currentIndex - 1;

      const referenceCharIndex = realIndex % letters.size;
      const referenceChar = [...letters.keys()].at(referenceCharIndex);
      const currentChar = [...letters.keys()].at(currentIndex);

      if (character === '>' || character === '<') {
        if (lastOperationChar === currentChar) {
          normalMode = !normalMode;
        }

        if (normalMode) {
          const charMovingFrom = result.indexOf(currentChar);
          const movingChar = result.splice(charMovingFrom, 1);
          const charMovingTo = result.indexOf(referenceChar);

          if (character === '>') {
            result.splice(charMovingTo + 1, 0, ...movingChar);
          } else if (character === '<') {
            result.splice(charMovingTo, 0, ...movingChar);
          }
        } else {
          const charMovingFrom = result.indexOf(referenceChar);
          const movingChar = result.splice(charMovingFrom, 1);
          const charMovingTo = result.indexOf(currentChar);

          if (character === '>') {
            result.splice(charMovingTo, 0, ...movingChar);
          } else if (character === '<') {
            result.splice(charMovingTo + 1, 0, ...movingChar);
          }
        }

        lastOperationChar = currentChar;
      }
    }
  }

  // only formats the output into a 2D-Matrix
  let result2d = '';
  for (const [index, letter] of result.entries()) {
    if (index === 0) {
      result2d = [...result.values()].join('');
      continue;
    }
    result2d += `\n${letter}`;
  }

  return result2d;
};
