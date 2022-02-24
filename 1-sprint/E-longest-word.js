/*
E. Самое длинное слово
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Чтобы подготовиться к семинару, Гоше надо прочитать статью по эффективному менеджменту. Так как Гоша хочет спланировать день заранее, ему необходимо оценить сложность статьи.

Он придумал такой метод оценки: берётся случайное предложение из текста и в нём ищется самое длинное слово. Его длина и будет условной сложностью статьи.

Помогите Гоше справиться с этой задачей.

Формат ввода
В первой строке дана длина текста L (1 ≤ L ≤ 105).

В следующей строке записан текст, состоящий из строчных латинских букв и пробелов. Слово —– последовательность букв, не разделённых пробелами. Пробелы могут стоять в самом начале строки и в самом её конце. Текст заканчивается переносом строки, этот символ не включается в число остальных L символов.

Формат вывода
В первой строке выведите самое длинное слово. Во второй строке выведите его длину. Если подходящих слов несколько, выведите то, которое встречается раньше.
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

function solve() {
  readLine();
  const words = readLine().trim().split(" ");
  let longestWord = words[0];

  for (let index = 1; index < words.length; index++) {
    const word = words[index];
    if(word.length > longestWord.length)
      longestWord = word;
  }

  print(longestWord)
  print('\n')
  print(longestWord.length)
}
