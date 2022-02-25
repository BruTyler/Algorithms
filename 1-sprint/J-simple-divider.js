/*
J. Факторизация
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	0.052 секунды	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt

Тимофей готовит доклад ко дню открытых дверей кафедры Теории чисел. Он собирается рассказать про Основную теорему арифметики. В соответствии с этой теоремой, любое число раскладывается на произведение простых множителей единственным образом –— с точностью до их перестановки.

Например, число 8 можно представить как 2 × 2 × 2.

Число 50 –— как 2 × 5 × 5 (или 5 × 5 × 2, или 5 × 2 × 5). Три варианта отличаются лишь порядком следования множителей.

Разложение числа на простые множители называется факторизацией числа.

Факторизацию в уме делать сложно, поэтому помогите Тимофею написать для этого программу.

Формат ввода
В единственной строке дано число n (2 ≤ n ≤ 109), которое нужно факторизовать.

Формат вывода
Выведите в порядке неубывания простые множители, на которые раскладывается число n.
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
  let input = originalInput = Number(readLine())

  if (input === 0 || input === 1) {
    print(input)
  }

  const result = []

  const limit = Math.sqrt(input)
  for (let index = 2; index <= limit; index++) {

    let emptyDivider = false
    while (!emptyDivider) {
      if (input % index === 0) {
        result.push(index)
        input /= index
      } else {
        emptyDivider = true
      }
    }
  }

  if (result.length !== 0) {
    //доп проверка наличия большого множителя
    const accumulateDivider = result.reduce((accum, element) => accum *= element, 1)
    if (accumulateDivider !== originalInput && originalInput % accumulateDivider === 0)
      result.push(originalInput / accumulateDivider)
  } else {
    //иначе число делится только на себя
    result.push(originalInput)
  }

  print(result.join(" "))
}
