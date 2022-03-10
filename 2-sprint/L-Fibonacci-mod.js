/*
K. Рекурсивные числа Фибоначчи
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	1 секунда	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
У Тимофея было n стажёров. Каждый стажёр хотел быть лучше своих предшественников, 
поэтому i-й стажёр делал столько коммитов, сколько делали два предыдущих стажёра в сумме. 
Два первых стажёра были менее инициативными —– они сделали по одному коммиту.

Определите, сколько кода напишет следующий стажёр –— найдите последние k цифр числа Fn.

Решение должно быть реализовано рекурсивно.
Формат ввода
В первой строке записаны через пробел два целых числа n и k
Формат вывода
Выведите единственное число – последние k цифр числа Fn.
Если в искомом числе меньше k цифр, то выведите само число без ведущих нулей.
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
  const message = String(result) + '\n'
  process.stdout.write(message)
}

function solve() {
  const input = readLine().split(" ")
  const n = Number(input[0])
  const k = Number(input[1])

  if (n === 0 || n === 1)
    return print(1)

  let accumulator1 = 1
  let accumulator2 = 1
  const limit = Math.pow(10, k)
  for (let index = 2; index <= n; index++) {
    const sum = accumulator2 + accumulator1
    accumulator1 = accumulator2
    accumulator2 = sum % limit
  }

  print(accumulator2)
}
