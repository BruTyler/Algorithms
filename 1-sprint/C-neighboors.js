/*
C. Соседи
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Дана матрица. Нужно написать функцию, которая для элемента возвращает всех его соседей. Соседним считается элемент, находящийся от текущего на одну ячейку влево, вправо, вверх или вниз. Диагональные элементы соседними не считаются.

Например, в матрице A:
соседними элементами для (0, 0) будут 2 и 0. А для (2, 1) –— 1, 2, 7, 7.

Формат ввода
В первой строке задано n — количество строк матрицы. Во второй — количество столбцов m. Числа m и n не превосходят 1000. В следующих n строках задана матрица. Элементы матрицы — целые числа, по модулю не превосходящие 1000. В последних двух строках записаны координаты элемента (индексация начинается с нуля), соседей которого нужно найти.

Формат вывода
Напечатайте нужные числа в возрастающем порядке через пробел.
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

function specialPush(resultCollection, value) {
  if (value === undefined || value === null)
    return
  
  resultCollection.push(value)
}

function solve() {
  const rows = Number(readLine());
  const cols = Number(readLine());
  const matrix = [];
  const result = [];

  for (let row = 0; row < rows; row++) {
    const line = extractNumbers(readLine());
    matrix.push(line)
  }

  const findRow = Number(readLine());
  const findCol = Number(readLine());

  if(matrix[findRow-1])
    specialPush(result, matrix[findRow-1][findCol])

  if(matrix[findRow+1])
    specialPush(result, matrix[findRow+1][findCol])

  if(matrix[findRow]) {
    specialPush(result, matrix[findRow][findCol-1])
    specialPush(result, matrix[findRow][findCol+1])
  }
  
  result.sort((a, b) => a - b)
  print(result.join(" "))
}
