/*
B. Калькулятор
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Задание связано с обратной польской нотацией. Она используется для парсинга арифметических выражений. Еще её иногда называют постфиксной нотацией.

В постфиксной нотации операнды расположены перед знаками операций.

Пример 1:
3 4 +
означает 3 + 4 и равно 7

Пример 2:
12 5 /
Так как деление целочисленное, то в результате получим 2.

Пример 3:
10 2 4 * -
означает 10 - 2 * 4 и равно 2

https://contest.yandex.ru/contest/22781/run-report/65920082/
*/

/*
-- ПРИНЦИП РАБОТЫ --
Использую стэк для сохранения значений, при появлении оператора во входных данных мутирую стэк - применяю оператор к последним 2 числам
Результат применения оператора также возвращаю в стек.
В итоговый ответ уходит последнее актуальное значение из стека

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
В описании входных данных указано, что более старые записаны слева, актуальные (на которых нужно применять операторы) - справа.
Стек -- это порядок LIFO. в котором последние актуальные операнды находятся на его вершине.
Таким образом мы читаем входные данные слева направо и складываем их в стэк снизу в верх
Применяя оператор к стэку мы работаем только с его вершиной и результат также складываем на вершину.


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Добавление числа из входных данных в стек стоит O(1)**
При появлении оператора извлечение из стека двух последних чисел 2*O(1) = O(1)**
Применение оператора к двум операндам - простая математическая операция = O(1)
Возврат результата оператора в стек = O(1)**
Извлечение вершины стека для отображения итогово результата = O(1)**

**Так как вместо стэка фиксированного размера использовался динамический массив, отдельные операции могут быть O(n) в связи с реаллокацией. 
При этом амортизированная сложность динамического массива O(n) / n ~ O(1)


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В самом плохом случае все входные данные n будут являться числами без единого оператора.
Вся последовательность n будет помещена в стек

Стек, содержащий k элементов, занимает O(k) памяти.
Поэтому алгоритм будет потреблять O(n) памяти.
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

function execute(command, stack) {
  const rightOperand = stack.pop()
  const leftOperand = stack.pop()

  let operationResult = null

  switch (command) {
    case '+':
      operationResult = leftOperand + rightOperand
      break
    case '-':
      operationResult = leftOperand - rightOperand
      break
    case '*':
      operationResult = leftOperand * rightOperand
      break
    case '/':
      operationResult = Math.floor(leftOperand / rightOperand)
      break

    default:
      throw new Error()
  }

  stack.push(operationResult)
}

function solve() {
  const input = readLine().split(" ")
  const stack = []

  for (let index = 0; index < input.length; index++) {
    const element = input[index]
    if (isNaN(element)) {
      execute(element, stack)
      continue
    }

    stack.push(Number(element))
  }

  print(stack.pop())
}
