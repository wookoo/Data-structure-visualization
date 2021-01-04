function addcontrolEntity(type, name) {//컨트롤 패널에 추가
  var element = document.createElement("input"); //요소 생성후

  element.setAttribute("type", type); //요소 속성 지정
  element.setAttribute("value", name);


  var tableEntry = document.createElement("td"); //td 태그 생성하고


  tableEntry.appendChild(element); //td 태그에 생성한 요소 넣고
  var controlBar = document.getElementById("controller");
  controlBar.appendChild(tableEntry);//생성한 요소를 controlBar 에 추가한다
  return element;

}
