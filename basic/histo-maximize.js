/*
Задача про гистограмму
Пусть у нас есть гистограмма из n столбцов, где i-ый столбец слева имеет высоту h 
​
Нужно вписать в гистограмму прямоугольник максимальной площади так, чтобы его точки не выходили за границы столбцов.


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

function convertElement(rawElement, index) {
  return {
    index,
    height: Number(rawElement)
  }
}

function solve() {
  const h = readLine().split(" ").map(convertElement)

  const stack = []
  const left = new Array(h.length)
  const right = new Array(h.length)

  for (let i = 0; i < h.length; i++) {
    const element = array[i]
    const currentHeight = element.height

    if (stack.length === 0) {
      stack.push(element)
      left[0] = -1
      continue
    }

    let lastElement = stack[stack.length - 1]
    if (lastElement.height < currentHeight) {
      stack.push(element)
      left[i] = lastElement.index
    } else {
      stack.pop()
      lastElement = stack[stack.length - 1]
      stack.push(element)
      left[i] = lastElement.index
    }
      //TODO ддоделать

  }





  print(accumulator2)
}
