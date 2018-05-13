/*----------------------首页轮播图功能----------------------*/
var aimgbox = document.getElementById('bannerBox').getElementsByTagName('img');
var aban = document.getElementById('banner');
var ali = document.getElementById('circle').getElementsByTagName('li');
var abtn = document.getElementById('bannerBtn');
/*获取轮播图中的各个对象*/

var pos = 1;//声明轮播图播放顺序初始值变量

function Carousel() {
	if (pos == aimgbox.length || pos < 0) {
		pos = 0;
	}
	/*判断轮播顺序变量值超出轮播对象下标范围进行清零*/

	for (var l = 0; l < ali.length; l++) {
			ali[l].style.background = '#747474';
		}
	ali[pos].style.background = '#fff';
	/*循环遍历轮播下标按钮跟随轮播图跳动进行颜色变化*/

	for (var i = 0; i < aimgbox.length; i++) {
		aimgbox[i].style.display = 'none';
	}
	/*遍历轮播图全部进行隐藏*/

	aimgbox[pos].style.display = 'block';

	pos++;
}

/**
 * [getCarousel 轮播功能调用方法]
 * @param  {[dom]} obj  [调用执行的文档对象]
 * @param  {[function]} func [执行滚动的函数功能]
 * @param  {[number]} time [设置定时器的间隔时间单位：毫秒]
 * @return {[type]}      [description]
 */
function getCarousel(obj, func, time) {
	var int = setInterval(func, time);

	obj.onmouseover = function() {
		clearInterval(int);//为对象添加发生鼠标停留事件时停止走马灯滚动计时
	}
	obj.onmouseout = function() {
		int = setInterval(func, time);//为对象添加发生鼠标离开事件时唤醒走马灯滚动计时变量
	}
}
//将调用唤醒动态滚动的代码功能封装传参设置进行复用减少代码量

getCarousel(aban, Carousel, 1500);



for (var j = 0; j < ali.length; j++) {
	ali[j].index = j;//将当前循环循环变量序号值赋予创建的隐藏属性中
	ali[j].onmousemove = function() {//安装鼠标停留事件，当鼠标停留于下标圆点自动切换对应轮播图
		// this.style.background = '#e21717'
		pos = this.index;//设置轮播顺序变量为当前下标属性的序号值
		Carousel();//执行轮播功能进行图片切换
	}
}
/*遍历轮播下标按钮，给每个按钮设置属性获取下标序号，并给按钮安装点击切换轮播显示功能*/

abtn.onclick = function(e) {
	var event = e || window.event;
	var target = e.target || arguments.srcElement;
	/*兼容ie获取点击事件对象*/

	if (target.className == 'btn-l') {//向后切换按钮
		if (pos == 1) {
			pos = aimgbox.length - 1;
		}//当轮播下标为第一张时向前一张点击切换至轮播图最后一张
		else {
			pos -= 2;//不为零的时候轮播序号减2
		}

		Carousel();
	}//当点击事件触发判断为左侧按钮则轮播序号变量减一并执行轮播图切换
	if (target.className == 'btn-r') {
		Carousel();
	}//当点击事件触发判断为左侧按钮则轮播序号变量减一并执行轮播图切换
}
/*轮播图左右切换点击功能*/

/*----------------------End 首页轮播图功能----------------------*/


/*----------------------首页走马灯功能----------------------*/
var oWind = document.getElementById('worksWindow');
var oWpos = 0;
//获取走马灯滚动对象，声明变量oWpos设定滚动初始left获取值。

function seaCarousel() {//创建走马灯滚动功能
	if (oWpos <= -950) {
		oWpos = 0;
	}//判断滚动对象达到需要初始化滚动值的位置清零

	oWpos--;
	oWind.style.left = oWpos + 'px';
	//滚动值递减并传递给对象修改样式left属性进行滚动
}

getCarousel(oWind, seaCarousel, 15);

/*----------------------End 首页走马灯功能----------------------*/


/*----------------------固定定位模块显示隐藏功能----------------------*/
/*var obody = document.body;//声明变量获取页面body文档对象
var ofix = document.getElementById('FixedColumn');
*/
document.body.onscroll = function(e) {
	var e = e || window.event;
	var target = e.target || arguments.srcElement;
	/*兼容ie事件委托*/

	var oFix = target.all.FixedColumn;
	/*获取浮动广告和表格按钮父级固定定位模块对象*/

	if (e.path[1].scrollY == 0) {
		oFix.style.display = 'none';
	}
	else {
		oFix.style.display = 'block';
	}
	/*判断页面滚轴处于顶部时对固定定位模块进行隐藏，离开则显示*/

}
/*----------------------End 固定定位模块显示隐藏功能----------------------*/