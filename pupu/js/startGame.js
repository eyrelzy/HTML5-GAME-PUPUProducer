function P_startGame()//初始化队列，刷食物，造塔
{
	//alert("开始游戏");
    //imgTower = preload.getResult("tower");
    imgPooPoo = preload.getResult("smile");
    imgPause = preload.getResult("pause");
    
    imgAim = preload.getResult("choosetrackbox");
    imgHpBar=preload.getResult("hpBar");
  	imgHpBase=preload.getResult("hpBase");

  	if(createjs.Sound.getMute())
  		imgSound = preload.getResult("off");
  	else
  		imgSound = preload.getResult("on");
	//var c = new food(10,10);
	var u = 100;//测试怪物血条
	var i = 0;
	var q = 0;

	var j = 0;
	var k = 0;
	
	tower = P_getEnzymeInfo();
   	P_initAttackInterval();
  	P_attackManager();

  	context.clearRect(0,0,canvas.width,canvas.height);


	context.drawImage(imgPause,1050,0,70,70);

	drawTower(towerlist);

	drawPooPoo(imgPooPoo,10);//Poo Poo动画效果

		

	function perFrame()//每帧执行函数
	{
		context.clearRect(0,0,canvas.width,canvas.height);

		P_changePoo();
		P_HpBar();
		P_HpNum();

		context.drawImage(imgPause,1050,0,70,70);
		context.drawImage(imgSound,980,0,70,70);

		
		drawPooPoo(imgPooPoo,10);//Poo Poo动画效果
		if(pause)//若暂停，停止刷新
		{
			context.clearRect(360,87,400,478);
			//context.drawRect(600,90,400,478);
			return;
		}
		if(gameOver)
		{
			context.clearRect(0,0,canvas.width,canvas.height);
			drawPooPoo(imgPooPoo,10);//Poo Poo动画效果
			P_HpBar();
			P_HpNum();
			return;
		}
		

		//若游戏未暂停
		drawTower(towerlist);

		



		if(plusInfo.flag){
			context.drawImage(imgAim,plusInfo.x,plusInfo.y,roadSize,roadSize);
		}

		itemGap++;
		if(itemGap>=140)//出食物，每隔itemGap帧出一个食物；速度 每帧走多少像素；roadSize
		{
			if(remainingItem<itemlist.length)//q为已经出现的食物数
			{
				if(!itemlist[remainingItem].die){
					itemlist[remainingItem].draw();
				}
				remainingItem++;
			}
			itemGap=0;
		}
		for(k=0;k<remainingItem;k++)//刷食物
		{
			if(!itemlist[k].die){
				itemlist[k].draw();
			}
		}

		if(health<=0){
			//alert("死亡,游戏结束！");
			gameOver = true;
			P_finish();
			return;
		}

		//gameOver = true;
		for (var i = 0; i < itemlist.length; i++) {
			gameOver = true;
			if(!itemlist[i].die){
				gameOver = false;
				break;
			}
		}
		/*for (var i = 0; i < itemlist.length; i++) {
			if(itemlist[i].die){
				remainingItem--;
			}
		}
		if(remainingItem==0)
		{
			gameOver=true;
		}*/
		if(gameOver){
			//alert("怪全部死亡，玩家胜利！");
			P_finish();
		}
	}
	
  	
	setInterval(perFrame,1000/60);
	
}
