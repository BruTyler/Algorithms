/*
D. Хаотичность погоды
Язык	Ограничение времени	Ограничение памяти	Ввод	Вывод
Все языки	0.2 секунды	64Mb	стандартный ввод или input.txt	стандартный вывод или output.txt
C# (MS .Net 5.0)+ASP	0.5 секунд	64Mb
Oracle Java 8	0.5 секунд	64Mb
OpenJDK Java 11	0.5 секунд	64Mb
Метеорологическая служба вашего города решила исследовать погоду новым способом. Под температурой воздуха в конкретный день будем понимать максимальную температуру в этот день. Назовём хаотичностью погоды за n дней количество дней, в которые температура строго больше, чем в день до (если такой существует) и в день после текущего (если такой существует). Например, если за 5 дней максимальная температура воздуха составляла [1, 2, 5, 4, 8] градусов, то хаотичность за этот период равна 2: в 3-й и 5-й дни выполнялись описанные условия. Определите по ежедневным показаниям температуры хаотичность погоды за этот период.

Заметим, что если число показаний n=1, то единственный день будет хаотичным.

Формат ввода
В первой строке дано число n –— длина периода измерений в днях, 1 ≤ n≤ 105. Во второй строке даны n целых чисел –— значения температуры в каждый из n дней. Значения температуры не превосходят 273 по модулю.

Формат вывода
Выведите единственное число — хаотичность за данный период.
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

function print(result) {
  process.stdout.write(String(result))
}

function checkRightWeather(tempCollection, currentIndex) {
  const nextIndex = currentIndex + 1
  if(tempCollection[nextIndex] === undefined)
    return true

  return tempCollection[nextIndex] < tempCollection[currentIndex]
}

function checkLefttWeather(tempCollection, currentIndex) {
  const nextIndex = currentIndex - 1
  if(tempCollection[nextIndex] === undefined)
    return true

  return tempCollection[nextIndex] < tempCollection[currentIndex]
}

function solve() {
  const days = Number(readLine());
  const temp = extractNumbers(readLine());

  if (days === 1) {
    print(days)
    return
  }
  
  let chaosCounter = 0

  temp.forEach((element, index, arr) => {
    if(checkRightWeather(arr, index) && checkLefttWeather(arr, index)) {
      chaosCounter++
    }
      
  });

  print(chaosCounter)
}
