/*
F. Стек - Max
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Нужно реализовать класс StackMax, который поддерживает операцию определения максимума среди всех элементов в стеке. Класс должен поддерживать операции push(x), где x – целое число, pop() и get_max().

Формат ввода
В первой строке записано одно число n — количество команд, которое не превосходит 10000. В следующих n строках идут команды. Команды могут быть следующих видов:

push(x) — добавить число x в стек;
pop() — удалить число с вершины стека;
get_max() — напечатать максимальное число в стеке;
Если стек пуст, при вызове команды get_max() нужно напечатать «None», для команды pop() — «error».

Формат вывода
Для каждой команды get_max() напечатайте результат её выполнения. Если стек пустой, для команды get_max() напечатайте «None». Если происходит удаление из пустого стека — напечатайте «error».
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

class StackMax {
  constructor() {
    this.items = []
    this.maxValue = null
    this.meta = {}
  }

  push(item) {
    if (this.maxValue === null || item > this.maxValue) {
      this.maxValue = item
    }

    this.meta[item]
      ? this.meta[item]++
      : this.meta[item] = 1

    this.items.push(item)
  }

  pop() {
    const item = this.items.pop()
    if (item === undefined) {
      print('error')
      return
    }

    this.meta[item] === 1
      ? delete this.meta[item]
      : this.meta[item]--

    if (item === this.maxValue) {
      if (this.items.length === 0) {
        this.maxValue = null
      }

      else if (this.meta[item] === undefined) {
        this.maxValue = Math.max.apply(Math, this.items);
      }

      //else maxValue same

    }

    return item
  }

  getMax() {
    const maxMessage = this.maxValue === null
      ? "None"
      : this.maxValue
    
    print(maxMessage)
    return maxMessage
  }
}

function execute(commandLine, stack) {
  const commands = commandLine.split(" ")
  switch (commands[0]) {
    case 'push':
      stack.push(Number(commands[1]))
      break
    case 'pop':
      const item = stack.pop()
      break
    case 'get_max':
      stack.getMax()
      break
    default:
      throw new Error()
  }
}

function solve() {
  const n = Number(readLine())
  const stack = new StackMax()

  for (let index = 0; index < n; index++) {
    const command = readLine()
    execute(command, stack)
  }
}
