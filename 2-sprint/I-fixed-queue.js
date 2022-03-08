/*
I. Ограниченная очередь
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	0.05 секунд	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
Node.js 14.15.5	0.1 секунда	64Mb
Python 3.7.3	0.08 секунд	64Mb
C# (MS .Net 5.0)+ASP	0.25 секунд	64Mb
Oracle Java 8	0.25 секунд	64Mb
OpenJDK Java 11	0.25 секунд	64Mb
Node JS 8.16	0.1 секунда	64Mb
Астрологи объявили день очередей ограниченного размера. Тимофею нужно написать класс MyQueueSized, который принимает параметр max_size, означающий максимально допустимое количество элементов в очереди.

Помогите ему —– реализуйте программу, которая будет эмулировать работу такой очереди. Функции, которые надо поддержать, описаны в формате ввода.

Формат ввода
В первой строке записано одно число — количество команд, оно не превосходит 5000.
Во второй строке задан максимально допустимый размер очереди, он не превосходит 5000.
Далее идут команды по одной на строке. Команды могут быть следующих видов:

push(x) — добавить число x в очередь;
pop() — удалить число из очереди и вывести на печать;
peek() — напечатать первое число в очереди;
size() — вернуть размер очереди;
При превышении допустимого размера очереди нужно вывести «error». При вызове операций pop() или peek() для пустой очереди нужно вывести «None».
Формат вывода
Напечатайте результаты выполнения нужных команд, по одному на строке.
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

class FixedQueue {
  constructor(maxSize) {
    this.maxSize = maxSize
    this.items = []
  }

  push(item) {
    if (this.maxSize === this.items.length) {
      return false
    }

    this.items.unshift(item)
    return true
  }

  pop() {
    return this.items.pop()
  }

  size() {
    return this.items.length
  }

  peek() {
    return this.items[this.size() - 1]
  }

}

function execute(commandLine, queue) {
  const commands = commandLine.split(" ")
  switch (commands[0]) {
    case 'push':
      const isOk = queue.push(Number(commands[1]))
      if (!isOk)
        print('error')
      //console.log('push :>> ', stack);
      break

    case 'pop':
      const item = queue.pop()
      print(item || 'None')
      return item

    case 'peek':
      const peekItem = queue.peek()
      print(peekItem || 'None')
      return peekItem

    case 'size':
      const size = queue.size()
      print(size)
      return size

    default:
      throw new Error()
  }
}

function solve() {
  const commandSize = Number(readLine())
  const queueSize = Number(readLine())
  const queue = new FixedQueue(queueSize)

  for (let index = 0; index < commandSize; index++) {
    const command = readLine()
    execute(command, queue)
  }
}
