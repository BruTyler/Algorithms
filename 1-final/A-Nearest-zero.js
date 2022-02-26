/*
A. Ближайший ноль
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	3 секунды	256Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
Улица, на которой хочет жить Тимофей, имеет длину n, то есть состоит из n одинаковых идущих подряд участков. На каждом участке либо уже построен дом, либо участок пустой. Тимофей ищет место для строительства своего дома. Он очень общителен и не хочет жить далеко от других людей, живущих на этой улице.

Чтобы оптимально выбрать место для строительства, Тимофей хочет для каждого участка знать расстояние до ближайшего пустого участка. (Для пустого участка эта величина будет равна нулю –— расстояние до самого себя).

Ваша задача –— помочь Тимофею посчитать искомые расстояния. Для этого у вас есть карта улицы. Дома в городе Тимофея нумеровались в том порядке, в котором строились, поэтому их номера на карте никак не упорядочены. Пустые участки обозначены нулями.

Формат ввода
В первой строке дана длина улицы —– n (1 ≤ n ≤ 106). В следующей строке записаны n целых неотрицательных чисел — номера домов и обозначения пустых участков на карте (нули). Гарантируется, что в последовательности есть хотя бы один ноль. Номера домов (положительные числа) уникальны и не превосходят 109.

Формат вывода
Для каждого из участков выведите расстояние до ближайшего нуля. Числа выводите в одну строку, разделяя их пробелами.
*/

const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin
})

const _inputLines = []
let _curLine = 0

_reader.on('line', line => {
  _inputLines.push(line);
})

process.stdin.on('end', solve)
process.on('SIGINT', function () {
  solve();
  process.exit();
})

function readLine() {
  return String(_inputLines[_curLine++])
}

function print(result) {
  process.stdout.write(String(result))
}

//фикс при обнаружении нуля [0 1 2 3 ?] -> [0 1 2 1 0]
function fixPreviousDistances(currentZeroIndex, lastZeroIndex, distanceCollection) {
  
  const brokenDistance = lastZeroIndex === -1
    ? Math.abs(lastZeroIndex - currentZeroIndex) 
    : Math.abs(lastZeroIndex - currentZeroIndex) / 2

  if (brokenDistance <= 1)
    return

  for (let zeroDistance = 1; zeroDistance < brokenDistance; zeroDistance++) {
    const fixedIndex = currentZeroIndex - zeroDistance
    distanceCollection[fixedIndex] = zeroDistance
  }
}

function solve() {
  const n = Number(readLine())
  const houses = readLine().split(" ")
  let lastZeroIndex = -1
  const distances = []

  for (let i = 0; i < n; i++) {
    const houseNumber = houses[i]

    if (houseNumber === '0') {
      fixPreviousDistances(i, lastZeroIndex, distances)
      lastZeroIndex = i
      distances.push(0)
    } else {
      const distance = lastZeroIndex === -1 
        ? null 
        : Math.abs(lastZeroIndex - i)

      distances.push(distance)
    }
  }

  print(distances.join(" "))
}
