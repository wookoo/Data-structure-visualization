var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



class Sort{
  constructor(){
    this.swaped= 0;
    this.shuffleArray();
    this.bubbleButton = addcontrolEntity("Button","버블정렬");
    this.bubbleButton.onclick = this.bubbleSort.bind(this);
    this.insertButton = addcontrolEntity("Button","삽입정렬");
    this.insertButton.onclick = this.insertSort.bind(this);
    this.selectionButton = addcontrolEntity("Button","선택정렬");
    this.selectionButton.onclick = this.selectionSort.bind(this);
    this.shellButton = addcontrolEntity("Button","쉘정렬");
    this.shellButton.onclick = this.shellSort.bind(this);
    this.quickButton = addcontrolEntity("Button","퀵정렬");
    this.quickButton.onclick = this.quick.bind(this);
    this.resetButton = addcontrolEntity("Button","reset");
    this.resetButton.onclick = this.reset.bind(this);
    this.navigator = [
      this.bubbleButton,
      this.insertButton,
      this.selectionButton,
      this.shellButton,
      this.quickButton,
      this.resetButton
  ];
    this.backButton = document.getElementById("back");
    this.backButton.disabled = true;
    this.nextButton = document.getElementById("next");
    this.nextButton.onclick = this.nextButtonClick.bind(this);
    this.enableUI();
    this.drawList = [];
    this.initBoard();

  }

  inc_insertion_sort(first, gap){
  var i, j, key;

  for(i=first+gap; i<=this.sortedList.length-1; i=i+gap){
    key = this.sortedList[i]; // 현재 삽입될 숫자인 i번째 정수를 key 변수로 복사

    // 현재 정렬된 배열은 i-gap까지이므로 i-gap번째부터 역순으로 조사한다.
    // j 값은 first 이상이어야 하고
    // key 값보다 정렬된 배열에 있는 값이 크면 j번째를 j+gap번째로 이동
    for(j=i-gap; j>=first && this.sortedList[j]>key; j=j-gap){
      this.sortedList[j+gap] = this.sortedList[j]; // 레코드를 gap만큼 오른쪽으로 이동
      this.drawList.push(this.sortedList.slice());
    }

    this.sortedList[j+gap] = key;
    this.drawList.push(this.sortedList.slice());
  }
}
  shellSort(){
    var i,gap;
    for(gap=Math.floor(this.sortedList.length/2);gap >0; gap= Math.floor(gap/2)){
      if((gap%2)==0){
        gap+=1;
      }
      for(i = 0; i <gap;i++){
        this.inc_insertion_sort(i,gap);
      }
    }
    this.disableUI();
  }
  selectionSort(){
    this.swaped= 0;
    var i,j,least,temp;
    for (i = 0; i <this.sortedList.length;i++){
      least = i;
      for(j = i+1; j <this.sortedList.length;j++){
        if(this.sortedList[j] < this.sortedList[least]){
          least = j;
        }
      }
      if(i != least){
        temp = this.sortedList[i];
        this.sortedList[i] = this.sortedList[least];
        this.sortedList[least] = temp;
        this.drawList.push(this.sortedList.slice());
      }

    }
    this.disableUI();
  }

  insertSort(){
    this.swaped = 0;
    var key;
    for(var i = 1; i < this.sortedList.length;i++){
      key = this.sortedList[i];
      for(var j = i-1; j >=0 && this.sortedList[j] >key;j--){
        this.sortedList[j+1] = this.sortedList[j];
        this.drawList.push(this.sortedList.slice());
      }
      this.sortedList[j+1] = key;
      this.drawList.push(this.sortedList.slice());
    }
    console.log(this.sortedList);
    this.disableUI();
  }
  reset(){
    this.drawList = [];
    this.shuffleArray();
    this.initBoard();
    this.enableUI();
  }
  quick(){
    this.swaped = 0;

    this.quickSort(0,this.sortedList.length-1);
    this.disableUI();
  }



  shuffleArray(){
    this.swaped = 0;
    this.sortedList = [];
    for(var i = 0; i < 12; i++){
      this.sortedList.push(Math.floor((Math.random()*70)+30));
    }
  }


  nextButtonClick(){
    if(this.drawList.length == 0){
      this.enableUI();
      return;
    }
    this.swaped +=1;
    this.drawArray(this.drawList[0]);
    this.drawList.splice(0,1);
    if(this.drawList.length == 0){
      this.enableUI();
    }
  }
  quickSort(start,end){
    if (start >=end){
      return;
    }
    var key = start;
    var i = start+1;
    var j = end;
    var temp;
    while(i <= j){
      while(i<= end && this.sortedList[i] <= this.sortedList[key]){
        i+=1;
      }
      while(j > start & this.sortedList[j] >= this.sortedList[key]){
        j-=1;
      }
      if(i > j){
        temp = this.sortedList[j];
        this.sortedList[j] = this.sortedList[key];
        this.sortedList[key] = temp;
        this.drawList.push(this.sortedList.slice());
      }else{
        temp = this.sortedList[i];
        this.sortedList[i] = this.sortedList[j];
        this.sortedList[j] = temp;
        this.drawList.push(this.sortedList.slice());
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
          var temp = this.sortedList[j];
          this.sortedList[j] = this.sortedList[j+1];
          this.sortedList[j+1] = temp;
          this.drawList.push(this.sortedList.slice());
        }
      }
    }
    this.disableUI();
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

  drawArray(x){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = '15px Arial';
    ctx.fillText("교환횟수 : "+this.swaped ,20,30);

    for(var i = 0; i < x.length; i++){
      ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
      var height = x[i];
      var heightPercent = height*3

      ctx.fillRect(50+i*80,80+300-heightPercent,40,heightPercent);
      ctx.fillStyle = "#000";
      ctx.font = '15px Arial';
      ctx.fillText(height,65+i*80,400);
    }

    ctx.closePath();
  }


  initBoard(){
    this.drawArray(this.sortedList);
    return;
  }
    // TODO: 보드 초기화 그리기


}

var k = new Sort();
