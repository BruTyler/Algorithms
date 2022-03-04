/*
A. Мониторинг
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	1 секунда	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
Node.js 14.15.5	1 секунда	128Mb
C# (MS .Net 5.0)+ASP	4 секунды	150Mb
Oracle Java 8	4 секунды	150Mb
OpenJDK Java 11	4 секунды	150Mb
Node JS 8.16	1 секунда	128Mb
Алла получила задание, связанное с мониторингом работы различных серверов. Требуется понять, сколько времени обрабатываются определённые запросы на конкретных серверах. Эту информацию нужно хранить в матрице, где номер столбца соответствуют идентификатору запроса, а номер строки — идентификатору сервера. Алла перепутала строки и столбцы местами. С каждым бывает. Помогите ей исправить баг.

Есть матрица размера m × n. Нужно написать функцию, которая её транспонирует.

Транспонированная матрица получается из исходной заменой строк на столбцы.

Формат ввода
В первой строке задано число n — количество строк матрицы.
Во второй строке задано m — число столбцов, m и n не превосходят 1000. В следующих n строках задана матрица. Числа в ней не превосходят по модулю 1000.

Формат вывода
Напечатайте транспонированную матрицу в том же формате, который задан во входных данных. Каждая строка матрицы выводится на отдельной строке, элементы разделяются пробелами.
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
  const rows = Number(readLine())
  const columns = Number(readLine())
  const Amaxi = new Array(columns * rows)

  for (let row = 0; row < rows; row++) {
    const rowArray = readLine().split(" ");
    
    for (let col = 0; col < columns; col++) {
      const element = rowArray[col];
      const index = row  + col * rows
      Amaxi[index] = element
    }
  }

  let tempArray = []
  for (let index = 0; index < Amaxi.length; index++) {
    const rowIndex= index % rows
    const element = Amaxi[index]
    tempArray[rowIndex] = element
    if(rowIndex === rows - 1) {
      print(tempArray.join(" ")+'\n')
    }
  }
}
