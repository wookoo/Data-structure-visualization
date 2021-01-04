var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Node{//노드
  constructor(value,next){
    this.value = value;//노드에 값과 다음 노드 정보가 있음
    this.next = next;
  }
}

class QueueLinkedList{

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



    this.head = null;//헤드노드는 null
    this.tail = null;//테일노드는 null
    this.que = []; //노드를 그려야 함으로 그려야하는 노드 정보

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
      ctx.fillText("큐가 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);//오류 출력
      return;
    }
    var value = this.eunqueField.value.trim();
    if(!Boolean(value)){//입력값이 없는 경우
      return; //그냥 종료
    }


    var newNode = new Node(value,null); //새로운 노드 생성

    if(this.head == null){//헤드노드가 없으면
      this.head = newNode;
      this.tail = newNode;
    }
    else{
      this.tail.next = newNode;//테일노드의 다음은 생성된 노드로 잇고
      this.tail = newNode; //테일노드는 생성된 노드로 설정
    }


    this.que.push(newNode); //현재 까지 생성된 정보 큐에 넣기
    var x = (this.que.length-1)*100
    this.drawTask.push(()=>{//생성된 노드 그리는 작업 추가
      this.drawNode(x+30,300,newNode.value);
    });
    this.drawTask.push(()=>{//생성된 노드를 NULL 노드로 잇는 간선 추가
      this.drawline(x+90,330,x+50,170)
    });
    this.drawTask.push(()=>{
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.fillText("Tail",x+50,380);//테일 노드 표기
      ctx.clearRect(0,90,2000,50);
      ctx.closePath();
    });

    this.drawTask.push(()=>{
      ctx.fillStyle = "#000";
      this.drawQueue(); //완성된 큐 그리고
      ctx.fillText("삽입된 값 : " + this.tail.value ,20,30); //삽입된 값 출력
    });
    this.disableUI();





  }
  deque(){//데큐 버튼을 눌렀을때 할일
    if(!this.head){//큐가 비었으면
      // TODO: 큐가 비어서 삭제 불가
      this.initBoard();//보드 초기화 후
      ctx.font = '15px Arial';
      ctx.fillText("큐가 비어서 삭제 불가!" ,20,30);//오류 출력
      return;
    }
    this.returnData = this.head.value;//반환될 데이터
    this.head = this.head.next; //헤드노드 이동
    if(this.head == null){//헤드노드가 null 이면 tail 도 null
      this.tail = null;
    }
    this.que.splice(0,1);//데큐했으므로 맨 처음 값 삭제
    // TODO: 변화하는 과정 그리기, 그리는동안 엔큐 데큐 불가
    this.disableUI();

    // TODO:  그리기 시작
    console.log(this.head);
    this.drawTask.push(()=>{//drawTask에 람다식 생성해서 작업추가
      ctx.font = '15px Arial';
      ctx.clearRect(20,5,100,30);
      ctx.fillStyle = "#000";
      ctx.fillText("반환값 : " + this.returnData,20,30);//반환값 그리고
    })
    this.drawTask.push(()=>{//drawTask에 람다식 생성해서 작업추가
      ctx.beginPath();
      ctx.font = '15px Arial';
      ctx.fillText("Head",150,220);//헤드 위치 변경
      ctx.clearRect(0,205,100,100);
      ctx.fill();
      ctx.closePath();
    });
    if(this.head == null){//drawTask에 람다식 생성해서 작업추가
      this.drawTask.push(()=>{//drawTask에 람다식 생성해서 작업추가
        ctx.clearRect(0,90,2000,50);
        ctx.fillStyle = "#000";
        ctx.fillText("Tail",100+50,140);//테일 위치 다시 그리기

      })
    }

    this.drawTask.push(()=>{//drawTask에 람다식 생성해서 작업추가
      ctx.fillStyle = "#000";
      if(this.head == null){//헤드 노드가 null 이면
        this.initBoard();//보드 초기화
      }else{
        this.drawQueue();//그게 아니면 현재 큐 상태 완성된거 그리기
      }
    });


  }
  reset(){//리셋 버튼을 눌렀을때 할 일

    this.head = null; //헤드 테일 노드 초기화
    this.tail = null;
    this.que = []; //삽입된 데이터 초기화
    this.initBoard(); //보드 초기화
    this.enableUI(); //UI 사용

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
    ctx.clearRect(0, 0, canvas.width, canvas.height); //보드 초기화
    ctx.font = '15px Arial';
    ctx.fillText("Tail",50,140);//헤드 테일노드 그리기
    ctx.fillText("Head",50,220);
    this.drawNullBox(30)//시작점에 널 포인터 그리기
  }


  drawNode(x,y,value){ //노드 그리기
    ctx.beginPath();
    ctx.rect(x,y,70,50) //입력된  x y 에 노드 상자 그리고
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x+50,y)
    ctx.lineTo(x+50,y+50)
    ctx.stroke();
    ctx.font = '15px Arial';
    ctx.fillText(value,x+20,y+30);//입력된 x y 에 입력 값 그리기
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
    ctx.fillText("Head",50,220);//헤드노드 위치 그리기
    ctx.fillText("Tail",x+30,140);//테일노드 위치 그리기
    ctx.fillStyle="#000";
    ctx.closePath();
    this.drawNullBox(x+100);//NULL 노드 위치 그리기
  }

  drawline(x1,y1,x2,y2){//x1 y1 x2 y2 두 점을 잇는 직선 그리는 함수
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  }
  drawNullBox(x){//빈 노드 그리기
    ctx.beginPath();
    ctx.rect(x,150,70,50) //사각형 그리고
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";

    ctx.moveTo(x,150); //사각형에 내접하는 대각선 그리기
    ctx.lineTo(x+70,200);
    ctx.stroke();
    ctx.closePath();

  }



}

var k = new QueueLinkedList();
