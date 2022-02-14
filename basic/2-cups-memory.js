/*
Две фишки

Ускорение с дополнительной поисковой структурой
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

  const helper = {}

  for (let index = 0; index < n; index++) {
    const value = cups[index]
    const searchValue = k - value

    if (helper[searchValue] !== undefined) {
      result.push(helper[searchValue])
      result.push(value)
      break
    }

    helper[value] = value
  }

  const answer = result.length > 0
    ? result.join(" ")
    : "None";

  console.log(answer);
}
