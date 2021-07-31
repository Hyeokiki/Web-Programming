onload="changeColor();"
onclick="guess();"
onclick="replay();"
onclick ="changeImage();"
onclick="removeColorTable();"
onclick="createColorTable();"
 onclick="stopTextColor();"
 onclick="newGame();"
 onclick="guessLetter();"
function pageLoad(){
	var cal = document.getElementById("cal");
	cal.onclick = calc;
	setCTime();
}
function myMove(){
	var elem = document.getElementById("animate");
	var pos = 0;
	var id = setInterval(frame, 5);
	function frame(){
		if(pos ==350){
			clearInterval(id);
		}else{
			pos++;
			elem.style.top = pos +'px';
			elem.style.left = pos + 'px';
		}
	}
}
var id;
function changeColor(){
	id = setInterval(flashText, 1000);
}

function flashText(){
	var elem = document.getElementById("target");
	elem.style.color = (elem.style.color == "red")?"blue":"green";
	elem.style.backgroundColor = (elem.style.backgroundColor == "green")?"yellow":"red";
}
#container{
	width: 400px;
	height: 400px;
	position: relative;
	background-color: yellow;
}

#animate{
	width: 50px;
	height: 50px;
	position: absolute;
	background-color: red;
}
