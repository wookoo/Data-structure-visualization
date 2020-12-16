class Node{
  constructor(value,next){
    this.value = value;
    this.next = next;
  }
}

class StackLinkedList{

  constructor(){
    addcontrolEntity("Button","push")
    addcontrolEntity("Button","pop")
    addcontrolEntity("Button","clear")

    this.top = null;
    this.stack = []; //
  }
  push(value){ //푸쉬 버튼을 눌렀을떄 할일
    if(this.stac.length == 10){
      // TODO: 메모리가 가득차서 추가불가능
      return;
    }

    var newNode = new Node(value,this.top); //새로운 노드 생성
    this.top = newNode; //top 변환
    this.stack.push(newNode); //스택에 푸쉬

    // TODO: 변화하는 과정 그리기

  }
  pop(){//pop 버튼을 눌렀을때 할일

  }


}
