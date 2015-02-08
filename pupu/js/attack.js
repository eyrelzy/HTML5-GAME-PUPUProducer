function P_initAttackInterval(){//初始化攻击间隔
	attackCounter = new Array(towerlist.length);
	for(var i = 0;i < attackCounter.length;i++)
	{
		attackCounter[i] = 0;
	}
}

function P_attackManager(){//实际的实施攻击
	attack = new P_attacker();
	setInterval(P_attack,1000/60);
}

function P_attacker(){//攻击类
	this.P_attack = function(){//攻击类的构造函数
		
		for(var i = 0;i < towerlist.length;i++)//遍历所有已布置的酶
		{
			if(attackCounter[i] == 0)
			{
				var a = {"x":towerlist[i].x - tower[towerlist[i].id].range * roadSize,"y":towerlist[i].y - tower[towerlist[i].id].range * roadSize};
				var b = {"x":towerlist[i].x - tower[towerlist[i].id].range * roadSize,"y":towerlist[i].y + (tower[towerlist[i].id].range + 1) * roadSize};
				var c = {"x":towerlist[i].x + (tower[towerlist[i].id].range + 1) * roadSize,"y":towerlist[i].y - tower[towerlist[i].id].range * roadSize};
				var d = {"x":towerlist[i].x + (tower[towerlist[i].id].range + 1) * roadSize,"y":towerlist[i].y + (tower[towerlist[i].id].range + 1) * roadSize};
				for(var j = 0;j < itemlist.length;j++)
				{
					var e = {"x":itemlist[j].x,"y":itemlist[j].y};
					var f = {"x":itemlist[j].x,"y":itemlist[j].y + roadSize};
					var g = {"x":itemlist[j].x + roadSize,"y":itemlist[j].y};
					var h = {"x":itemlist[j].x + roadSize,"y":itemlist[j].y + roadSize}; 
					if(itemlist[j].hp > 0 && itemlist[j].gate && ((e.x < d.x && e.y < d.y && e.x > a.x && e.y > a.y) || (f.x < c.x && f.y > c.y && f.x > b.x && f.y < b.y) || (g.x > b.x && g.y < b.y && g.x < c.x && g.y > c.y) || (h.x > a.x && h.y > a.y && h.x < d.x && h.y < d.y)))
					{
						itemlist[j].setHp(itemlist[j].hp - tower[towerlist[i].id].atk);

						if(itemlist[j].hp <= 0)
						{
							health += itemlist[j].bonus;
						}
						attackCounter[i] = 1;
						if(towerlist[i].id != 3 && towerlist[i].id != 4)
						{
							break;
						}
					}
				}
			}
			if(attackCounter[i] > 0)
			{
				attackCounter[i] = (attackCounter[i] + 1) % tower[towerlist[i].id].af;
			}
		}
	}
}

function P_attack(){
	if(pause||gameOver)
	{
		return;
	}
	attack.P_attack();
}

