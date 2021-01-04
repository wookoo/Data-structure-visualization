var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



class Sort{
  constructor(){//생성자
    this.swaped= 0; //교환횟수 초기화
    this.shuffleArray();//배열 초기화
    this.bubbleButton = addcontrolEntity("Button","버블정렬");//버블정렬 버튼 생성
    this.bubbleButton.onclick = this.bubbleSort.bind(this); //버블 정렬 눌렀을때 실행되는 함수 설정
    this.insertButton = addcontrolEntity("Button","삽입정렬");//삽입정렬 버튼 생성
    this.insertButton.onclick = this.insertSort.bind(this); //삽입 정렬 눌렀을때 실행되는 함수 설정
    this.selectionButton = addcontrolEntity("Button","선택정렬");//선택정렬 버튼 생성
    this.selectionButton.onclick = this.selectionSort.bind(this);//선택 정렬 눌렀을때 실행되는 함수 설정
    this.shellButton = addcontrolEntity("Button","쉘정렬");//쉘정렬 버튼 생성
    this.shellButton.onclick = this.shellSort.bind(this);//쉘정렬 눌렀을때 실행되는 함수 설정
    this.quickButton = addcontrolEntity("Button","퀵정렬");//퀵정렬 버튼 생성
    this.quickButton.onclick = this.quick.bind(this);//퀵정렬 눌렀을때 실행되는 함수 설정
    this.resetButton = addcontrolEntity("Button","reset");//초기화 버튼 생성
    this.resetButton.onclick = this.reset.bind(this);//리셋 버튼 눌렀을때 실행되는 함수 설정
    this.navigator = [ //상단 조작버튼배열에 넣기
      this.bubbleButton,
      this.insertButton,
      this.selectionButton,
      this.shellButton,
      this.quickButton,
      this.resetButton
  ];

    this.nextButton = document.getElementById("next"); //다음버튼 생성
    this.nextButton.onclick = this.nextButtonClick.bind(this);//다음버튼 눌렀을때 실행되는 함수 설정
    this.enableUI(); //상단 네비게이션 버튼 활성화 하단 next 버튼 비활성화
    this.drawList = []; //그릴 배열의 목록
    this.initBoard(); //보드 초기화로 랜덤 배열 출력

  }

  inc_insertion_sort(first, gap){ //쉘정렬을 위한 삽입정렬
  var i, j, key;

  for(i=first+gap; i<=this.sortedList.length-1; i=i+gap){
    key = this.sortedList[i]; // 현재 삽입될 숫자인 i번째 정수를 key 변수로 복사

    // 현재 정렬된 배열은 i-gap까지이므로 i-gap번째부터 역순으로 조사한다.
    // j 값은 first 이상이어야 하고
    // key 값보다 정렬된 배열에 있는 값이 크면 j번째를 j+gap번째로 이동
    for(j=i-gap; j>=first && this.sortedList[j]>key; j=j-gap){
      this.sortedList[j+gap] = this.sortedList[j]; // 레코드를 gap만큼 오른쪽으로 이동
      this.drawList.push(this.sortedList.slice()); //레코드가 이동됬으므로 변화과정 보여주기 위해 현재 변화된 배열 그리는 배열에 넣기
    }

    this.sortedList[j+gap] = key;
    this.drawList.push(this.sortedList.slice());//레코드가 이동됬으므로 변화과정 보여주기 위해 현재 변화된 배열 그리는 배열에 넣기
  }
}
  shellSort(){//쉘정렬 수행
    var i,gap;
    for(gap=Math.floor(this.sortedList.length/2);gap >0; gap= Math.floor(gap/2)){ //갭설정
      if((gap%2)==0){//갭이 짝수면
        gap+=1;//홀수로 변경
      }
      for(i = 0; i <gap;i++){
        this.inc_insertion_sort(i,gap); //갭을 기준으로 삽입정렬 수행
      }
    }
    this.disableUI();//쉘정렬이 끝났으면 다른 정렬 못누르게 설정
  }

  selectionSort(){//선택 정렬
    this.swaped= 0;
    var i,j,least,temp;
    for (i = 0; i <this.sortedList.length;i++){
      least = i;
      for(j = i+1; j <this.sortedList.length;j++){
        if(this.sortedList[j] < this.sortedList[least]){
          least = j;//요소를 돌며 최소값 탐색
        }
      }
      if(i != least){//최소값을 반견했으면
        temp = this.sortedList[i];
        this.sortedList[i] = this.sortedList[least];
        this.sortedList[least] = temp;//값 교환
        this.drawList.push(this.sortedList.slice());//레코드가 이동됬으므로 변화과정 보여주기 위해 현재 변화된 배열 그리는 배열에 넣기
      }

    }
    this.disableUI();//정렬이 끝났으면 다른 정렬 못누르게 설정
  }

  insertSort(){//삽입정렬
    this.swaped = 0;
    var key;
    for(var i = 1; i < this.sortedList.length;i++){
      key = this.sortedList[i];// 현재 삽입될 숫자인 i번째 정수를 key 변수로 복사

      // 현재 정렬된 배열은 i-1까지이므로 i-1번째부터 역순으로 조사한다.
    // j 값은 음수가 아니어야 되고
    // key 값보다 정렬된 배열에 있는 값이 크면 j번째를 j+1번째로 이동
      for(var j = i-1; j >=0 && this.sortedList[j] >key;j--){
        this.sortedList[j+1] = this.sortedList[j]; //레코드 오른쪽 이동
        this.drawList.push(this.sortedList.slice());//레코드가 이동됬으므로 변화과정 보여주기 위해 현재 변화된 배열 그리는 배열에 넣기
      }
      this.sortedList[j+1] = key;
      this.drawList.push(this.sortedList.slice());//레코드가 이동됬으므로 변화과정 보여주기 위해 현재 변화된 배열 그리는 배열에 넣기
    }
    this.disableUI();
  }

  reset(){ //초기화 버튼
    this.drawList = []; //그리는 작업 초기화
    this.shuffleArray(); //배열 초기화
    this.initBoard(); //배열 재생성
    this.enableUI(); //버튼 누를수 있게 설정
  }
  quick(){//퀵정렬 버튼 눌렀을때
    this.swaped = 0;

    this.quickSort(0,this.sortedList.length-1); //퀵정렬 수행
    this.disableUI(); //퀵정렬이 끝나면 그리기가 끝날때까지 다른 정렬 못누르게 설정
  }



  shuffleArray(){//배열 초기화
    this.swaped = 0;
    this.sortedList = [];
    for(var i = 0; i < 12; i++){
      this.sortedList.push(Math.floor((Math.random()*100)));//배열에 0~100의 랜덤값 삽입
    }
  }


  nextButtonClick(){//다음버튼의 작업
    if(this.drawList.length == 0){//그릴게 없으면
      this.enableUI(); //UI 활성화
      return;
    }
    this.swaped +=1;//비교횟수 1 증가
    this.drawArray(this.drawList[0]);//큐 방식으로 제일 처음 들어온 배열을 그린다
    this.drawList.splice(0,1); //그리기가 끝나면 제일 처음 들어온 값 삭제
    if(this.drawList.length == 0){//그릴게 없으면
      this.enableUI();//UI 활성화
    }
  }
  quickSort(start,end){//퀵정렬
    if (start >=end){ //원소가 1개면 그대로 두기
      return;
    }
    var key = start; //키는 첫번째 원소
    var i = start+1;
    var j = end;
    var temp;
    while(i <= j){
      while(i<= end && this.sortedList[i] <= this.sortedList[key]){//키보다 큰값 탐색
        i+=1;
      }
      while(j > start & this.sortedList[j] >= this.sortedList[key]){//키보다 작은값 탐색
        j-=1;
      }
      if(i > j){ //엇갈린 상태면 교환
        temp = this.sortedList[j];
        this.sortedList[j] = this.sortedList[key];
        this.sortedList[key] = temp;
        this.drawList.push(this.sortedList.slice());//레코드가 이동됬으므로 변화과정 보여주기 위해 현재 변화된 배열 그리는 배열에 넣기
      }else{//엇갈리지 않았으면 i 와 j 교체
        temp = this.sortedList[i];
        this.sortedList[i] = this.sortedList[j];
        this.sortedList[j] = temp;
        this.drawList.push(this.sortedList.slice());//레코드가 이동됬으므로 변화과정 보여주기 위해 현재 변화된 배열 그리는 배열에 넣기
      }
    }
    this.quickSort(start,j-1);
    this.quickSort(j+1,end);
  }






  bubbleSort(){
    this.swaped = 0;
    for(var i = this.sortedList.length-1; i >0 ;i--){
      for(var j = 0; j < i; j++){
        if(this.sortedList[j] > this.sortedList[j+1]){
          // j번째와 j+1번째의 요소가 크기 순이 아니면 교환
          var temp = this.sortedList[j];
          this.sortedList[j] = this.sortedList[j+1];
          this.sortedList[j+1] = temp;
          this.drawList.push(this.sortedList.slice());//교환됬으므로 그릴 작업 추가
        }
      }
    }
    this.disableUI(); //그리기가 끝날떄 까지 다른 정렬 버튼 누르지 못하게 설정
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

  drawArray(x){ //입력한 배열을 막대그래프로 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);//보드 초기화
    ctx.beginPath();
    ctx.font = '15px Arial';
    ctx.fillText("교환횟수 : "+this.swaped ,20,30);//교환횟수 그려주기

    for(var i = 0; i < x.length; i++){
      ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
      var height = x[i];
      var heightPercent = height*3 //300을 기준으로 87이면 300의 87% 인 261이 됨
      ctx.fillRect(50+i*80,80+300-heightPercent,40,heightPercent); //막대그래프 그리기
      ctx.fillStyle = "#000";
      ctx.font = '15px Arial';
      ctx.fillText(height,65+i*80,400);//막대그래프의 크기 보여주기
    }

    ctx.closePath();
  }


  initBoard(){//보드 초기화
    this.drawArray(this.sortedList);//초기화는 현재 배열 상태
    return;
  }



}

var k = new Sort();
