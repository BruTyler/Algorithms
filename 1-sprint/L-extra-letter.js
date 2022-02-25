/*
L. Лишняя буква
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Васе очень нравятся задачи про строки, поэтому он придумал свою. Есть 2 строки s и t, состоящие только из строчных букв. Строка t получена перемешиванием букв строки s и добавлением 1 буквы в случайную позицию. Нужно найти добавленную букву.

Формат ввода
На вход подаются строки s и t, разделённые переносом строки. Длины строк не превосходят 1000 символов. Строки не бывают пустыми.

Формат вывода
Выведите лишнюю букву.
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
  const s = readLine().split("")
  const t = readLine().split("")
  
  const buildDictionary = (dictionary, letter) => {
    if(dictionary[letter])
      dictionary[letter]++
    else
      dictionary[letter] = 1
    
    return dictionary
  }

  sDic = s.reduce(buildDictionary, {})
  tDic = t.reduce(buildDictionary, {})

  Object.keys(tDic).forEach(key => {
    if(sDic[key] !== tDic[key])
      print(key)
  })
}
