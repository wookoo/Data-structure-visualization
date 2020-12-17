var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


class StackArray{

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

    }
  }

  pushFieldLimit(){ //입력갯수 제한
    if(this.pushField.value.length > 3){
      this.pushField.value = this.pushField.value.slice(0,3);
    }
  }

  push(){ //푸쉬 버튼을 눌렀을떄 할일

    if(this.top == 7){//메모리가 가득 차거나 입력이 없는 경우
      // TODO: 메모리가 가득차서 추가불가능
      ctx.beginPath()
      ctx.fillStyle = "#fef";
      ctx.fillRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.fillText("스택이 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);
      return;
    }
    var value = this.pushField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }
    this.top +=1;
    this.stack.push(value);
    this.disableUI();
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillStyle = "#fef";
      ctx.fillRect(280,50,50,1000);
      ctx.fillStyle = "#000";
      ctx.fillText("TOP >",280,100+350/8*(7-this.top));
      ctx.closePath();
    });
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillText(this.stack[this.top],440,80+350/8*(7-this.top));
      ctx.closePath();
    });
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillStyle = "#fef";
      ctx.fillRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.fillText("삽입된 값 : "+this.stack[this.top] ,20,30);
      ctx.closePath();
    });


  }
  pop(){//pop 버튼을 눌렀을때 할일
    if(this.top == -1){//스택이 비었으면
      // TODO: 스택이 비어서 삭제 불가
      this.initBoard();
      ctx.font = '15px Arial';
      ctx.fillText("스택이 비어서 삭제 불가!" ,20,30);
      return;
    }
    this.disableUI();
    this.returnData = this.stack[this.top];
    this.stack.splice(this.top,1);
    this.top -=1 ;

    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillStyle = "#fef";
      ctx.fillRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.fillText("반환된 값 : "+this.returnData ,20,30);
      ctx.closePath();
    });
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillStyle = "#fef";
      ctx.fillRect(410,350/8*(7-this.top)+10,80,30);
      ctx.closePath();
    });



    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillStyle = "#fef";
      ctx.fillRect(280,50,50,1000);
      ctx.fillStyle = "#000";
      ctx.fillText("TOP >",280,100+350/8*(7-this.top));
      ctx.closePath();
    });


  }
  reset(){//리셋 버튼을 눌렀을때 할 일

    this.top = -1;
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

var k = new StackArray();
