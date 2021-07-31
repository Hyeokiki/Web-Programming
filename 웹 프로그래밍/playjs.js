window.onload = pageLoad;

function pageLoad(){
	setCTime();
	changeColor();

	var stop = document.getElementById("stop");
	stop.onclick = stopTextColor;

	var cal = document.getElementById("cal");
	cal.onclick = calc;
	
	var gues = document.getElementById("gues");
	gues.onclick = guess;

	var reple = document.getElementById("replay");
	reple.onclick = replay;

	var change = document.getElementById("changeimg");
	change.onclick = changeImage;

	var createColorT = document.getElementById("ctCreate");
	createColorT.onclick = createColorTable;

	var removeColorT = document.getElementById("ctRemove");
	removeColorT.onclick = removeColorTable;

	var moveBox = document.getElementById("moveBox");
	moveBox.onclick = myMove;

	var guessL = document.getElementById("guessbutton");
	guessL.onclick = guessLetter;

	var playHangman = document.getElementById("playHangman");
	playHangman.onclick = newGame;

}

function calc(){
	var x = document.getElementById("x");
	var y = document.getElementById("y");
	var sum = document.getElementById("sum");

	sum.value = parseInt(x.value)+parseInt(y.value);
}

var computerNumber = Math.floor(Math.random()*100+1);
var nGuesses = 0;

function guess() {
	var num = document.getElementById("user");
	var text = document.getElementById("result");
	var hint = document.getElementById("guesses");
	var ans =  document.getElementById("answer");
	ans.value = computerNumber;
	nGuesses++;
	hint.value = nGuesses;
	if(parseInt(num.value) > computerNumber){
		text.value = "낮습니다.";
	}
	else if(parseInt(num.value) < computerNumber){
		text.value = "높습니다.";
	}
	else if(parseInt(num.value) == computerNumber){
		text.value = "정답입니다.";
	}
	else{
		text.value = "숫자를 입력해주세요."
	}
}

function replay() {
	var num = document.getElementById("user");
	var text = document.getElementById("result");
	var hint = document.getElementById("guesses");
	var ans =  document.getElementById("answer");
	nGuesses = 0;
	computerNumber = Math.floor(Math.random()*100+1);
	num.value = null;
	text.value = null;
 	hint.value = null;
 	ans.value = null;
}

function setCTime(){
	var now = new Date();
	var month = (now.getMonth() + 1);
	var monthname;
	switch (month){
		case 1: monthname ="Janurary";
		break;
		case 2: monthname ="February";
		break;
		case 3: monthname ="March";
		break;
		case 4: monthname ="April";
		break;
		case 5: monthname ="May";
		break;
		case 6: monthname ="June";
		break;
		case 7: monthname ="July";
		break;
		case 8: monthname ="August";
		break;
		case 9: monthname ="September";
		break;
		case 10: monthname ="October";
		break;
		case 11: monthname ="November";
		break;
		case 12: monthname ="December";
		break;
	}
	var s = monthname + ',' + now.getDate() + ',' + now.getHours() + ':' + now.getMinutes() + ":" + now.getSeconds();
	document.getElementById('ctime').innerHTML = s;
	setTimeout(setCTime, 1000);
}

function changeImage(){
	var imgname = document.getElementById("image");
	var imgnamearr = imgname.src.split('/');
	var imgfilename = imgnamearr[imgnamearr.length - 1];
	if(imgfilename == "BIBI1.jpg")
		imgname.src = "BIBI2.jpg";
	else
		imgname.src = "BIBI1.jpg";
}

var colorNames = ["maroon","red","orange","yellow","olive","purple","fuchsia","white","lime","green"
,"navy","blue","aqua","teal","black","silver","gray"];

function createColorTable(){
	var colordiv = document.getElementById("colorTable");
	for(var i =0; i<colorNames.length; i++){
		var ndiv = document.createElement("div");
		ndiv.setAttribute("class","ctbox");
		ndiv.innerHTML = colorNames[i];
		ndiv.style.display = "inline-block";
		ndiv.style.width = "60px";
		ndiv.style.padding = "10px";
		ndiv.style.backgroundColor = colorNames[i];
		colordiv.appendChild(ndiv);
	}
}

function removeColorTable(){
	var parent = document.getElementById("colorTable");
	var child = parent.getElementsByClassName("ctbox");
	while(child.length > 0){
		parent.removeChild(child[0]);
	}
}

var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate",
"obsequious", "dissonant", "toady", "idempotent"];

var MAX_GUESSES = 6;

var guesses = "";
var guessCount = MAX_GUESSES;
var word;

function updatePage(){
	var clueString ="";
	for(var i =0;i<word.length;i++){
		var letter = word.charAt(i);
		if(guesses.indexOf(letter)>=0){
			clueString += letter +" ";
		}else{
			clueString += "_ ";
		}
	}
	var clue = document.getElementById("clue");
	clue.innerHTML = clueString;

	var guessArea = document.getElementById("guessstr");
	if(guessCount == 0){
		guessArea.innerHTML = "You lose.";
	}else if(clueString.indexOf("_")<0){
		guessArea.innerHTML = "You win!!!";
	}else{
		guessArea.innerHTML = "Guesses: "+ guesses;
	}
	var image = document.getElementById("hangmanpic");
	image.src = "hangman"+guessCount+".gif";
}

function newGame(){
	var randomIndex = parseInt(Math.random()*POSSIBLE_WORDS.length);
	word = POSSIBLE_WORDS[randomIndex];
	guessCount = MAX_GUESSES;
	guesses = "";
	var guessButton = document.getElementById("guessbutton");
	guessButton.disabled = false;
	updatePage();
}

function guessLetter(){
	var input = document.getElementById("hguess");
	var clue = document.getElementById("clue");
	var letter = input.value;
	if(guessCount == 0 || clue.innerHTML.indexOf("_")<0||
		guesses.indexOf(letter)>=0){
		return;
	}
	guesses += letter;
	if(word.indexOf(letter)<0){
		guessCount--;
	}
	updatePage();
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
	elem.style.color = (elem.style.color == "red")?"blue":"red";
	elem.style.backgroundColor = (elem.style.backgroundColor == "green")?"yellow":"green";
}

function stopTextColor(){
	clearInterval(id);
}