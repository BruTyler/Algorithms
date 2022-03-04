class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}

function solution(headNode, removeIndex) {

  if (removeIndex === 0) {
    const newHead = headNode.next
    headNode.next = null
    return newHead
  }

  let currentNode = headNode
  let prevNode = null
  let isIndexNotFound = false
  let currentNodeIndex = 0

  while (currentNodeIndex !== removeIndex) {
    currentNode = currentNode.next
    prevNode = currentNode
    currentNodeIndex++

    if(currentNode.next === null) {
      isIndexNotFound = true
      break
    }
  }

  if(!isIndexNotFound)
    prevNode.next = currentNode.next

  return headNode
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var newHead = solution(node0, 1);
  // result is node0 -> node2 -> node3
}

//test();
