function P_initBtn(){

	$("#btnSound").css("margin-top","560px");
	$("#btnHelp").css({"margin-top":"560px","margin-left":"70px"});
	$("#btnPlay").css({"margin-left":"450px","margin-top":"300px"});
	$("#btnReturn").css("margin-top","-90px");
	//$("#btnReturn").css({"margin-left":"450px","margin-top":"300px"});
	$("#btnEat").css({"margin-left":"910px","margin-top":"-90px"});
	// $("#btnContinue").attr("src","./assets/pic/button/resume.png");
	// $("#btnReturnMenu").attr("src","./assets/pic/button/menu.png");
	// $("#btnRestart").attr("src","./assets/pic/button/replay.png");
	// $("#btnReChoose").attr("src","./assets/pic/button/recipes.png");

	$(".btn").click(function(){
		createjs.Sound.play("btnClick");
		P_clickBtn(this.id);
	})

	$("#game").click(function(){
		P_onCanvas(event);
	})

	$("#gameCanvas").mousemove(function(event){
		P_overCanvas(event);
	})

	$("#imgTutor").click(function(){
		P_onImgTutor();
	})
	
	//$("#game").live("mousemove",P_overCanvas(event));
	$(".0,.1,.2").live("click",function(e){
	//$(".0,.1,.2").live("click",function(e){
		//e.target.src="./assets/pic/1.png";
		//alert(this.className);
		
		this.width = 100;
		this.height = 100;
		P_onFoodImage(e.target);
	})

	$(".0,.1,.2").live("mousemove",function(event){
		var e = event || window.event;
	    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	    var x = e.pageX || e.clientX + scrollX;
	    var y = e.pageY || e.clientY + scrollY;

	    x += 50;
	    y += 50;
	    $("#pInfo").text(foodInfo[this.id].info).css({"word-wrap":"break-word","word-break":"normal"});


	    $("#divInfo").css({background:"#FF8C00",color:"#ffffff",position:"absolute",left:x,top:y,width:"100px"}).show();
	})

	$(".0,.1,.2").live("mouseleave",function(){
		$("#divInfo").hide();
	})

	$(".enzyme").live("click",function(e){
		var index = $(".enzyme").index(this);
		P_putEnzyme(index);

	})


	$(".enzyme").live("mousemove",function(){
		var e = event || window.event;
	    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	    var x = e.pageX || e.clientX + scrollX;
	    var y = e.pageY || e.clientY + scrollY;
	    //x += 50;
	    y += 50;
	    $("#pEnzymeInfo").text(P_getEnzymeInfoByIndex($(".enzyme").index(this))).css({"word-wrap":"break-word","word-break":"normal"});
	    
	    if(x+$("#pEnzymeInfo").width() < $("#gameCanvas").width()  && y+$("#pEnzymeInfo").height() < $("#gameCanvas").height())
	    	$("#divEnzymeInfo").css({background:"#FF8C00",color:"#ffffff",position:"absolute",left:x,top:y,width:"100px"}).show();
	    else
	    	$("#divEnzymeInfo").css({background:"#FF8C00",color:"#ffffff",position:"absolute",left:x,top:y-80-$("#pEnzymeInfo").height(),width:"100px"}).show();

	})
	$(".enzyme").live("mouseleave",function(){
		$("#divEnzymeInfo").hide();
	})

}

function P_clickBtn(id){
	if(id == "btnPlay"){
		P_onBtnPlay(this);
	}
	if(id == "btnSound"){
		P_onBtnSound();
	}
	if(id == "btnHelp"){
		P_onBtnHelp();
	}
	if(id == "btnEat"){
		P_onBtnEat();
	}
	if(id == "btnConfirm"){
		P_onBtnConfirm();
	}
	if(id == "btnReturn"){
		P_onBtnReturn();
	}
	/*
	*20130326
	*/
	if(id == "btnReturnMenu"){
		P_onBtnReturnMenu();
	}
	if(id == "btnContinue"){
		P_onBtnContinue();
	}
	if(id == "btnReChoose"){
		P_onBtnReChoose();
	}
	if(id == "btnRestart"){
		P_onBtnRestart();
	}
}
/*
*20130326
*/

function P_onBtnReturnMenu(){
	pause=true;
	imgPause = preload.getResult("pause");
    $("#pause").hide();
    $("#failure").hide();
	P_changeScene("MainMenu");
	P_restartGame();
	value = 0;
	createjs.Sound.stop();
    createjs.Sound.play("bgdAudio2","createjs.Sound.INTERRUPT_ANY",0,0,-1,1,0);
	P_onBtnSound();
	P_onBtnSound();
}
function P_onBtnContinue(){
    imgPause = preload.getResult("pause");
    context.clearRect(1050,0,70,70);
    context.drawImage(imgPause,1050,0,70,70);
    pause=false;
    $("#pause").hide();
}
function P_onBtnReChoose(){
	pause=true;
	imgPause = preload.getResult("pause");
    $("#pause").hide();
    $("#failure").hide();
	P_changeScene("DietChoosing");
	P_restartGame();
	value = 0;
	createjs.Sound.stop();
    createjs.Sound.play("bgdAudio2","createjs.Sound.INTERRUPT_ANY",0,0,-1,1,0);
}

function P_onBtnRestart(){
	P_changeScene("Game");
	imgPause = preload.getResult("pause");
    context.clearRect(1050,0,70,70);
    context.drawImage(imgPause,1050,0,70,70);
    pause=false;
    $("#pause").hide();
    $("#failure").hide();
    P_restartGame();
    for(var j = 0; j < itemNum; j++)
    {
      itemlist.push(new food(itemHp+j*15,itemBonus));
    }
}


function P_onBtnSound(){
	if(createjs.Sound.getMute()){
			$("#btnSound").css("background-image","url(./assets/pic/button/on.png)");
		createjs.Sound.setMute(false);
		//document.getElementById("btnSound").URL="assets/pic/button/off.png";
	}
		
	else{
		$("#btnSound").css("background-image","url(./assets/pic/button/off.png)");
		createjs.Sound.setMute(true);
		//document.getElementById("btnSound").URL="assets/pic/button/off.png";
	}			
}

function P_onBtnHelp(){
	//alert("点击了新手教程！");
	P_changeScene("Tutor");
}

function P_onImgTutor(){
	var a  = document.getElementById("imgTutor").src;
	var p = a.lastIndexOf('.');
	var i = Number(a.slice(p-1,p));
	if(4 == i){
		P_changeScene("MainMenu");
		document.getElementById("imgTutor").src = "assets/pic/tutor/1.png"
	}
	else{
		i++;
		document.getElementById("imgTutor").src = a.slice(0,p-1) + i + a.slice(p,a.length);
	}
		
}

function P_onBtnPlay(){
	P_changeScene("DietChoosing");
}

function P_onBtnEat(){
	var selectedFoodList = P_getSelectedFoodList();
	
	for(var i = 0;i < 3;i++)
	{
		//alert(selectedFoodList[i]);
		P_calculate(selectedFoodList[i]);
	}
	//alert(value);
	P_setItemNum();

	//P_changeScene("Game");
	//P_startGame();
	
	for(var j = 0; j < itemNum; j++)
    {
      itemlist.push(new food(itemHp+j*15,itemBonus));
    }

	//此处显示玩家选择信息并给出得分
	P_resultDisplay();
	
		

}

function P_onBtnConfirm(){
	while( infoList.length!=0)
    {
       infoList.shift();
      //alert( attackCounter.length)
    }
    pause = false;
    $(".trAnalysis").detach();
	// setTimeout(function(){
	//     $("#result").hide();
	//   },3000);
	$("#result").hide();
	if(value <= 0)
	{
		value = 0;
		P_changeScene("DietChoosing");
	}
	else
	{
		P_changeScene("Game");

		if(isGameStart==false)
		{
			P_startGame();
			//setTimeout(P_startGame,1000);
			isGameStart=true;
		}
		else
		{
			//alert("123");
			//setTimeout(null,1000);
		}
	}
}

function P_onBtnReturn(){
	P_changeScene("MainMenu");
		
	//scoreRefresher(30);
	//scoreLoader();
	//alert(max);
}

function P_onFoodImage(target){
//alert(!imgList[Number(target.className)][Number(target.id)].isSelected);
	var i;
	for (i = 0; i < imgList[Number(target.className)].length; i++) {
		if(imgList[Number(target.className)][i].id == Number(target.id))
		{
			break;
		}
	}

	//imgList[Number(target.className)][i].isSelected = !imgList[Number(target.className)][i].isSelected;
	if(imgList[Number(target.className)][i].isSelected){
		target.style.width = "80px";
		target.style.height = "80px";
		imgList[Number(target.className)][i].isSelected = false;
	}
	else{
		target.style.width = "120px";
		target.style.height = "120px";
		imgList[Number(target.className)][i].isSelected = true;
	}


}

function P_overFoodImage(id){
	//alert("465");
}






