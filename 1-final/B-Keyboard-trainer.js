/*
B. Ловкость рук
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Гоша и Тимофей нашли необычный тренажёр для скоростной печати и хотят освоить его. Тренажёр представляет собой поле из клавиш 4× 4, в котором на каждом раунде появляется конфигурация цифр и точек. На клавише написана либо точка, либо цифра от 1 до 9. В момент времени t игрок должен одновременно нажать на все клавиши, на которых написана цифра t. Гоша и Тимофей могут нажать в один момент времени на k клавиш каждый. Если в момент времени t были нажаты все нужные клавиши, то игроки получают 1 балл.

Найдите число баллов, которое смогут заработать Гоша и Тимофей, если будут нажимать на клавиши вдвоём.

Формат ввода
В первой строке дано целое число k (1 ≤ k ≤ 5).

В четырёх следующих строках задан вид тренажёра –— по 4 символа в каждой строке. Каждый символ —– либо точка, либо цифра от 1 до 9. Символы одной строки идут подряд и не разделены пробелами.

Формат вывода
Выведите единственное число –— максимальное количество баллов, которое смогут набрать Гоша и Тимофей.
*/

const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin
})

const _inputLines = []
let _curLine = 0

_reader.on('line', line => {
  _inputLines.push(line);
})

process.stdin.on('end', solve)
process.on('SIGINT', function () {
  solve();
  process.exit();
})

function readLine() {
  return String(_inputLines[_curLine++])
}

function print(result) {
  process.stdout.write(String(result))
}

const reduceLine = (dictionary, element) => {
  const digit = Number(element)

  if (isNaN(digit))
    return dictionary

  if (dictionary[digit])
    dictionary[digit]++
  else
    dictionary[digit] = 1

  return dictionary
}

function solve() {
  const k = Number(readLine())

  const digitDictionary = {}

  for (let index = 0; index < 4; index++) {
    readLine()
      .split("")
      .reduce(reduceLine, digitDictionary)
  }

  const result = Object
    .values(digitDictionary)
    .filter(x => x <= 2 * k)

  print(result.length)
}
