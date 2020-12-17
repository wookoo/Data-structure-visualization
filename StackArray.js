var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


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
  this.backButton = document.getElementById("back");
  this.backButton.disabled = true;
  this.nextButton = document.getElementById("next");
  this.nextButton.onclick = this.nextButtonClick.bind(this);
  this.nextButton.disabled = true;



    this.top = -1;
    this.stack = []; //

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
      this.nextButton.disabled = true;
    }
  }

  pushFieldLimit(){ //입력갯수 제한
    if(this.pushField.value.length > 3){
      this.pushField.value = this.pushField.value.slice(0,3);
    }
  }

  push(){ //푸쉬 버튼을 눌렀을떄 할일

    if(this.stack.length == 8){//메모리가 가득 차거나 입력이 없는 경우
      // TODO: 메모리가 가득차서 추가불가능
      this.initBoard();
      this.drawStack();
      ctx.font = '15px Arial';
      ctx.fillText("스택이 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);
      return;
    }
    var value = this.pushField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }
    this.top +=1;
    this.stack.push(value);
    this.drawTask.push(()=>{
      
    });


  }
  pop(){//pop 버튼을 눌렀을때 할일
    if(!this.top){//스택이 비었으면
      // TODO: 스택이 비어서 삭제 불가
      this.initBoard();
      ctx.font = '15px Arial';
      ctx.fillText("스택이 비어서 삭제 불가!" ,20,30);
      return;
    }
    this.returnData = this.top.value;
    this.top = this.top.next;
    this.stack.splice(this.stack.length-1,1);
    // TODO: 변화하는 과정 그리기, 그리는동안 푸쉬 팝 불가
    this.nextButton.disabled = false;
    this.disableUI();

    // TODO:  그리기 시작
    this.drawTask.push(()=>{
      ctx.font = '15px Arial';
      ctx.fillStyle = "#fef";
      ctx.fillRect(20,5,100,30);
      ctx.fillStyle = "#000";
      ctx.fillText("반환값 : " + this.returnData,20,30);
    })
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.font = '15px Arial';
      ctx.fillText("TOP",900-(this.stack.length)*100+20,220);
      ctx.fillStyle = "#fef"; //#fef
      ctx.fillRect(900-(this.stack.length+1)*100,205,50,50);
      ctx.fill();
      ctx.closePath();
    });
    this.drawTask.push(()=>{
      ctx.fillStyle = "#000";
      this.drawStack();
      ctx.fillText("반환값 : " + this.returnData,20,30);
    }

    );



    //this.enableUI();
  }
  reset(){//리셋 버튼을 눌렀을때 할 일

    this.top = null;
    this.stack = [];
    this.initBoard();
    this.nextButton.disabled = true;
    this.backButton.disabled = true;
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

    this.drawForm();

    ctx.fillText("TOP >",280,100+350);

  }
  drawForm(){
    ctx.beginPath();
    ctx.font = '15px Arial';
    this.drawline(400,50,400,400);
    this.drawline(500,50,500,400);
    for(var i = 1; i < 9;i++){
      this.drawline(400,50+(350/8)*i,500,50+(350/8)*i);
      ctx.fillText(7-i,350,100+350/8*i);
    }
    ctx.fillText(7,350,100);
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




}

var k = new StackLinkedList();
