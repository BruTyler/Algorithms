/*
J. Списочная очередь
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	0.095 секунд	38Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
Node.js 14.15.5	0.12 секунд	64Mb
C# (MS .Net 5.0)+ASP	0.25 секунд	64Mb
Oracle Java 8	0.25 секунд	64Mb
OpenJDK Java 11	0.25 секунд	64Mb
Node JS 8.16	0.12 секунд	64Mb
Любимый вариант очереди Тимофея — очередь, написанная с использованием связного списка. Помогите ему с реализацией. Очередь должна поддерживать выполнение трёх команд:

get() — вывести элемент, находящийся в голове очереди, и удалить его. Если очередь пуста, то вывести «error».
put(x) — добавить число x в очередь
size() — вывести текущий размер очереди
Формат ввода
В первой строке записано количество команд n — целое число, не превосходящее 1000. В каждой из следующих n строк записаны команды по одной строке.

Формат вывода
Выведите ответ на каждый запрос по одному в строке.
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

class Node {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }

  setNext(next) {
    this.next = next
  }

  setPrev(prev) {
    this.prev = prev
  }
}

class LinkedQueue {
  constructor() {
    this.currentSize = 0
    this.head = null
    this.tail = null
  }

  put(item) {
    const newNode = new Node(item)
    newNode.setNext(this.tail)
    //console.log('newNode :>> ', newNode);
    if(this.tail !== null)
      this.tail.setPrev(newNode)

    this.tail = newNode

    if (this.currentSize === 0) {
      this.head = newNode
    } else if (this.currentSize === 1) {
      this.head.setPrev(newNode)
    }

    this.currentSize++

    //console.log('newNode :>> ', newNode);
    //console.log('this.head :>> ', this.head);
    //console.log('this.tail :>> ', this.tail);

    return newNode
  }

  get() {
    if (this.currentSize === 0)
      return null

    const node = this.head
    //console.log('node :>> ', node);
    if (this.currentSize === 1) {
      //console.log('this.currentSize === 1!!!! :>> ');
      this.currentSize = 0
      this.head = null
      this.tail = null
      return node.value
    }

    //console.log('get  this.head:>> ', this.head);
    this.currentSize--

    //head сдвинуть
    this.head = node.prev

    //console.log('extract node :>> ', node);
    //console.log('new head  :>> ', this.head);

    return node.value
  }

  size() {
    return this.currentSize
  }
}

function execute(commandLine, queue) {
  const commands = commandLine.split(" ")
  switch (commands[0]) {
    case 'put':
      queue.put(Number(commands[1]))
      break

    case 'get':
      const item = queue.get()

      item === null
        ? print('error')
        : print(item)

      break

    case 'size':
      const size = queue.size()
      print(size)
      break

    default:
      throw new Error()
  }
}

function solve() {
  const commandSize = Number(readLine())
  const queue = new LinkedQueue()

  for (let index = 0; index < commandSize; index++) {
    
    const command = readLine()
    //print('--> ' + command)
    execute(command, queue)
  }
}
