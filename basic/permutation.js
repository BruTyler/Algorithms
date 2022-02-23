/*
Перестановки
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
  //const stat = extractNumbers(readLine());
  //const k = Number(readLine());
  const result = []

  

  console.log(result.join(" "));
}
