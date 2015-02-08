function P_changeScene(scene){//切换场景
  
  if(scene == "MainMenu"){
    $("#mainMenu").show();
    $("#dietChoosing").hide();
    $("#game").hide();
    $("#result").hide();
    $("#analysis").hide();
    $("#divTutor").hide();

  }
  if(scene == "DietChoosing"){
    $("#mainMenu").hide();
    $("#dietChoosing").show();
    $("#game").hide();
    $("#result").hide();
    $("#analysis").hide();
    $("#divTutor").hide();
  }
  if(scene == "Game"){
    $("#mainMenu").hide();
    $("#dietChoosing").hide();
    $("#game").fadeIn(3500);
    $("#result").hide();
    $("#analysis").hide();
    $("#divTutor").hide();
    createjs.Sound.stop();
    createjs.Sound.play("bgdAudio1","createjs.Sound.INTERRUPT_ANY",0,0,-1,1,0);
  }
  
  if(scene == "Result"){
    $("#mainMenu").hide();
    $("#dietChoosing").hide();
    $("#game").hide();
    $("#result").show();
    $("#analysis").show();
    $("#divTutor").hide();
  }

  if(scene == "Tutor"){
    $("#mainMenu").hide();
    $("#dietChoosing").hide();
    $("#game").hide();
    $("#result").hide();
    $("#analysis").show();
    $("#divTutor").show();
  }
  createjs.Sound.play("changeScene");
}

function P_onCanvas(event)
{
    if(pause || gameOver)
    {
      return;
    }
    
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;

    var a = x;
    var b = y;

    var h = $("#gameCanvas").height();

    //alert(h);
    
    var dPosition = $("#gameCanvas").position();
    var dx = dPosition.left;//画布到浏览器左端距离
    var dy = dPosition.top;//画布到浏览器顶端距离

    //在画布内的相对偏移量
    x -= dx;
    y -= dy;
    

    //若点击的位置在跑道中

    
      
    var isOnMap = false;
      for(var i=0; i < mapNum; i++)
      {
        if((x>=map[i].x && x < map[i].x + roadSize) && (y >= map[i].y && y < map[i].y + roadSize))
        {
  isOnMap = true;
  if(!isDivEnzymeShowed){
          var isPosOccupied = false;//标记玩家所选择的放置点是否已经有酶
          for(var j = 0; j < towerlist.length; j++)
          {
            if(map[i].x==towerlist[j].x && map[i].y==towerlist[j].y)
            {
              isPosOccupied = true;
              break;
            }
          }
          if(isPosOccupied==false)//若该位置没有酶，则放置酶
          {

            
              i_enzymeInMap = i;
              isDivEnzymeShowed = true;
              if(!towerDirector(x))//若没有超出边界
                $("#enzyme").css({"margin-left":x,"margin-top":y}).show();
              else
                $("#enzyme").css({"margin-left":x-$("#enzyme").width(),"margin-top":y}).show();


          }
        }
  else
  {
    break;
  }
      }
    }
  if(!isOnMap)
  {
    $("#enzyme").hide();
    isDivEnzymeShowed = false;
  }
    //若点击暂停
    if((x>=1050 && x < 1050 + 70) && (y >= 0 && y < 70)){
      if(pause){
        imgPause = preload.getResult("pause");
        context.clearRect(1050,0,70,70);
        context.drawImage(imgPause,1050,0,70,70);
        pause=false;
         $("#pause").hide();
      }
        
      else{
        //imgPause = preload.getResult("image2");
        context.clearRect(1050,0,70,70);
        context.drawImage(imgPause,1050,0,70,70);
        pause = true;
        $("#btnContinue").css({"margin-left":"300px","margin-top":"270px"});
        $("#btnRestart").css({"margin-left":"130px","margin-top":"270px"});
        $("#btnReturnMenu").css({"margin-left":"215px","margin-top":"270px"});
        $("#btnReChoose").css({"margin-left":"45px","margin-top":"270px"});
        $("#pause").show();
      }
      createjs.Sound.play("btnClick");
    }
      //sound
      if((x>=980 && x <1050) && (y >= 0 && y < 70)){
      if(createjs.Sound.getMute()){
        imgSound = preload.getResult("on");
        context.clearRect(980,0,70,70);
        context.drawImage(imgSound,980,0,70,70);
        createjs.Sound.setMute(false);
      }
      else{
        //imgPause = preload.getResult("image2");
        imgSound = preload.getResult("off");
        context.clearRect(980,0,70,70);
        context.drawImage(imgSound,980,0,70,70);
        createjs.Sound.setMute(true);
      }
      createjs.Sound.play("btnClick");
    }
}

function P_overCanvas(event){
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;    

    
   // context.clearRect(0,0,canvas.width,canvas.height);

    var dPosition = $("#gameCanvas").position();
    var dx = dPosition.left;
    var dy = dPosition.top;
    x -= dx;
    y -= dy;

    for(var i=0; i < mapNum; i++)
    {
      //若鼠标的位置在跑道中   
      //alert(map[i].x) ; 
      if((x>=map[i].x && x < map[i].x + roadSize) && (y >= map[i].y && y < map[i].y + roadSize))
      {
        var isPosOccupied1 = false;//标记玩家所选择的放置点是否已经有酶
        for(var j = 0; j < towerlist.length; j++)
        {
          if(map[i].x==towerlist[j].x && map[i].y==towerlist[j].y)
          {
            isPosOccupied1 = true;
            break;
          }
        }
        if(isPosOccupied1==false)//若该位置没有酶，则显示
        {
          // context.drawImage(imgAim,map[i].x,map[i].y,roadSize,roadSize);
          //plusInfo = {"flag":true,"x":map[i].x,"y":map[i].y};
          plusInfo.flag = true;
          plusInfo.x = map[i].x;
          plusInfo.y = map[i].y;

        }
        break;
      }
      else
      {
        //plusInfo = {"flag":false,"x":0,"y":0};
          plusInfo.flag = false;
          plusInfo.x = 0;
          plusInfo.y = 0;
      }
    } 
    //alert("out overCanvas");
}
function P_putEnzyme(id)//放置酶
{   
    isDivEnzymeShowed = false;
    $("#enzyme").hide();
    if(health <= tower[id].cost){
      $("#EnzymeFail").fadeIn("slow");
      setTimeout(function(){
    $("#EnzymeFail").fadeOut("slow");
  },3000);
      return;
    }
    imgTower = preload.getResult("enzyme"+id);
    towerlist.push({"id":id, "x":map[i_enzymeInMap].x, "y":map[i_enzymeInMap].y});
    attackCounter.push(0);
    //context.drawImage(imgTower,map[i].x,map[i].y,roadSize,roadSize);
    context.drawImage(imgTower,map[i_enzymeInMap].x,map[i_enzymeInMap].y,roadSize,roadSize);
          
    health -= tower[id].cost;
    createjs.Sound.play("putEnzyme");

}

function drawPooPoo(img,frameNum){
  if(PooPooFrameCounter==15)//每30帧读精灵图中一张
    {
      if(PooPooImgIndex<frameNum-1)
      {
        PooPooImgIndex++;
      }
      else
      {
        PooPooImgIndex=0;
      }
      PooPooFrameCounter=0;
    }
    else
    {   
      PooPooFrameCounter++;
    }
    //context.clearRect(860,50,140,140);
    context.drawImage(img,PooPooImgIndex*140,0,140,140,860,50,140,140);
}

function drawTower(towerlist){
    for(i=0;i<towerlist.length;i++)//刷塔
    {
      context.drawImage(preload.getResult("enzyme"+towerlist[i].id),towerlist[i].x,towerlist[i].y,roadSize,roadSize);//可做酶动画   
    }
}

function scoreLoader(){
    max = Number(window.localStorage?localStorage.getItem("score"):Cookie.read("score")); 
}

function scoreRefresher(score){
    if(score <= max)
    {
      return false;
    }
    if(window.localStorage)
    {
      localStorage.setItem("score",score);  
    }
    else
    {
      Cookie.write("score",score);
    }
    return true;
}



/*
*20130326 重置函数
*/
function P_restartGame()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    health=50;//食物Item血量
    gameOver = false;
    itemGap=0;
    remainingItem=0;
    rankLevel = 10;
    while(itemlist.length!=0)
    {
      itemlist.shift();
      //alert(itemlist.length)
    }
    while(towerlist.length!=0)
    {
      towerlist.shift();
      //alert(towerlist.length)
    }
    while( infoList.length!=0)
    {
       infoList.shift();
      //alert( attackCounter.length)
    }
    $(".trAnalysis").detach();
    while( attackCounter.length!=0)
    {
       attackCounter.shift();
      //alert( attackCounter.length)
    }
    P_initAttackInterval();
}

function P_judgeInstall(){
  dietInfo = P_getDietInfo();
  judge = new Array(foodInfo.length);
  
  for(var i = 0;i < foodInfo.length;i++)
  {
    judge[i] = new Array(foodInfo.length);
    for(var j = 0;j < foodInfo.length;j++)
    {
      judge[i][j] = 0;
    }
  }
  for(var i = 0;i < dietInfo.length;i++)
  {
    judge[dietInfo[i].begin][dietInfo[i].end] = dietInfo[i].value;
  }
}

function P_calculate(list){
  for(var i = 0;i < list.length;i++)
  {
      var flag = true;
      for(var j = 0;j < list.length;j++)
      {
        value += judge[list[i]][list[j]];
        if (0 != judge[list[i]][list[j]]) {
          infoList.push({"aID":list[i],"bID":list[j],"value":judge[list[i]][list[j]],"reason":P_getReason(list[i],list[j])});
        }
        if(judge[list[i]][list[j]] < 0)
        {
          flag = false;
        }
      }
      if(flag)
      {
        value += foodInfo[list[i]].value;
      }
       else
      {
        value = Math.floor(value / 2);
      }
  }
}

function P_getColumnByState(a){//a为选择参数：1为早餐，2为午餐，3为晚餐

  var temp = new Array();
  for(var i = 0;i < foodInfo.length;i++)
  {
    if(!!(foodInfo[i].state - (foodInfo[i].state >> a << a) >> a - 1))
    {
      temp.push({"id":foodInfo[i].id,"isSelected":false});
    }
  }
  return temp;
}

function P_getSelectedFoodList(){
  var list = new Array();
  for(var i = 0;i < 3;i++)
  {
    var temp = new Array();
    for(var j = 0;j < imgList[i].length;j++)
    {
      if(imgList[i][j].isSelected)
      {
        temp.push(imgList[i][j].id);
      }
    }
    //alert(temp);
    list.push(temp);
  }
  return list;
}

function P_setItemNum(){//5为比例系数
  itemNum = value / itemBonus * 5;
  initHp=health+itemNum*itemBonus;
}

function buttonChainBuild(a){
  return a.slice(0,a.lastIndexOf(".")) + 2 + a.slice(a.lastIndexOf("."),a.length);
}

function buttonChainCancel(a){
  return a.slice(0,a.lastIndexOf(".") - 1) + a.slice(a.lastIndexOf("."),a.length);
}

function P_numberSeperater(a){
  var temp = a;
  var list = new Array();
  while(temp > 0)
  {
    list.push(temp % 10);
    temp = Math.floor(temp / 10);
  }
  while(list.length < 4)
  {
    list.push(0);
  }
  return list;
}

function P_finish(){
  $("#btnRestart").css({"margin-left":"70px","margin-top":"270px"});
  $("#btnReturnMenu").css({"margin-left":"170px","margin-top":"270px"});
  $("#btnReChoose").css({"margin-left":"270px","margin-top":"270px"});
  if(scoreRefresher(health))
  {
    $("#failure").css("background-image","url(./assets/pic/background/newrecord.png)");
    // document.getElementById("failure").src="assets/pic/background/newrecord.png";
    //画一个new
  }
  else
  {
    $("#failure").css("background-image","url(./assets/pic/background/ending.png)");
    //document.getElementById("failure").src="assets/pic/background/ending.png";
  }
  var list = P_numberSeperater(health);
  for (var i = 1; i <= list.length; i++) {
    //alert(list[list.length-i]);
    var src = "assets/pic/number/"+list[list.length-i]+".png";
    document.getElementById(i+"number").src = src; 
  }
  
  $("#1number").css({"margin-left":"250px","margin-top":"-50px"});
  $("#2number").css({"margin-left":"280px","margin-top":"-50px"});
  $("#3number").css({"margin-left":"310px","margin-top":"-50px"});
  $("#4number").css({"margin-left":"340px","margin-top":"-50px"});


  scoreLoader();

  list = P_numberSeperater(max);
  for (var i = 1; i <= list.length; i++) {
    //alert(list[list.length-i]);
    var src = "assets/pic/number/"+list[list.length-i]+".png";
    document.getElementById((i+4)+"number").src = src; 
  }
  
  $("#5number").css({"margin-left":"250px","margin-top":"20px"});
  $("#6number").css({"margin-left":"280px","margin-top":"20px"});
  $("#7number").css({"margin-left":"310px","margin-top":"20px"});
  $("#8number").css({"margin-left":"340px","margin-top":"20px"});
  //alert(max);

  if(0 == health){
    $("#GameOver").fadeIn("slow");

        setTimeout(function(){
      $("#GameOver").fadeOut("slow");
      context.clearRect(0,0,$("#gameCanvas").width(),$("#gameCanvas").height());
      $("#failure").show();
    },3000);    
  }
  else
  {
    //setTimeout(function(){
      $("#failure").show();
      context.clearRect(0,0,$("#gameCanvas").width(),$("#gameCanvas").height());
    //},3000); 
  }

  $("#enzyme").hide();
  
}
/*
*0330 the Hp Line
*/
function P_changePoo()
{
  if(health>=30)
  {
    imgPooPoo = preload.getResult("smile");
  }
  else
  {
    imgPooPoo = preload.getResult("cry");
  }

}
function P_HpBar()
{
  var hpRatio=health/initHp;

  context.drawImage(imgHpBase,0,550,450,80);
  //context.drawImage(imgHpBar,0,500,450,80);
  //context.drawImage(imgHpBar,90,35,450*hpRatio,80,0,500,450*hpRatio,80);
  context.drawImage(imgHpBar,90,35,320*hpRatio,45,90,585,320*hpRatio,45);
}
function P_HpNum()
{
  context.font="40px Verdana";
  // 创建渐变
  //var gradient=context.createLinearGradient(0,0,500,0);
  //gradient.addColorStop("0","yellow");
  //gradient.addColorStop("1.0","red");
  // 用渐变填色
  context.fillStyle="#0000ff";
  context.fillText(health,440,610);
}

function towerDirector(x){
  if(x + $("#enzyme").width() > $("#gameCanvas").width())
  {
    return true;
  }
  else
  {
    return false;
  }
}

function P_resultDisplay()
{
  $("#number1").css({"margin-left":"430px","margin-top":"210px"});
  $("#number2").css({"margin-left":"470px","margin-top":"210px"});
  $("#number3").css({"margin-left":"510px","margin-top":"210px"});
  $("#number4").css({"margin-left":"550px","margin-top":"210px"});

  var list = P_numberSeperater(value);
  for (var i = 1; i <= list.length; i++) {
    //alert(list[list.length-i]);
    var src = "assets/pic/number/"+list[list.length-i]+".png";
    document.getElementById("number"+i).src = src;
 
  }

  //添加饮食搭配合理性分析
  $("#analysis").css({"margin-left":"60px","margin-top":"20px"});

  for (var i = 0; i < infoList.length; i++) {
    tr = '<tr class="trAnalysis"><td><p style="color:#000000">'+foodInfo[infoList[i].aID].name+'</p><br><img src="'+foodImageList[infoList[i].aID].src+'" class="small" /></td><td><p style="color:#000000">'+foodInfo[infoList[i].bID].name+'</p><br><img src="'+foodImageList[infoList[i].bID].src+'" class="small" /></td><td><p style="color:#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+infoList[i].value+'</p></td><td><p style="color:#000000">'+infoList[i].reason+'</p></td></tr>';
    $("#tbodyAnalysis").append(tr);
  };

  //$("#divNumber").attr({"margin-left":"100px","margin-top":"70px"});
  //$("#result").show();
  P_changeScene("Result");
  
  
}

function P_getEnzymeInfoByIndex(index){

    return "名字："+tower[index].name+"，放置酶所消耗的营养值："+tower[index].cost+"，酶的消化力："+tower[index].atk+"，消化间隔："+tower[index].af+"，消化范围："+tower[index].range;
}

function P_getReason(a,b){
  for (var i = 0; i < dietInfo.length; i++) {
      if (dietInfo[i].begin == a && dietInfo[i].end == b) {
        return dietInfo[i].reason;
      };
      
  };
}
