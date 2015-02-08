

function init()
{
	//预加载图片及音频资源
    preload = loadResources();   

    //初始化按钮(图片、点击事件）
    P_initBtn();

    //初始化主菜单界面
    P_initMainMenu();

    //初始化选择食物搭配部分
    P_initDietChoosing();

    //初始化塔防部分
    P_initGame();
    

}

function P_initMainMenu(){
	P_changeScene("MainMenu");
}

function P_initDietChoosing(){
	

	foodImageList = P_getFoodImageList();
	infoList = new Array();
	foodInfo = P_getFoodInfo();
	imgList = new Array();
	
	var td;
	for (var j = 0; j < 3; j++) {
		//imgList = foodImageList;

		imgList.push(P_getColumnByState(j+1));

		for (var i = 0; i < imgList[j].length; i++) {

			td = '<td><p style="color:#FFFFFF">'+foodInfo[imgList[j][i].id].name+'</p><br><img id="'+imgList[j][i].id+'" src="'+foodImageList[imgList[j][i].id].src+'" class="'+j+'" /></td>';
			//td = '<td><p style="color:#FFFFFF">'+foodInfo[imgList[j][i].id].name+'</p><br><img onclick="function(){alert(this.innerHTML);};" id="'+imgList[j][i].id+'" src="'+foodImageList[imgList[j][i].id].src+'"><p>abcd</p></img></td>';
			
			// <td><p style="color:#FFFFFF">name</p><br><img onclick="function(){alert(this.innerHTML);}" id="0" src="..." class="0"></img></td>

			switch(j){
				case 0:
					$("#breakfast").append(td);	
					break;
				case 1:
					$("#lunch").append(td);	
					break;
				case 2:
					$("#supper").append(td);	
					break;
				default:
					alert("遍历刷食物图片异常！");
			}
		}
	}
	P_judgeInstall();
}

function P_initGame(){
	canvas=document.getElementById("gameCanvas");
    context=canvas.getContext("2d");
	
	selectedFoodList = new Array();
	towerlist = new Array();
	itemlist = new Array();

	map = P_getMap();
	mapNum = P_getMapNum();
}