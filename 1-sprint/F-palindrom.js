/*
F. Палиндром
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Помогите Васе понять, будет ли фраза палиндромом. Учитываются только буквы и цифры, заглавные и строчные буквы считаются одинаковыми.

Решение должно работать за O(N), где N — длина строки на входе.

Формат ввода
В единственной строке записана фраза или слово. Буквы могут быть только латинские. Длина текста не превосходит 20000 символов.

Фраза может состоять из строчных и прописных латинских букв, цифр, знаков препинания.

Формат вывода
Выведите «True», если фраза является палиндромом, и «False», если не является.
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
  return String(_inputLines[_curLine++]);
}

function print(result) {
  process.stdout.write(String(result))
}

function solve() {
  const input = readLine()
  const words = input.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  let leftIndex = 0;
  let rigthIndex = words.length - 1;
  let isPalindrom = true;

  while(leftIndex < rigthIndex) {
    if(words.charAt(leftIndex) !== words.charAt(rigthIndex)) {
      isPalindrom = false
      break;
    }

    leftIndex++
    rigthIndex--
  }

  const result = isPalindrom
    ? "True"
    : "False"

  print(result)
}
