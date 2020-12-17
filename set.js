function addcontrolEntity(type, name) {

    var element = document.createElement("input");

    element.setAttribute("type", type);
    element.setAttribute("value", name);
//    element.setAttribute("name", name);


	var tableEntry = document.createElement("td");

	tableEntry.appendChild(element);


    var controlBar = document.getElementById("controller");

    //Append the element in page (in span).
    controlBar.appendChild(tableEntry);
	return element;

}
