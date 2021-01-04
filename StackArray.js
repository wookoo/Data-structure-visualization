var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


class StackArray{

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




    this.top = -1;//top, 값이 없으므로 -1
    this.stack = []; //스택 정보

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

    if(this.top == 7){//메모리가 가득 차거나 입력이 없는 경우
      // TODO: 메모리가 가득차서 추가불가능
      ctx.beginPath()
      ctx.clearRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.fillText("스택이 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);//오류 출력
      return;
    }
    var value = this.pushField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }
    this.top +=1;//top 증가
    this.stack.push(value);//스택에 값 넣기
    this.disableUI();  // 변화하는 과정 그리기 그리는동안 푸쉬 팝 불가
    this.drawTask.push(()=>{//람다식으로 그리는 작업추가
      ctx.beginPath();
      ctx.clearRect(280,50,50,1000);
      ctx.fillStyle = "#000";
      ctx.fillText("TOP >",280,100+350/8*(7-this.top));//탑 위치 다시그리기
      ctx.closePath();
    });
    this.drawTask.push(()=>{//람다식으로 그리는 작업추가
      ctx.beginPath();
      ctx.fillText(this.stack[this.top],440,80+350/8*(7-this.top));//삽입된 값 그리기
      ctx.closePath();
    });
    this.drawTask.push(()=>{//람다식으로 그리는 작업추가
      ctx.beginPath();
      ctx.clearRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.fillText("삽입된 값 : "+this.stack[this.top] ,20,30);//삽입된값 출력
      ctx.closePath();
    });


  }
  pop(){//pop 버튼을 눌렀을때 할일
    if(this.top == -1){//스택이 비었으면
      // TODO: 스택이 비어서 삭제 불가
      this.initBoard();//보드 초기화
      ctx.font = '15px Arial';
      ctx.fillText("스택이 비어서 삭제 불가!" ,20,30);//오류 출력
      return;
    }
    this.disableUI();//그리는동안 푸쉬 팝 불가
    this.returnData = this.stack[this.top];//반환 데이터
    this.stack.splice(this.top,1);//스택에서 마지막 값 삭제
    this.top -=1 ;//top 감소

    this.drawTask.push(()=>{//반환된값 그리는 함수 람다식 생성후 작업 추가
      ctx.beginPath();
      ctx.clearRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.fillText("반환된 값 : "+this.returnData ,20,30);//반환된값 출력
      ctx.closePath();
    });
    this.drawTask.push(()=>{//반환되었으므로 저장했던 값 지우기
      ctx.beginPath();
      ctx.clearRect(410,350/8*(7-this.top)+10,80,30);
      ctx.closePath();
    });

    this.drawTask.push(()=>{//탑 위치 다시 그리는 작업 추가
      ctx.beginPath();
      ctx.clearRect(280,50,50,1000);
      ctx.fillStyle = "#000";
      ctx.fillText("TOP >",280,100+350/8*(7-this.top));
      ctx.closePath();
    });


  }
  reset(){//리셋 버튼을 눌렀을때 할 일

    this.top = -1;
    this.stack = [];
    this.initBoard();
    this.enableUI();

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);//보드 초기화
    this.drawForm();//기본 플랫폼 그리기
    ctx.fillText("TOP >",280,100+350);//탑 위치 그리기

  }
  drawForm(){//기본 플랫폼 그리기
    ctx.beginPath();
    ctx.font = '15px Arial';
    this.drawline(400,50,400,400);//배열 그리기
    this.drawline(500,50,500,400);
    for(var i = 1; i < 9;i++){
      this.drawline(400,50+(350/8)*i,500,50+(350/8)*i);
      ctx.fillText(7-i,350,100+350/8*i);//배열의 인덱스 그리기
    }
    ctx.fillText(7,350,100);//배열의 인덱스 그리기
    ctx.closePath();

  }
  drawline(x1,y1,x2,y2){//x1 y2 x2 y2 두 점을 잇는 라인 그리기
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  }




}

var k = new StackArray();
