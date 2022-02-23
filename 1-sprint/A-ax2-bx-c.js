/*
A. Значения функции
Ограничение времени	0.4 секунды
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Вася делает тест по математике: вычисляет значение функций в различных точках. Стоит отличная погода, и друзья зовут Васю гулять. Но мальчик решил сначала закончить тест и только после этого идти к друзьям. К сожалению, Вася пока не умеет программировать. Зато вы умеете. Помогите Васе написать код функции, вычисляющей y = ax2 + bx + c. Напишите программу, которая будет по коэффициентам a, b, c и числу x выводить значение функции в точке x.

Формат ввода
На вход через пробел подаются числа a, x, b, c. В конце ввода находится перенос строки.

Формат выводаa
Выведите одно число — значение функции в точке x.
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
  const a = inputCollection[0]
  const x = inputCollection[1]
  const b = inputCollection[2]
  const c = inputCollection[3]

  const y = a * Math.pow(x, 2) + b * x + c

  print(y)
}
