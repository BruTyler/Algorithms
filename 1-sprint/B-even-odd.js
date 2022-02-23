/*
B. Чётные и нечётные числа
Ограничение времени	0.15 секунд
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Алла придумала такую онлайн-игру: игрок нажимает на кнопку, и на экране появляются три случайных числа. Если все три числа оказываются одной чётности, игрок выигрывает.

Напишите программу, которая по трём числам определяет, выиграл игрок или нет.

Формат ввода
В первой строке записаны три случайных целых числа a, b и c. Числа не превосходят 109 по модулю.

Формат вывода
Выведите «WIN», если игрок выиграл, и «FAIL» в противном случае.
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

function print(result) {
  process.stdout.write(String(result))
}

function solve() {
  const inputCollection = extractNumbers(readLine());

  const isEven = inputCollection.every(x => Math.abs(x % 2) === 0)
  const isOdd = inputCollection.every(x => Math.abs(x % 2) === 1)
  const result = isEven || isOdd
    ? "WIN"
    : "FAIL"

  print(result)
}
