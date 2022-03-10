/*
K. Рекурсивные числа Фибоначчи
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	1 секунда	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
Python 3.7.3	1.5 секунд	64Mb
C# (MS .Net 5.0)+ASP	1.5 секунд	64Mb
Oracle Java 8	1.5 секунд	64Mb
OpenJDK Java 11	1.5 секунд	64Mb
У Тимофея было n стажёров. Каждый стажёр хотел быть лучше своих предшественников, 
поэтому i-й стажёр делал столько коммитов, сколько делали два предыдущих стажёра в сумме. 
Два первых стажёра были менее инициативными —– они сделали по одному коммиту.

Определите, сколько кода напишет следующий стажёр.

Решение должно быть реализовано рекурсивно.
Формат ввода
На вход подаётся 
n — целое число в диапазоне от 0 до 32.
Формат вывода
Нужно вывести Fn.
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

function fibonacci(n) {
  if (n === 0 || n === 1)
    return 1
  
  return fibonacci(n-1) + fibonacci(n-2)
}

function solve() {
  const n = Number(readLine())

  const Fn = fibonacci(n)

  print(Fn)
}
