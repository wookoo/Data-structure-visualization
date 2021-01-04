var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Node{ //노드 설정
  constructor(value,next){//값과 다음 노드
    this.value = value;
    this.next = next;
  }
}

class StackLinkedList{

  constructor(){

    this.pushField = addcontrolEntity("Text","");//입력 데이터
    this.pushField.size = 3;//입력 데이터 사이즈 설정
    this.pushField.oninput = this.pushFieldLimit.bind(this);//입력됬을때 입력갯수 제한 함수 호출
    this.pushButton = addcontrolEntity("Button","push");//푸쉬버튼 생성
    this.pushButton.onclick = this.push.bind(this);//눌렀을때 작동하는 함수 설정
    this.popButton = addcontrolEntity("Button","pop");//팝 버튼 생성
    this.popButton.onclick = this.pop.bind(this);//눌렀을때 작동하는 함수 설정
    this.resetButton = addcontrolEntity("Button","reset");//리셋 버튼 생성
    this.resetButton.onclick = this.reset.bind(this);//눌렀을때 작동하는 함수 설정
    this.navigator = [//상단 버튼들 배열
      this.pushField,
      this.pushButton,
      this.popButton,
      this.resetButton
  ];
  this.nextButton = document.getElementById("next");//다음버튼 생성
  this.nextButton.onclick = this.nextButtonClick.bind(this);//눌렀을때 작동하는 함수 설정
  this.nextButton.disabled = true;//다음버튼 클릭 못하게 설정



    this.top = null;//top 노드는 null
    this.stack = []; //노드를 그려야 함으로 입력 데이터 저장

    this.drawTask=[];//그리는 정보

    this.initBoard();//보드 초기화
  }
  nextButtonClick(){//다음 버튼 눌렀을때
    if(this.drawTask.length == 0){//그릴게 없으면 종료
      return;
    }
    this.drawTask[0]();//가장 처음 들어온 작업 꺼내서 수행, 람다식
    this.drawTask.splice(0,1);//작업 수행했으므로 수행한 작업 없앰
    if(this.drawTask.length == 0){//그릴게 없으면
      this.enableUI();//UI 활성화 후 종료
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
      ctx.fillText("스택이 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);//오류 출력
      return;
    }
    var value = this.pushField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }

    this.disableUI();
    var newNode = new Node(value,this.top); //새로운 노드 생성
    this.top = newNode; //top 변환, push 끝
    this.stack.push(newNode); //현재 까지 생성된 정보 스택에 넣기



    this.disableUI();//변화하는 과정 그리기 그리는동안 푸쉬 팝 불가
    var x = 900-(this.stack.length)*100;
    this.drawTask.push(()=>{this.drawNode(x,150,this.top.value)});//그리기 작업 추가
    this.drawTask.push(()=>{this.drawline(x+60,180,x+110,180)}); //그리기 작업 추가
    this.drawTask.push(()=>{this.drawStack();
      ctx.fillText("삽입된 값 : " + this.top.value  ,20,30);
    }); //그리기 작업 추가

  }
  pop(){//pop 버튼을 눌렀을때 할일
    if(!this.top){//스택이 비었으면
      // TODO: 스택이 비어서 삭제 불가
      this.initBoard();//보드 초기화
      ctx.font = '15px Arial';
      ctx.fillText("스택이 비어서 삭제 불가!" ,20,30);//오류출력
      return;
    }
    this.returnData = this.top.value;//반환 데이터
    this.top = this.top.next;//top 이동
    this.stack.splice(this.stack.length-1,1);//마지막에 들어간 값 삭제
    // TODO: 변화하는 과정 그리기, 그리는동안 푸쉬 팝 불가
    this.disableUI();

    // TODO:  그리기 시작
    this.drawTask.push(()=>{//반환값 그리는 함수 람다식 생성후 작업 추가
      ctx.font = '15px Arial';
      ctx.clearRect(20,5,1000,30);
      ctx.fillStyle = "#000";
      ctx.fillText("반환값 : " + this.returnData,20,30);//반환값 출력
    })
    this.drawTask.push(()=>{//변화된 TOP 그리는 함수 람다식 생성후 작업 추가
      ctx.beginPath();
      ctx.font = '15px Arial';
      ctx.fillText("TOP",900-(this.stack.length)*100+20,220);//탑 이동하는거 보여주기
      ctx.clearRect(900-(this.stack.length+1)*100,205,50,50);//이전에 입력된 값 그리는거 지우기
      ctx.fill();
      ctx.closePath();
    });
    this.drawTask.push(()=>{
      ctx.fillStyle = "#000";
      this.drawStack();//현재 최종 스택 그림 그리기
      ctx.fillText("반환값 : " + this.returnData,20,30);
    }

    );


  }
  reset(){//리셋 버튼을 눌렀을때 할 일

    this.top = null;//탑 초기화
    this.stack = [];//스택 정보 초기화
    this.initBoard();//보드 초기화
    this.enableUI();//상단 버튼 활성화 하단 버튼 비활성화
    // TODO: 보드 초기화

  }

  disableUI(){ //그리기 버튼 누르지 못하게 설정
    for(var i = 0; i < this.navigator.length;i++){
      this.navigator[i].disabled = true; //조작 버튼 누르지 못하게 설정
    }
    this.nextButton.disabled = false;//다음버튼 누를수 있게 설정
  }
  enableUI(){ //그리기 버튼 누르게 설정
    for(var i = 0; i < this.navigator.length;i++){
      this.navigator[i].disabled = false;//조작 버튼 누르게 설정
    }
    this.nextButton.disabled = true;//다음버튼 누를수 없게 설정
  }


  initBoard(){
    // TODO: 보드 초기화 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '15px Arial';
    ctx.fillText("TOP",910,220); //TOP 위치 초기화
    this.drawNullBox()//널 노드 그리기
  }


  drawNode(x,y,value){ //노드 그리기
    ctx.beginPath();
    ctx.rect(x,y,70,50)//사각형 그리고

    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x+50,y)
    ctx.lineTo(x+50,y+50)
    ctx.stroke();
    ctx.font = '15px Arial';
    ctx.fillText(value,x+20,y+30);//사각형 안에 값 그리기
    ctx.closePath();
  }
  drawStack(){ //스택 그리기

    ctx.clearRect(0, 0, canvas.width, canvas.height); //보드 초기화
    for(var i = 0; i <this.stack.length;i++){
      var x = 900-(this.stack.length-i)*100; //노드에 맞게 x 좌표 구함
      this.drawNode(x,150,this.stack[this.stack.length-i-1].value);//x 좌표 맞게 그리기
      this.drawline(x+60,180,x+110,180);//노드 잇는 간선 그리기
    }
    ctx.beginPath();
    ctx.font = '15px Arial';
    ctx.fillText("TOP",900-(this.stack.length)*100+20,220);//top 위치 구해서 그리기
    ctx.fillStyle="#000";
    ctx.closePath();
    this.drawNullBox();
  }
  drawline(x1,y1,x2,y2){//x1 y2 x2 y2 두 점을 잇는 라인 그리기
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  }
  drawNullBox(){//NULL 박스 그리기
    ctx.beginPath();
    ctx.rect(900,150,50,50)
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(900,150);
    ctx.lineTo(950,200);
    ctx.stroke();
    ctx.closePath();

  }



}

var k = new StackLinkedList();
