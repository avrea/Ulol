$(document).ready(function () {
	
	var questionBank=new Array;
	var wordArray=new Array;
	var previousGuesses=new Array;
 	var currentWord;
	var currentClue;
	var wrongAnswerCount;
	
 
 
 		$.getJSON('quizbank.json', function(data) { 

		for(i=0;i<data.wordlist.length;i++){ 
			questionBank[i]=new Array;
			questionBank[i][0]=data.wordlist[i].word;
			questionBank[i][1]=data.wordlist[i].clue;
		}
		  
		
		 
		titleScreen();
		})//gtjson
 

 
	
function titleScreen(){
			
	$('#gameContent').append('<div id="mid"><div id="gameTitle" class="shake">uLOL</div><div id="startButton" class="button2 chunky marginTop">Play</div></div>');		
	$('#startButton').on("click",function (){gameScreen()});
			
}//display game
	
	
	
function gameScreen(){
	$('#gameContent').empty();
	$('#gameContent').append('<CENTER><div id="pixHolder"><img id="hangman" src="img/man.png"></div></CENTER>');
	$('#gameContent').append('<CENTER><div id="clueHolder"></div></CENTER>');
	$('#gameContent').append('<div id="midDiv"><div id="wordHolder"></div></div>');
	$('#gameContent').append('<BR><BR><CENTER><div id="guesses"></div></CENTER>');
	$('#gameContent').append('<CENTER><div id="feedback"></div></CENTER>');
	$('#gameContent').append('<form><input type="text" id="dummy" ></form>');
			
	getWord();
	var numberOfTiles=currentWord.length;
	wrongAnswerCount=0;
	previousGuesses=[];
			 
	for(i=0;i<numberOfTiles;i++){
		$('#wordHolder').append('<div class="tile" id=t'+i+'></div>');
	}
			
	$('#clueHolder').append(""+currentClue);
 
	$(document).on("keyup",handleKeyUp);
	$(document).on("click",function(){$('#dummy').focus();});
	$('#dummy').focus();
}//gamescreen
			
			
function getWord(){
	var rnd=Math.floor(Math.random()*questionBank.length);
	currentWord=questionBank[rnd][0];
	currentClue=questionBank[rnd][1];
	questionBank.splice(rnd,1); 
	wordArray=currentWord.split("");			
}//getword
			
function handleKeyUp(event) {
	if(event.keyCode>64 && event.keyCode<91){
		var found=false;
		var previouslyEntered=false;
		var input=String.fromCharCode(event.keyCode).toLowerCase();
				
		for(i=0;i<previousGuesses.length;i++){if(input==previousGuesses[i]){previouslyEntered=true;}}
				
		if(!previouslyEntered){
			previousGuesses.push(input);
				
			for(i=0;i<wordArray.length;i++){
				
				if(input==wordArray[i]){found=true;$('#t'+i).append(input);}	
				
			}//for
				
			if(found){checkAnswer();}
			else{wrongAnswer(input);}
		}//if
	}//if
}//handlekeyup
	
		
function checkAnswer(){
	var currentAnswer="";	
	for(i=0;i<currentWord.length;i++){
		currentAnswer+=($('#t'+i).text());
	}		
	if(currentAnswer==currentWord){
		victoryMessage();
	};
}//checkanswer
		
function wrongAnswer(a){
	wrongAnswerCount++;
	var pos=(wrongAnswerCount*-75) +"px"
	$('#guesses').append("  "+a);
	$('#hangman').css("left",pos);
	if(wrongAnswerCount==6){
		defeatMessage();}
}//wronganswer
		
function victoryMessage(){
	$(document).off("keyup", handleKeyUp);
	$('#feedback').append("<div id='result'><span class='yellow'>&#9733;&#9733;&#9733;&#9733;&#9733;</span><BR>"+ currentWord +" is <BR><H1 class='yellow shake'>CORRECT!</H1></div><div id='replay' class='chunky marginBottom'>Next</div>");
	$('#replay').on("click",function (){
		if(questionBank.length>0){
			gameScreen()}
		else{finalPage()}
	});
}//victory
		
function defeatMessage(){
	$(document).off("keyup", handleKeyUp);
	$('#feedback').append("<br>Answer:<span class='correctAnswer yellow'> "+ currentWord +"</span><H1 class='shake'>uLOL!</H1><IMG SRC='img/crazy.png' CLASS='meme shake'><div id='replay' class='chunky marginBottom'>Next</div>");
	$('#replay').on("click",function (){
		if(questionBank.length>0){
			gameScreen()}
		else{finalPage()}
	});
}//defeat

function finalPage(){
	$('#gameContent').empty();
	$('#gameContent').append('<div id="finalMessage">You have finished all the words in the game!</div>');
}//finalpage
	
	});//doc ready