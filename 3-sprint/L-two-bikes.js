/*
L. Два велосипеда
Все языки	C# (MS .Net 5.0)+ASP	OpenJDK Java 11
Ограничение времени	0.5 секунд	0.7 секунд	0.7 секунд
Ограничение памяти	121Mb	128Mb	128Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Вася решил накопить денег на два одинаковых велосипеда — себе и сестре. У Васи есть копилка, в которую каждый день он может добавлять деньги (если, конечно, у него есть такая финансовая возможность). В процессе накопления Вася не вынимает деньги из копилки.

У вас есть информация о росте Васиных накоплений — сколько у Васи в копилке было денег в каждый из дней.

Ваша задача — по заданной стоимости велосипеда определить

первый день, в которой Вася смог бы купить один велосипед,
и первый день, в который Вася смог бы купить два велосипеда.
Подсказка: решение должно работать за O(log n).

Формат ввода
В первой строке дано число дней n, по которым велись наблюдения за Васиными накоплениями. 1 ≤ n ≤ 106.

В следующей строке записаны n целых неотрицательных чисел. Числа идут в порядке неубывания. Каждое из чисел не превосходит 106.

В третьей строке записано целое положительное число s — стоимость велосипеда. Это число не превосходит 106.

Формат вывода
Нужно вывести два числа — номера дней по условию задачи.

Если необходимой суммы в копилке не нашлось, нужно вернуть -1 вместо номера дня.
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

function solve() {
  readLine()
  const A = readLine().split(" ").map(Number)
  const cost = Number(readLine())

  const binarySearch = (arr, cost, left, right, lastSuccessMid = -2) => {
    //console.log('inside :>> ', left, right, lastSuccessMid);
    if(right < left) {
      return lastSuccessMid+1
    }

    const mid = Number.parseInt((right-left) / 2) + left
    //console.log(`took mid[${mid}] = ${arr[mid]}`);
    if(arr[mid] >= cost) {
      //console.log('before call1 :>> ', left, mid-1, mid);
      return binarySearch(arr, cost, left, mid-1, mid)
    } else {
      //console.log('before call2 :>> ', mid+1, right, lastSuccessMid);
      return binarySearch(arr, cost, mid+1, right, lastSuccessMid)
    }
  }

  const singleBike = binarySearch(A, cost, 0, A.length)
  const twoBike = binarySearch(A, cost*2, 0, A.length)

  print(singleBike + " " + twoBike);
}
