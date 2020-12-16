var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Node{
  constructor(value,next){
    this.value = value;
    this.next = next;
  }
}

class StackLinkedList{

  constructor(){

    this.pushField = addcontrolEntity("Text","");
    this.pushField.size = 3;
    this.pushField.oninput = this.pushFieldLimit.bind(this);
    this.pushButton = addcontrolEntity("Button","push");
    this.pushButton.onclick = this.push.bind(this);
    this.popButton = addcontrolEntity("Button","pop");
    this.popButton.onclick = this.pop.bind(this);
    this.resetButton = addcontrolEntity("Button","reset");
    this.resetButton.onclick = this.reset.bind(this);
    this.navigator = [
      this.pushField,
      this.pushButton,
      this.popButton,
      this.resetButton
  ];
    this.top = null;
    this.stack = []; //
    this.initBoard();
  }
  pushFieldLimit(){ //입력갯수 제한
    if(this.pushField.value.length > 3){
      this.pushField.value = this.pushField.value.slice(0,3);
    }
  }

  push(){ //푸쉬 버튼을 눌렀을떄 할일

    if(this.stack.length == 7){//메모리가 가득 차거나 입력이 없는 경우
      // TODO: 메모리가 가득차서 추가불가능
      return;
    }
    var value = this.pushField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }
    console.log(value);
    var newNode = new Node(value,this.top); //새로운 노드 생성
    this.top = newNode; //top 변환, push 끝
    this.stack.push(newNode); //현재 까지 생성된 정보 스택에 넣기

    // TODO: 변화하는 과정 그리기 그리는동안 푸쉬 팝 불가
    this.disableUI();
    // TODO:  그리기 시작
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawTop();

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
  reset(){//리셋 버튼을 눌렀을때 할 일

    this.top = null;
    this.stack = [];
    this.initBoard();
    // TODO: 보드 초기화

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


  initBoard(){
    // TODO: 보드 초기화 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawTop();
  }
  drawTop(){
    ctx.beginPath();
    ctx.rect(50,50,50,50)
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.font = '10px Arial';
    ctx.fillText("TOP",60,120);

    if(!this.top){
      ctx.moveTo(50,50);
      ctx.lineTo(100,100);
    }
    ctx.stroke();

    ctx.closePath();
  }

  drawNode(x,y){ //노드 그리기
    ctx.beginPath();
    ctx.rect(x,y,100,50)

    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x+70,y)
    ctx.lineTo(x+70,y+50)
    ctx.stroke();
    ctx.closePath();
  }
  drawPush(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }



}

var k = new StackLinkedList();
