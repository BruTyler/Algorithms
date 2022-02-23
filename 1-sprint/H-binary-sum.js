/*
H. Двоичная система
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	0.1 секунда	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt

Тимофей спросил у Гоши, умеет ли тот работать с числами в двоичной системе счисления. Он ответил, что проходил это на одной из первых лекций по информатике. Тимофей предложил Гоше решить задачку. Два числа записаны в двоичной системе счисления. Нужно вывести их сумму, также в двоичной системе. Встроенную в язык программирования возможность сложения двоичных чисел применять нельзя.

Решение должно работать за O(N), где N –— количество разрядов максимального числа на входе.

Формат ввода
Два числа в двоичной системе счисления, каждое на отдельной строке. Длина каждого числа не превосходит 10 000 символов.

Формат вывода
Одно число в двоичной системе счисления.
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

function print(result) {
  process.stdout.write(String(result))
}

function solve() {
  const a = parseInt(readLine(), 2)
  const b = parseInt(readLine(), 2)
  
  const result = a + b

  print(result.toString(2))
}
