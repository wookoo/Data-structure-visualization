var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


class QueueArray{

  constructor(){

    this.eunqueField = addcontrolEntity("Text","");//입력 데이터
    this.eunqueField.size = 3;//입력 데이터 사이즈 설정
    this.eunqueField.oninput = this.eunqueFieldLimit.bind(this);//입력됬을때 입력갯수 제한 함수 호출
    this.enqueButton = addcontrolEntity("Button","enque");//enque 버튼 생성
    this.enqueButton.onclick = this.enque.bind(this); //눌렀을때 작동하는 함수 설정
    this.dequeButton = addcontrolEntity("Button","deque");//데큐 버튼 생성
    this.dequeButton.onclick = this.deque.bind(this);//눌렀을때 작동하는 함수 설정
    this.resetButton = addcontrolEntity("Button","reset"); //리셋 버튼 생성
    this.resetButton.onclick = this.reset.bind(this);//눌렀을때 작동하는 함수 설정
    this.navigator = [//상단 버튼들 배열
      this.eunqueField,
      this.enqueButton,
      this.dequeButton,
      this.resetButton
  ];

  this.nextButton = document.getElementById("next");//다음 버튼 생성
  this.nextButton.onclick = this.nextButtonClick.bind(this);//눌렀을때 작동하는 함수 설정
  this.enableUI();//상단 클릭가능하게 / 하단 클릭 못하게 설정

    this.que = []; //입력된 큐
    this.drawTask=[];//그려야되는 작업이 저장되는 리스트
    this.head = 0;//기본 헤드/테일 노드 위치
    this.tail = 0;//기본 헤드/테일 노드 위치
    this.initBoard();//보드 초기화
    this.enableUI();//상단 클릭가능하게 / 하단 클릭 못하게 설정
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


  eunqueFieldLimit(){ //입력갯수 제한
    if(this.eunqueField.value.length > 3){
      this.eunqueField.value = this.eunqueField.value.slice(0,3);
    }
  }

  enque(){ //엔큐 버튼을 눌렀을떄 할일


    if(this.que.length == 9){//메모리가 가득 찬경우
      ctx.beginPath()
      ctx.clearRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.font = '15px Arial';
      ctx.fillText("큐가 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);//오류 출력
      return;
    }
    var value = this.eunqueField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }

    this.que.push(value);//입력값을 큐에 삽입
    this.tail +=1; //값이 들어왔으므로 tail 증가
    this.drawTask.push(()=>{//람다식으로 drawTask에 작업 추가
      ctx.beginPath();
      ctx.fillText(value,80+850/10*(this.tail-1),220);//삽입된 값 그리기
      ctx.closePath();
    });
    this.drawTask.push(()=>{//람다식으로 drawTask에 작업 추가
        this.redrawHeadTail();//redrawHeadTail 로 head tail 다시 그리기
    })
    this.drawTask.push(()=>{//람다식으로 drawTask에 작업 추가
      ctx.font = '15px Arial';
      ctx.clearRect(20,5,350,30);
      ctx.fillStyle = "#000";
      ctx.fillText("삽입된값 : " + this.que[this.tail-1],20,30);//삽입된값 출력
    });
    this.disableUI();//메인 ui 비활성화




  }
  deque(){//데큐버튼을 눌렀을때 할일
    if(this.head == this.tail){//큐가 비었으면
      // TODO: 큐가 비어서 삭제 불가
      ctx.beginPath()
      ctx.clearRect(20,10,600,30);
      ctx.fillStyle = "#000";
      ctx.font = '15px Arial';
      ctx.fillText("큐가 비어서 삭제 불가!" ,20,30);//오류 출력
      return;
    }
    this.returnData = this.que[this.head];
    this.head+=1;

    // TODO:  그리기 시작
    console.log(this.head);
    this.drawTask.push(()=>{//drawTask에 람다식 생성해서 작업 추가
      ctx.font = '15px Arial';
      ctx.clearRect(20,5,350,30);
      ctx.fillStyle = "#000";
      ctx.fillText("반환값 : " + this.returnData,20,30);//반환값 그리기
    })
    this.drawTask.push(()=>{//drawTask에 람다식 생성해서 작업 추가
      ctx.beginPath();
      ctx.clearRect(70+850/10*(this.head-1),200,50,40); //이전에 저장된 배열 그린거 지우기
      ctx.closePath();
    });

    this.drawTask.push(()=>{//drawTask에 람다식 생성해서 작업 추가
      this.redrawHeadTail();//redrawHeadTail 로 head tail 다시 그리기
    });
    this.disableUI(); //메인 ui 비활성화


  }
  reset(){//리셋 버튼을 눌렀을때 할 일

    this.head = 0; //헤드 초기화
    this.tail = 0;
    this.que = []; //큐 초기화
    this.initBoard(); //보드초기화
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


  initBoard(){//보드 초기화

    ctx.clearRect(0, 0, canvas.width, canvas.height);//보드 초기화
    this.drawForm(); //빈 큐 그리기
    ctx.beginPath()
    ctx.fillText("Head",70,140); //헤드 초창기 그리기
    ctx.fillText("Tail",70,160); //테일 초창기 그리기
    ctx.closePath();
  }

  redrawHeadTail(){
    ctx.beginPath();
    ctx.clearRect(50,110,900,50);//예전에 그린 헤드 노드와 테일노드 위치 지우기
    ctx.fillStyle = "#000";

    ctx.fillText("Head",70 + 850/10*this.head,140);//헤드노드와 테일노드 위치 그리기
    ctx.fillText("Tail",70 + 850/10*this.tail,160);
    ctx.closePath();
  }




  drawline(x1,y1,x2,y2){//x1 y1 x2 y2 두 점을 잇는 직선 그리는 함수
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  }

  drawForm(){ //배열과 배열 인덱스 그리기 시작
    this.drawline(50,180,900,180);//배열의 가로줄 그리기
    this.drawline(50,250,900,250);
    for(var i = 0; i < 10; i++){
      var x = 50 + 850/10*i
      this.drawline(x,180,x,250); //배열의 세로줄 그리기
      ctx.beginPath();
      ctx.font = '15px Arial';
      ctx.fillText(i,x+30,280);//해당 배열의 인덱스 표기
      ctx.closePath();
    }
    this.drawline(900,180,900,250);

  }



}

var k = new QueueArray();
