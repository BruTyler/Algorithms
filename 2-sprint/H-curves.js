/*
H. Скобочная последовательность
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	0.1 секунда	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
C# (MS .Net 5.0)+ASP	1 секунда	64Mb
Oracle Java 8	1 секунда	64Mb
OpenJDK Java 11	1 секунда	64Mb
Вот какую задачу Тимофей предложил на собеседовании одному из кандидатов. Если вы с ней ещё не сталкивались, то наверняка столкнётесь –— она довольно популярная.

Дана скобочная последовательность. Нужно определить, правильная ли она.

Будем придерживаться такого определения:

пустая строка —– правильная скобочная последовательность;
правильная скобочная последовательность, взятая в скобки одного типа, –— правильная скобочная последовательность;
правильная скобочная последовательность с приписанной слева или справа правильной скобочной последовательностью —– тоже правильная.
На вход подаётся последовательность из скобок трёх видов: [], (), {}.
Напишите функцию is_correct_bracket_seq, которая принимает на вход скобочную последовательность и возвращает True, если последовательность правильная, а иначе False.

Формат ввода
На вход подаётся одна строка, содержащая скобочную последовательность. Скобки записаны подряд, без пробелов.

Формат вывода
Выведите «True» или «False».
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

const curvesDictionary = {
  "]": "[",
  "}": "{",
  ")": "(",
}

function executeCurve(currentCurve, stack) {
  const reverseCurve = curvesDictionary[currentCurve]

  if (reverseCurve === undefined) {
    stack.push(currentCurve)
    return true
  }

  const removedItem = stack.pop()
  if (removedItem === undefined || removedItem !== reverseCurve)
    return false

  return true
}

function solve() {
  const input = readLine().split("")

  const stack = []

  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    const isOk = executeCurve(element, stack)
    if (!isOk) {
      print("False")
      return
    }
  }

  if (stack.length === 0)
    print("True")
  else
    print("False")
}
