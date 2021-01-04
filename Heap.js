var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



class Heap{
  constructor(){//생성자

    this.pushField = addcontrolEntity("Text","");//최소힙 삽입을 위한텍스트 필드 생성
    this.pushField.size =3;//크기 지정
    this.pushField.oninput  = this.pushFieldLimit.bind(this);//입력됬을때 입력값 제한
    this.insertButton = addcontrolEntity("Button","최소힙 삽입");//최소힙 삽입 버튼 생성
    this.insertButton.onclick = this.insertMinHeap.bind(this); //최소힙 삽입 눌렀을때 실행하는 함수 설정
    this.deleteButton = addcontrolEntity("Button","최소힙 삭제");//최소힙 삭제 버튼 생성
    this.deleteButton.onclick = this.deleteMinHeap.bind(this);//최소힙 삭제 눌렀을때 실행하는 함수 설정
    this.resetButton = addcontrolEntity("Button","reset"); //초기화 버튼 생성
    this.resetButton.onclick = this.reset.bind(this); //초기화 버튼 눌렀을때 실행하는 함수 설정
    this.navigator = [ //상단 조작버튼배열에 넣기
      this.pushField,
      this.insertButton,
      this.deleteButton,
      this.resetButton
  ];

    this.nextButton = document.getElementById("next");
    this.nextButton.onclick = this.nextButtonClick.bind(this);
    this.enableUI();//상단 네비게이션 버튼 활성화 하단 next 버튼 비활성화
    this.heap = ["X"];
    this.initBoard();//빈 힙 그리기
    this.drawList = [];//그릴 힙의 목록
  }

  pushFieldLimit(){ //입력갯수 제한
    this.pushField.value = this.pushField.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
    //정규식 replace 를 써서 숫자만 입력
    if(this.pushField.value.length > 3){ //입력칸 3개 제한
      this.pushField.value = this.pushField.value.slice(0,3);
    }
  }

  insertMinHeap(){//최소힙 삽입
    if(this.heap.length == 8){//힙이 꽉차면
      this.initBoard();//현재 힙 상태 그리기
      ctx.font = '15px Arial';
      ctx.clearRect(0,0,1000,40);
      ctx.fillText("힙이 가득차서 삽입 불가! (할당 가능공간 없음)" ,20,30);//오류 출력
      return;
    }
    var value = this.pushField.value;//입력된 값
    if(value.length == 0){ //입력값 없으면 끝
      return;
    }
    value = Number(value);//입력 값을 숫자로 변환
    this.heap.push(value); //입력 값을 배열 끝에 넣기
    this.drawList.push(this.heap.slice()); //배열이 변화됬으므로 그리기 작업에 넣기
    ctx.fillStyle = "#000";
    ctx.font = '15px Arial';
    ctx.clearRect(0,0,1000,40);
    ctx.fillText("삽입된 값 : "+value ,20,30);//삽입된 값 표현
    var i = this.heap.length-1;//힙의 크기 -1 이 힙의 사이즈
    var item = value;//삽입될 값
    while((i!=1) && (item < this.heap[Math.floor(i/2)])){
      //부모가 더크면 교환 계속
      var temp = this.heap[i];
      this.heap[i] = this.heap[Math.floor(i/2)];
      this.heap[Math.floor(i/2)] = temp;
      this.drawList.push(this.heap.slice()); //교환됬으므로 교환과정 그리기 위한 drawList 에 현재 상태복사
      //slice() 를 써서 deepcopy 진행
      i = Math.floor(i/2);
    }
    this.heap[i] = item; //정위치를 찾았으면 데이터 삽입
    this.drawList.push(this.heap.slice());//교환됬으므로 교환과정 그리기 위한 drawList 에 현재 상태복사
    //slice() 를 써서 deepcopy 진행
    this.disableUI();

  }
  deleteMinHeap(){//최소힙 삭제
    if(this.heap.length == 1){ //힙이 빈경우
      this.initBoard(); //보드 초기화
      ctx.fillStyle = "#000";
      ctx.font = '15px Arial';
      ctx.clearRect(0,0,1000,40);
      ctx.fillText("힙이 비어서 삭제 불가!" ,20,30);//오류 출력
      return; //함수끝
    }

    this.disableUI();
    var parent, child,item,temp;
    item = this.heap[1];
    temp = this.heap.pop();//힙 데이터의 마지막값이 올라갈 데이터
    ctx.fillStyle = "#000";
    ctx.font = '15px Arial';
    ctx.clearRect(0,0,1000,40);
    ctx.fillText("반환된 값 : "+item ,20,30);//반환값 출력
    this.drawList.push(this.heap.slice());//데이터가 바뀌었으므로 현재 상태 그리기 위한 drawList 에 현재 상태 복사

    if(this.heap.length == 1){//데이터가 1개남으면 함수 끝
      return;
    }
    parent = 1;
    child = 2;
    while (child <= this.heap.length-1) { //자식노드는 힙에 저장된 값을 넘어가면 종료해야함.
        if ((child < this.heap.length-1) && this.heap[child] > this.heap[child + 1]) {
            child++; //자식 노드중, 우측 노드가 더 작으면 1을 더하여
            //우측 노드로 설정
        }
        if (temp < this.heap[child]) { //임시 노드가 제 위치를 찾아갔으면, 종료
            break;
        }
        var t= this.heap[parent];

        this.heap[parent] = this.heap[child]; //부모 노드랑 자식 노드랑 교환
        this.heap[child] = t;
        parent = child; //부모 노드랑 자식 노드랑 교환
        child *= 2;
        this.drawList.push(this.heap.slice());
    }
    this.heap[parent] = temp; //현재 부모 위치에 temp 를 씌워서값을 정상적으로 설정
    this.drawList.push(this.heap.slice());//데이터가 바뀌었으므로 현재 상태 그리기 위한 drawList 에 현재 상태 복사
    // 마지막 노드를 재구성한 위치에 삽입

  }
  reset(){//초기화 버튼
    this.heap = ["X"]; //힙 초기화
    this.drawList = []; //그릴 데이터 초기화
    this.initBoard(); //그림판 초기환
    this.enableUI();
  }

  nextButtonClick(){
    if(this.drawList.length == 0){ //그릴게 없으면
      this.enableUI(); //상단 네비게이터 활성화
      return;
    }
    this.drawArray(this.drawList[0]);//큐 방식으로 제일 처음 들어온 배열을 그린다
    this.drawList.splice(0,1);//그리기가 끝나면 제일 처음 들어온 값 삭제
    if(this.drawList.length == 0){//그릴게 없으면
      this.enableUI();//UI 활성화
    }
  }



  disableUI(){ //그리기 버튼 누르지 못하게 설정
    for(var i = 0; i < this.navigator.length;i++){
      this.navigator[i].disabled = true; //정렬 버튼 누르지 못하게 설정
    }
    this.nextButton.disabled = false;//다음버튼 누를수 있게 설정
  }

  enableUI(){ //그리기 버튼 누르게 설정
    for(var i = 0; i < this.navigator.length;i++){
      this.navigator[i].disabled = false;//정렬 버튼 누르게 설정
    }
    this.nextButton.disabled = true;//다음버튼 누를수 없게 설정
  }

  drawArray(array){//입력한 힙을 그리기

    ctx.clearRect(20,40,canvas.width,canvas.height);//상태 메세지를 제외한곳 보드 초기화

    this.drawline(50,50,900,50);//직선으로 배열 그리기 시작
    this.drawline(50,100,900,100);
    ctx.fillStyle = "#000";
    ctx.font = '15px Arial';
    for(var i = 0; i <8; i++){
      var x = 50 + 850/8*i;
      this.drawline(x,50,x,100); //중간줄 그리기
      ctx.fillText(i,x+45,130); //중간줄을 그리면서 인덱스도 그리기
    }
    this.drawline(900,50,900,100);//직선으로 배열 그리기 끝, 맨 우측 세로줄
    ctx.beginPath();
    for(var i = 0; i <array.length;i++){
      var value = array[i]; //배열안에 값 가져오고
      var x = 95 + 850/8*i; //배열안에 그려주는 위치 계산
      ctx.fillText(value,x,82); //해당 위치에 맞게 배열안에 값 그리기
      this.drawNode(i,value); //해당 위치에 맞게 힙 노드 그리기
    }

    ctx.closePath();
  }
  drawNode(x,value){
    if (x == 0){ //0번쨰 노드는 X 임으로 그리지 않음
      return;
    }
    else if (x == 1){ //첫번째 노드 그리기
      ctx.beginPath();
      ctx.rect(450,150,70,50); //루트 노드 사각형 그리기
      ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fillText(value,480,180);//루트 노드의 값 그리기

      ctx.closePath();
    }
    else if (x == 2){//두번째 노드 그리기
      ctx.beginPath();
      ctx.rect(220,230,70,50); //루트 좌측 노드 도형 그리기
      ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fillText(value,250,260); //루트 좌측노드 값 그리기
      ctx.closePath();
      this.drawline(255,230,485,200); //루트좌측노드와 루트 잇는 간선 그리기
    }
    else if (x == 3){//세번째 노드 그리기
      ctx.beginPath();
      ctx.rect(680,230,70,50); //루트 우측 노드 도형 그리기
      ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fillText(value,710,260);//루트 우측노드 값 그리기
      ctx.closePath();
      this.drawline(715,230,485,200);//루트 우측노드와 루트 잇는 간선 그리기
    }
    else if (x == 4){//세번째 노드 그리기
      ctx.beginPath();
      ctx.rect(100,350,70,50); //루트 좌측 의 좌측노드 도형 그리기
      ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fillText(value,130,380);//루트 좌측의 좌측노드 값 그리기
      ctx.closePath();
      this.drawline(135,350,255,280);//루트 좌측의 좌측노드와 루트 좌측노드 잇는 간선 그리기
    }
    else if (x == 5){//다섯번째 노드 그리기
      ctx.beginPath();
      ctx.rect(340,350,70,50);//루트 좌측의 우측노드 도형 그리기
      ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = "#000";
      ctx.fillText(value,370,380);//루트 좌측의 우측노드 값 그리기
      this.drawline(375,350,255,280);//루트 좌측의 우측노드와 루트 좌측노드 잇는 간선 그리기

    }
    else if (x == 6){//여섯번째 노드 그리기
      ctx.beginPath();
      ctx.rect(560,350,70,50);//루트 우측의 좌측노드 도형 그리기
      ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = "#000";
      ctx.fillText(value,590,380);//루트 우측의 좌측노드 값 그리기
      this.drawline(595,350,715,280);//루트 우측의 좌측노드와 루트 우측노드 잇는 간선 그리기
    }
    else if (x == 7){//일곱번쨰 노드 그리기
      ctx.beginPath();
      ctx.rect(800,350,70,50);//루트 우측의 우측노드 도형 그리기
      ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = "#000";
      ctx.fillText(value,830,380);//루트 우측의 우측노드 값 그리기
      this.drawline(835,350,715,280);//루트 우측의 우측노드 와 루트 우측노드 잇는 간선 그리기
    }
  }

  drawline(x1,y1,x2,y2){ //x1 y1 x2 y2 두 점을 잇는 직선 그리는 함수
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  }


  initBoard(){//보드 초기화
    this.drawArray(this.heap);//현재 힙 상태 그리기
    return;
  }


}

var k = new Heap();
