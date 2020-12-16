class Node{
  constructor(value,next){
    this.value = value;
    this.next = next;
  }
}

class StackLinkedList{

  constructor(){



    this.navigator = [addcontrolEntity("Button","push"),
    addcontrolEntity("Button","pop"),
    addcontrolEntity("Button","clear")
  ];
    this.top = null;
    this.stack = []; //
  }
  push(value){ //푸쉬 버튼을 눌렀을떄 할일
    if(this.stack.length == 7){//메모리가 가득 찼다고 가정
      // TODO: 메모리가 가득차서 추가불가능
      return;
    }

    var newNode = new Node(value,this.top); //새로운 노드 생성
    this.top = newNode; //top 변환, push 끝
    this.stack.push(newNode); //현재 까지 생성된 정보 스택에 넣기

    // TODO: 변화하는 과정 그리기 그리는동안 푸쉬 팝 불가
    this.disableUI();
    // TODO:  그리기 시작

    this.enableUI();

  }
  pop(){//pop 버튼을 눌렀을때 할일
    if(!this.top){//스택이 비었으면
      // TODO: 스택이 비어서 삭제 불가
      return;
    }
    this.top = this.top.next;
    this.stack.splice(0,1);
    // TODO: 변화하는 과정 그리기, 그리는동안 푸쉬 팝 불가
    this.disableUI();
    // TODO:  그리기 시작

    this.enableUI();

  }

  disableUI(){
    for(var i = 0; i < this.navigator.length;i++){
      this.navigator[i].disabled = true;
    }

  }
  enableUI(){
    for(var i = 0; i < this.navigator.length;i++){
      this.navigator[i].disabled = false;
    }
  }




}
