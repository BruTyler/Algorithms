/*
K. Списочная форма
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Вася просил Аллу помочь решить задачу. На этот раз по информатике.

Для неотрицательного целого числа X списочная форма –— это массив его цифр слева направо. К примеру, для 1231 списочная форма будет [1,2,3,1]. На вход подается количество цифр числа Х, списочная форма неотрицательного числа Х и неотрицательное число K. Числа К и Х не превосходят 10000.

Нужно вернуть списочную форму числа X + K.

Формат ввода
В первой строке — длина списочной формы числа X. На следующей строке — сама списочная форма с цифрами записанными через пробел.

В последней строке записано число K, 0 ≤ K ≤ 10000.

Формат вывода
Выведите списочную форму числа X+K.
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
  return String(_inputLines[_curLine++])
}

function print(result) {
  process.stdout.write(String(result))
}

function solve() {
  readLine()
  const X = Number(readLine().replace(/[^0-9]/g, ""))
  const K = Number(readLine())
  const result = X + K;

  print(result.toString().split("").join(" "))
}
