/*
Две фишки

Рита и Гоша играют в игру. У Риты есть n фишек, на каждой из которых написано количество очков. Сначала Гоша называет число k, затем Рита должна выбрать две фишки, сумма очков на которых равна заданному числу.

Рите надоело искать фишки самой, и она решила применить свои навыки программирования для решения этой задачи. Помогите ей написать программу для поиска нужных фишек.

Формат ввода
В первой строке записано количество фишек n, 2 ≤ n ≤ 104.

Во второй строке записано n целых чисел —– очки на фишках Риты в диапазоне от -105 до 105.

В третьей строке —– загаданное Гошей целое число k, -105 ≤ k ≤ 105.

Формат вывода
Нужно вывести два числа —– очки на двух фишках, в сумме дающие k.

Если таких пар несколько, то можно вывести любую из них.

Если таких пар не существует, то вывести «None».
*/

const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
  _inputLines.push(line);
});

process.stdin.on('end', solve);
process.on('SIGINT', function () {
  solve();
  process.exit();
});

function readLine() {
  return _inputLines[_curLine++];
}

function extractNumbers(inputString) {
  return inputString.split(" ").map(Number);
}

function solve() {
  const n = Number(readLine());
  const cups = extractNumbers(readLine());
  const k = Number(readLine());
  const result = []

  for (let x = 0; x < n; x++) {
    for (let y = x + 1; y < n; y++) {
      if(x === y)
        continue;

      const valueX = cups[x]
      const valueY = cups[y]
      if(valueX + valueY === k) {
        result.push(valueX)
        result.push(valueY)
      }

      if (result.length > 0)
        break;
    }

    if (result.length > 0)
      break;
  }

  const answer = result.length > 0
    ? result.join(" ")
    : "None";

  console.log(answer);
}
