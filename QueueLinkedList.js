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

    this.eunqueField = addcontrolEntity("Text","");
    this.eunqueField.size = 3;
    this.eunqueField.oninput = this.eunqueFieldLimit.bind(this);
    this.enqueButton = addcontrolEntity("Button","enque");
    this.enqueButton.onclick = this.enque.bind(this);
    this.dequeButton = addcontrolEntity("Button","deque");
    this.dequeButton.onclick = this.deque.bind(this);
    this.resetButton = addcontrolEntity("Button","reset");
    this.resetButton.onclick = this.reset.bind(this);
    this.navigator = [
      this.eunqueField,
      this.enqueButton,
      this.dequeButton,
      this.resetButton
  ];
  this.backButton = document.getElementById("back");
  this.backButton.disabled = true;
  this.nextButton = document.getElementById("next");
  this.nextButton.onclick = this.nextButtonClick.bind(this);
  //this.nextButton.disabled = true;



    this.head = null;
    this.tail = null;
    this.que = []; //

    this.drawTask=[];

    this.initBoard();
  }
  nextButtonClick(){
    if(this.drawTask.length == 0){
      return;
    }
    this.drawTask[0]();
    this.drawTask.splice(0,1);
    if(this.drawTask.length == 0){
      this.enableUI();
    }
  }

  eunqueFieldLimit(){ //입력갯수 제한
    if(this.eunqueField.value.length > 3){
      this.eunqueField.value = this.eunqueField.value.slice(0,3);
    }
  }

  enque(){ //푸쉬 버튼을 눌렀을떄 할일

    if(this.que.length == 8){//메모리가 가득 차거나 입력이 없는 경우
      // TODO: 메모리가 가득차서 추가불가능

      this.initBoard();
      this.drawQueue();
      ctx.font = '15px Arial';
      ctx.fillText("큐가 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);
      return;
    }
    var value = this.eunqueField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }
    console.log(value);

    ///this.disableUI();
    var newNode = new Node(value,null); //새로운 노드 생성
    if(this.head == null){
      this.head = newNode;
      this.tail = newNode; //top 변환, push 끝
    }
    else{
      this.tail.next = newNode;
      this.tail = newNode;
    }

    console.log(this.head);

    this.que.push(newNode); //현재 까지 생성된 정보 큐에 넣기
    //this.drawQueue();
    var x = (this.que.length-1)*100
    this.drawTask.push(()=>{
      this.drawNode(x+30,300,newNode.value);
    });
    this.drawTask.push(()=>{
      this.drawline(x+90,330,x+50,170)
    });
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.fillText("Tail",x+50,380);
      ctx.fillStyle = "#fef";
      ctx.fillRect(0,90,2000,50);
      ctx.closePath();
    });

    this.drawTask.push(()=>{
      ctx.fillStyle = "#000";
      this.drawQueue();
      ctx.fillText("삽입된 값 : " + this.tail.value ,20,30);
    });
    this.disableUI();





  }
  deque(){//pop 버튼을 눌렀을때 할일
    if(!this.head){//스택이 비었으면
      // TODO: 스택이 비어서 삭제 불가
      this.initBoard();
      ctx.font = '15px Arial';
      ctx.fillText("큐가 비어서 삭제 불가!" ,20,30);
      return;
    }
    this.returnData = this.head.value;
    console.log("데큐 콜"+this.head.value);
    this.head = this.head.next;
    if(this.head == null){
      this.tail = null;
    }
    this.que.splice(0,1);
    // TODO: 변화하는 과정 그리기, 그리는동안 푸쉬 팝 불가
    this.disableUI();

    // TODO:  그리기 시작
    console.log(this.head);
    this.drawTask.push(()=>{
      ctx.font = '15px Arial';
      ctx.fillStyle = "#fef";
      ctx.fillRect(20,5,100,30);
      ctx.fillStyle = "#000";
      ctx.fillText("반환값 : " + this.returnData,20,30);
      console.log("this.returnData"+this.returnData);
    })
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.font = '15px Arial';
      ctx.fillText("Head",150,220);
      ctx.fillStyle = "#fef"; //#fef
      ctx.fillRect(0,205,100,100);
      ctx.fill();
      ctx.closePath();
    });
    if(this.head == null){
      this.drawTask.push(()=>{
        ctx.fillStyle = "#fef";
        ctx.fillRect(0,90,2000,50);
        ctx.fillStyle = "#000";
        ctx.fillText("Tail",100+50,140);

      })
    }


    this.drawTask.push(()=>{
      ctx.fillStyle = "#000";
      if(this.head == null){
        this.initBoard();
      }else{
        this.drawQueue();
      }

      ctx.fillText("반환값 : " + this.returnData,20,30);
    });


  }
  reset(){//리셋 버튼을 눌렀을때 할 일

    this.head = null;
    this.que = [];
    this.initBoard();
    this.enableUI();
    // TODO: 보드 초기화

  }

  disableUI(){
    for(var i = 0; i < this.navigator.length;i++){
      this.navigator[i].disabled = true;
    }
    this.nextButton.disabled = false;

  }
  enableUI(){
    for(var i = 0; i < this.navigator.length;i++){
      this.navigator[i].disabled = false;
    }
    this.nextButton.disabled = true;
  }


  initBoard(){
    // TODO: 보드 초기화 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '15px Arial';
    ctx.fillText("Tail",50,140);

    ctx.fillText("Head",50,220);
    this.drawNullBox(30)
  }


  drawNode(x,y,value){ //노드 그리기
    ctx.beginPath();
    ctx.rect(x,y,70,50)
    //ctx.fillStyle = "#000";

    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x+50,y)
    ctx.lineTo(x+50,y+50)
    ctx.stroke();
    ctx.font = '15px Arial';
    ctx.fillText(value,x+20,y+30);
    ctx.closePath();
  }
  drawQueue(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var x;
    for(var i = 0; i <this.que.length;i++){
      x = i*100+30;
      this.drawNode(x,150,this.que[i].value);
      console.log(this.que[i].value);
      this.drawline(x+60,180,x+110,180);
    }
    ctx.beginPath();
    ctx.font = '15px Arial';
    ctx.fillText("Head",50,220);
    ctx.fillText("Tail",x+30,140);
    ctx.fillStyle="#000";
    ctx.closePath();
    this.drawNullBox(x+100);
  }

  drawline(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  }
  drawNullBox(x){
    ctx.beginPath();
    ctx.rect(x,150,70,50)
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";


    ctx.moveTo(x,150);
    ctx.lineTo(x+70,200);

    ctx.stroke();
    ctx.closePath();

  }



}

var k = new StackLinkedList();
var h = k.head;
