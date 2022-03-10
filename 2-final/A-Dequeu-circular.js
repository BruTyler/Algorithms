/*
A. Дек
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	0.2 секунды	39Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
Гоша реализовал структуру данных Дек, максимальный размер которого определяется заданным числом. 
Методы push_back(x), push_front(x), pop_back(), pop_front() работали корректно. Но, если в деке было много элементов, программа работала очень долго. 
Дело в том, что не все операции выполнялись за O(1). Помогите Гоше! Напишите эффективную реализацию.

Внимание: при реализации используйте кольцевой буфер.

Формат ввода
В первой строке записано количество команд n — целое число, не превосходящее 100000. Во второй строке записано число m — максимальный размер дека. 
Он не превосходит 50000. В следующих n строках записана одна из команд:

push_back(value) – добавить элемент в конец дека. Если в деке уже находится максимальное число элементов, вывести «error».
push_front(value) – добавить элемент в начало дека. Если в деке уже находится максимальное число элементов, вывести «error».
pop_front() – вывести первый элемент дека и удалить его. Если дек был пуст, то вывести «error».
pop_back() – вывести последний элемент дека и удалить его. Если дек был пуст, то вывести «error».
Value — целое число, по модулю не превосходящее 1000.
Формат вывода
Выведите результат выполнения каждой команды на отдельной строке. Для успешных запросов push_back(x) и push_front(x) ничего выводить не надо.

https://contest.yandex.ru/contest/22781/run-report/65919140/
*/
const ERROR_MESSAGE = 'error'
const DIRECTION = {
  front: 'front',
  back: 'back'
}

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

class Dequeue {
  constructor(maxSize) {
    this.items = new Array(maxSize)
    this.maxSize = maxSize
    this.pointer = {
      front: 0,
      back: 0
    }
    this.currentSize = 0
  }

  push(item, direction) {
    if (this.currentSize === this.maxSize)
      return false

    let currentPointer = this.pointer[direction]
    //переходим к следующей пустой ячейке
    if (this.currentSize !== 0) {
      if (direction === DIRECTION.front)
        this.pointer[direction]--
      else
        this.pointer[direction]++

      this._fixPointerBorder(direction)
      currentPointer = this.pointer[direction]
    }

    this.items[currentPointer] = item

    this.currentSize++

    return true
  }

  pop(direction) {
    if (this.currentSize === 0)
      return undefined

    let currentPointer = this.pointer[direction]

    const item = this.items[currentPointer]
    delete this.items[currentPointer]
    this.currentSize--

    //ищем ближайшую НЕпустую ячейку
    if (this.currentSize !== 0) {
      if (direction === DIRECTION.front)
        this.pointer[direction]++
      else
        this.pointer[direction]--

      this._fixPointerBorder(direction)
    }

    return item
  }

  _fixPointerBorder(direction) {
    if (this.pointer[direction] < 0)
      this.pointer[direction] += this.maxSize
    else if (this.pointer[direction] >= this.maxSize)
      this.pointer[direction] -= this.maxSize
  }
}

function execute(commandLine, dequeue) {
  const commands = commandLine.split(" ")
  let message = null
  switch (commands[0]) {
    case 'push_back':
      const isSucceedBack = dequeue.push(Number(commands[1]), DIRECTION.back)
      if (!isSucceedBack)
        message = ERROR_MESSAGE //+ ' push_back --->' + dequeue.items + ' -=====- F:' + dequeue.pointer.front + ', B:' + dequeue.pointer.back
      break

    case 'push_front':
      const isSucceedFront = dequeue.push(Number(commands[1]), DIRECTION.front)
      if (!isSucceedFront)
        message = ERROR_MESSAGE //+ ' push_front --->' + dequeue.items + ' -=====- F:' + dequeue.pointer.front + ', B:' + dequeue.pointer.back
      break

    case 'pop_back':
      const backItem = dequeue.pop(DIRECTION.back)
      message = backItem !== undefined ? backItem : ERROR_MESSAGE
      //message += ' pop_back --->' + dequeue.items + ' -=====- F:' + dequeue.pointer.front + ', B:' + dequeue.pointer.back
      break

    case 'pop_front':
      const frontItem = dequeue.pop(DIRECTION.front)
      message = frontItem !== undefined ? frontItem : ERROR_MESSAGE
      //message += ' pop_front --->' + dequeue.items + ' -=====- F:' + dequeue.pointer.front + ', B:' + dequeue.pointer.back
      break

    default:
      throw new Error()
  }

  if (message !== null)
    print(message)
}

function solve() {
  const commandCount = Number(readLine())
  const maxSize = Number(readLine())
  const dequeue = new Dequeue(maxSize)

  for (let index = 0; index < commandCount; index++) {
    const command = readLine()
    execute(command, dequeue)
  }
}
