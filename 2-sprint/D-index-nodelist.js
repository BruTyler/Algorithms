//найти индекс элемента в односвязном списке

class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}

function solution(node, elem) {

  let currentNode = node
  let index = 0

  while (currentNode !== null) {
    if(currentNode.value === elem) {
      return index
    }
    
    currentNode = currentNode.next
    index++
  }

  return -1
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var idx = solution(node0, "node2");
  //return idx
  // result is idx === 2
}

//console.log(test());
