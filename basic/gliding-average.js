/*
Скользящее среднее

Вам дана статистика по числу запросов в секунду к вашему любимому рекомендательному сервису.

Измерения велись n секунд.

В секунду i поступает qi запросов.

Примените метод скользящего среднего с длиной окна k к этим данным и выведите результат.

Формат ввода
В первой строке передаётся натуральное число n, количество секунд, в течение которых велись измерения. 1 ≤ n ≤ 105

Во второй строке через пробел записаны n целых неотрицательных чисел qi, каждое лежит в диапазоне от 0 до 103.

В третьей строке записано натуральное число k (1 ≤ k ≤ n) —– окно сглаживания.

Формат вывода
Выведите через пробел результат применения метода скользящего среднего к серии измерений. Должно быть выведено n - k + 1 элементов, каждый элемент -— вещественное (дробное) число.
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
  return _inputLines[_curLine++];
}

function extractNumbers(inputString) {
  return inputString.split(" ").map(Number);
}

function solve() {
  const n = Number(readLine());
  const stat = extractNumbers(readLine());
  const k = Number(readLine());
  const result = []

  let currentSum = stat
    .slice(0, k)
    .reduce((a, b) => a + b, 0)
  
  result.push(currentSum / k)

  for (let i = 0; i < n - k; i++) {
    currentSum -= stat[i]
    currentSum += stat[i+k]
    const currentAvg = currentSum / k
    result.push(currentAvg)
  }

  console.log(result.join(" "));
}
