function food(a,b)//food类,a生命值，b奖励得分
{
	this.FULL = roadSize;
	this.x = 0;
	this.y = 0;
	this.height = this.FULL/10;//血条宽度是路宽的十分之一
	this.width = this.FULL;

	this.hp = a;
	this.speed = 1;//速度初设1
	this.bonus = b;
	this.die = false;//标记food item是否死亡
	this.gate = false;//标记food item是否从口腔出来

	//var imgMonster = preload.getResult("monster");
	var imgMonster;
	if(Math.floor((a - 100) / 15) % rankLevel==rankLevel - 1 || rankLevel == 1)
	{
		//initHp += itemBonus;
		this.speed=2;
		//this.bonus*=2;
		imgMonster = preload.getResult("monster1");
		if(rankLevel > 1)rankLevel -= 1;
	}
	else
	{
		imgMonster = preload.getResult("monster2");
	}

	//记录上一个坐标
	var ux = this.x;
	var uy = this.y;
	var uhp = this.hp;

	var step = this.FULL/this.speed;//走一个格需要的帧数
	var next = "right";

	var imgIndex = 0;
	var frameCounter = 0;
	var mapIndex = 0;

	var hpCount=0;
	this.x = map[0].x;
	this.y = map[0].y;


	this.setSpeed=function(s)
	{
		this.speed=s;
	}
	this.setHp=function(h)
	{
		/*context.font="30px Verdana";
		context.fillStyle="red";;
		context.fillText(this.hp-h,this.x+roadSize/2,this.y-20);*/
		hpCount=h-this.hp;
		this.hp=h;
		
	}
	this.getX=function()
	{
		return this.x;
	}
	this.getY=function()
	{
		return this.y;
	}

	this.anime=function(img,frameNum)//food item动画
	{
		if(frameCounter==30)//每30帧读精灵图中一张
		{
			if(imgIndex<frameNum-1)
			{
				imgIndex++;
			}
			else
			{
				imgIndex=0;
			}
			frameCounter=0;
			hpCount=0;
		}
		else
		{		
			frameCounter++;
		}
		if(hpCount!=0)
		{
			context.font="30px Verdana";
			context.fillStyle="red";;
			context.fillText(hpCount,this.x+30,this.y-20);
		}
		context.drawImage(img,imgIndex*70,0,70,70,this.x,this.y,roadSize,roadSize);
	}

	this.direction=function()//判断方向
	{
		
		if(this.x==map[mapIndex].x && this.y==map[mapIndex].y)
		{
			if(mapIndex<mapNum-1)
			{
				if(map[mapIndex].x>map[mapIndex+1].x)
					next="left";
				else if(map[mapIndex].x<map[mapIndex+1].x)
					next="right";
				else if(map[mapIndex].y>map[mapIndex+1].y)
					next="up";
				else if(map[mapIndex].y<map[mapIndex+1].y)
				{
					next="down";
				}
				else
				{
					alert("wrong map");
				}
				mapIndex++;
				//alert(mapIndex);
			}
			else
				next="stop";
		}

	}

	this.move=function(direction)//判断移动
	{
		if(direction=="left")
			this.x=this.x-this.speed;
		else if(direction=="right")
			this.x=this.x+this.speed;
		else if(direction=="up")
			this.y=this.y-this.speed;
		else if(direction=="down")
			this.y=this.y+this.speed;
		else if(direction=="stop")
		{
			if(this.die==false)
			{
				health-=this.bonus;
				if(health<=0){
					//alert("死亡,游戏结束！");
					health = 0;
					gameOver = true;
				}

			}
			this.die=true;
			this.x=this.x;
			this.y=this.y;
			createjs.Sound.play("foodArrive");
		}
		else
		{
			alert("wrong code in the food move");
		}
	}

	this.draw=function()//画
	{
		this.gate=true;
				
		//context.clearRect(ux,uy,this.FULL,this.FULL);
		//context.clearRect(ux,uy-10,(this.width*uhp/a)+1,this.height);		
		

		if(this.hp>0)
		{

			context.fillStyle = '#f00'; 
			
			ux=this.x;
			uy=this.y;
			uhp = this.hp;
			context.fillRect(this.x,this.y-10,this.width*this.hp/a,this.height);

			this.anime(imgMonster,10);



			this.direction();
			this.move(next);
		}
		else
		{
			/*if(this.die==false)
			{
				context.clearRect(ux,uy,this.FULL,this.FULL);
				//context.clearRect(ux,uy-10,this.width*this.hp/a,this.height);
				context.clearRect(ux,uy-10,this.width,this.height);

			}*/
			this.die=true;
			drawTower(towerlist);

		}

	}
}