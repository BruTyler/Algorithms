/*
G. Стек - MaxEffective
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	0.2 секунды	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
Golang 1.14.4 + network	0.5 секунд	64Mb
Node.js 14.15.5	1.5 секунд	64Mb
Python 3.7.3	1.5 секунд	64Mb
C# (MS .Net 5.0)+ASP	1.5 секунд	64Mb
gc go	0.5 секунд	64Mb
Oracle Java 8	1.5 секунд	64Mb
OpenJDK Java 11	1.5 секунд	64Mb
Golang 1.16	0.5 секунд	64Mb
Node JS 8.16	1.5 секунд	64Mb
Реализуйте класс StackMaxEffective, поддерживающий операцию определения максимума среди элементов в стеке. Сложность операции должна быть O(1). Для пустого стека операция должна возвращать None. При этом push(x) и pop() также должны выполняться за константное время.

Формат ввода
В первой строке записано одно число — количество команд, оно не превосходит 100000. Далее идут команды по одной в строке. Команды могут быть следующих видов:

push(x) — добавить число x в стек;
pop() — удалить число с вершины стека;
get_max() — напечатать максимальное число в стеке;
Если стек пуст, при вызове команды get_max нужно напечатать «None», для команды pop — «error».
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
    this.maxCollection = []
    this.meta = {}
  }

  push(item) {
    if (this.maxValue === null || item > this.maxValue) {
      this.maxValue = item
      this.maxCollection.push(this.maxValue)
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

    if (item === this.maxValue && this.meta[item] === undefined) {
      this.maxCollection.pop()
      const maxCollecionSize = this.maxCollection.length
      this.maxValue = maxCollecionSize === 0
        ? null
        : this.maxCollection[maxCollecionSize - 1]
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
      console.log('push :>> ', stack);
      break
    case 'pop':
      const item = stack.pop()
      console.log('pop :>> ', stack);
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
