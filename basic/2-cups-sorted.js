/*
Две фишки

Отсортированное решение
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

  cups.sort((a, b) => a - b);
  let l = 0,
    r = n - 1;

  while (result.length === 0) {
    if (l === r)
      break;

    const smallValue = cups[l]
    const bigValue = cups[r]
    if (smallValue + bigValue > k) {
      r--
    } else if (smallValue + bigValue < k) {
      l++
    } else {
      result.push(smallValue)
      result.push(bigValue)
    }
  }

  const answer = result.length > 0
    ? result.join(" ")
    : "None";

  console.log(answer);
}
