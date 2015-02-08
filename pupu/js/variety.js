var preload;//预加载

var canvas;
var context;

var foodImageList;
var foodInfo;//所有食物信息
var tower;//所有酶信息
var dietInfo;//所有匹配信息

var imgList;//食物即时信息
var infoList;//搭配是否合理的信息（food A id,food B id,value,reason）
var towerlist;//酶列表
var itemlist;//food item列表



var pause = false;//判断游戏是否暂停
var gameOver = false;
var isGameStart=false;
var isDivEnzymeShowed = false;
var isDivEnzymeClicked = false;

var plusInfo = {"flag":false,"x":0,"y":0};

var map = P_getMap();
var mapNum = P_getMapNum();
var roadSize = P_getRoadSize();

var i_enzymeInMap;
var rankLevel = 10;

var attackCounter;//攻击间隔计数器
var attack;//攻击类的实例

var itemGap=0;
var remainingItem=0;



var value = 0;//当前食物搭配的总分（该轮得分上限）
var itemBonus = 10;//每个food item的奖励营养值
var itemHp = 100;//每个food item的营养值
var initHp=50;//最大Hp


var itemNum;//计算出的food item个数
var health=50;//玩家生命值
var max = 0;//玩家最高得分


var PooPooFrameCounter = 0;
var PooPooImgIndex = 0;

var imgTower;
var imgPooPoo;
var imgPause;
var imgSound;
var imgAim;
var imgHpBar;//血条
var imgHpBase;//血条框架





var judge;//存取食物匹配信息（有权值的邻接矩阵）

//var road;


