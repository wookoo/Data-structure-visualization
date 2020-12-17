var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


class QueueArray{

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

    this.que = []; //
    this.drawTask=[];
    this.head = 0;
    this.tail = 0;
    this.initBoard();
  }
  nextButtonClick(){
    if(this.drawTask.length == 0){
      return;
    }
    this.drawTask[0]();
    this.drawTask.splice(0,1);
    if(this.drawTask.length == 0){
      //this.enableUI();
    }
  }

  eunqueFieldLimit(){ //입력갯수 제한
    if(this.eunqueField.value.length > 3){
      this.eunqueField.value = this.eunqueField.value.slice(0,3);
    }
  }

  enque(){ //푸쉬 버튼을 눌렀을떄 할일


    if(this.que.length == 9){//메모리가 가득 차거나 입력이 없는 경우
      // TODO: 메모리가 가득차서 추가불가능

      ctx.font = '15px Arial';
      ctx.fillText("큐가 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);
      return;
    }
    var value = this.eunqueField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }

    this.que.push(value);
    this.tail +=1;
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillText(value,80+850/10*(this.tail-1),220);
      ctx.closePath();
    });
    this.drawTask.push(()=>{
        this.redrawHeadTail();
    })




  }
  deque(){//pop 버튼을 눌렀을때 할일
    if(this.head == this.tail){//스택이 비었으면
      // TODO: 스택이 비어서 삭제 불가
      ctx.beginPath()
      ctx.fillStyle = "#fef";
      ctx.fillRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.font = '15px Arial';
      ctx.fillText("큐가 비어서 삭제 불가!" ,20,30);
      return;
    }
    this.returnData = this.que[this.head];
    this.head+=1;

    // TODO:  그리기 시작
    console.log(this.head);
    this.drawTask.push(()=>{
      ctx.font = '15px Arial';
      ctx.fillStyle = "#fef";
      ctx.fillRect(20,5,350,30);
      ctx.fillStyle = "#000";
      ctx.fillText("반환값 : " + this.returnData,20,30);
      console.log("this.returnData"+this.returnData);
    })
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillStyle = "#fef";
      ctx.fillRect(70+850/10*(this.head-1),200,50,40);
      ctx.closePath();
    });

    this.drawTask.push(()=>{
      this.redrawHeadTail();
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
    this.drawForm();
    ctx.beginPath()
    ctx.fillText("Head",70,140);
    ctx.fillText("Tail",70,160);
    ctx.closePath();
  }

  redrawHeadTail(){
    ctx.beginPath();
    ctx.fillStyle = "#fef";
    ctx.fillRect(50,110,900,50);
    ctx.fillStyle = "#000";

    ctx.fillText("Head",70 + 850/10*this.head,140);
    ctx.fillText("Tail",70 + 850/10*this.tail,160);
    ctx.closePath();
  }




  drawline(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  }

  drawForm(){
    this.drawline(50,180,900,180);
    this.drawline(50,250,900,250);
    for(var i = 0; i < 10; i++){
      var x = 50 + 850/10*i
      this.drawline(x,180,x,250);
      ctx.beginPath();
      ctx.font = '15px Arial';
      ctx.fillText(i,x+30,280);
      ctx.closePath();
    }
    this.drawline(900,180,900,250);

  }



}

var k = new QueueArray();
