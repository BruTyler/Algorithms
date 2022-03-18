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

*/

/*
-- ПРИНЦИП РАБОТЫ --
В основе кольцевого буфера использую массив фиксированной длины для хранения значений
Дополнительно отслеживаю 2 указателя на положение головы (front) и хвоста (back)
Применяю правило, что указатель всегда смотрит на заполненную ячейку

При добавлении элемента:
1. проверяю не превышен ли макс размер буфера кольца
2. восстанавливаю последнее значение указателя:
2.1 по умолчанию указатель всегда показывает на заполненную ячейку - значит ищу следующее пустое место
2.1.1 при сдвиге указателя не забываю проверять не вывалился ли за границы массива, фиксирую при необходимости указатель
2.2 (corner case) если кольцо пустое - указатель не сдвигается
3. добавляется элемент по указателю

При удалении элемента:
1. проверяю на пустоту кольцо
2. восстанавливаю последнее значение указателя:
2.1 по умолчанию указатель всегда показывает на заполненную ячейку с элементом
3. удаляю элемент по указателю из кольца
4. установка нового значения указателю:
4.1 передвигаю на ближайшую заполненную ячейку
4.1.1 при сдвиге указателя не забываю проверять не вывалился ли за границы массива, фиксирую при необходимости указатель
4.2 (corner case) если кольцо стало пустым - указатель не сдвигается
5. возвращаю элемент вызывающему коду

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
В описании входных данных указано, что данные могут добавляться/удаляться как в хвост структуре, так и в начало структуры. = ИТОГО 4 операции
Стандартные методы работы с массивами в js позволяют выполнять все 4 операции (pop/push/shift/unshift) на стандартном типе Array, 
но проблема реаллокации не позволит получить все операции за О(1)

Использование массива фиксированного размера с его доступом О(1) к произвольным ячейкам позволит получить все операции за О(1)
с учетом дополнительного отслеживания указателей на хвост и голову.


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Создание массива фиксированной длины O(1)
Создание, инкремент и декремент указателей все по O(1)
Доступ по индексу к элементам массива O(1)
Удаление элемента из массива по индексу без изменения размера O(1)


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В самом плохом случае входные данные n могут быть больше макс.размера кольца k.
Однако, все данные n превышающие k будут отброшены.

Поэтому алгоритм будет потреблять O(k) памяти, где k - макс.размера буферного кольца
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
      if (direction === DIRECTION.front) {
        this.pointer[direction]--
      } else {
        this.pointer[direction]++
      }

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
    this.items[currentPointer] = null
    this.currentSize--

    //ищем ближайшую НЕпустую ячейку
    if (this.currentSize !== 0) {

      if (direction === DIRECTION.front) {
        this.pointer[direction]++
      } else {
        this.pointer[direction]--
      }
      this._fixPointerBorder(direction)
    }

    return item
  }

  _fixPointerBorder(direction) {
    if (this.pointer[direction] < 0) {
      this.pointer[direction] += this.maxSize
    } else if (this.pointer[direction] >= this.maxSize) {
      this.pointer[direction] -= this.maxSize
    }
  }
}

function execute(commandLine, dequeue) {
  const commands = commandLine.split(" ")
  let message = null
  switch (commands[0]) {
    case 'push_back':
      const isSucceedBack = dequeue.push(Number(commands[1]), DIRECTION.back)
      if (!isSucceedBack)
        message = ERROR_MESSAGE
      break

    case 'push_front':
      const isSucceedFront = dequeue.push(Number(commands[1]), DIRECTION.front)
      if (!isSucceedFront)
        message = ERROR_MESSAGE
      break

    case 'pop_back':
      const backItem = dequeue.pop(DIRECTION.back)
      message = backItem !== undefined ? backItem : ERROR_MESSAGE
      break

    case 'pop_front':
      const frontItem = dequeue.pop(DIRECTION.front)
      message = frontItem !== undefined ? frontItem : ERROR_MESSAGE
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
