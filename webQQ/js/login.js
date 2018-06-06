// 联系人信息类
/**
 * [Group 分组类]
 * @param {[string]} id   [分组ID]
 * @param {[string]} name [分组名称]
 */
function Group(id, name) {
	this.id = id;
	this.name = name;
}

/**
 * [Conts 联系人类]
 * @param {[string]} id   [附属分组ID]
 * @param {[string]} name [联系人昵称]
 */
function Conts(id, name) {
	this.id = id;
	this.name = name;
}
// End 联系人信息类

// 好友信息存储
var aGroup = [
    {id: 1, name: '复仇者联盟'},
    {id: 2, name: '西天取经'},
    {id: 3, name: '传一打狗队'},
    {id: 4, name: '梁山好汉'}
];

var aFriend = [
    {id: 1, name: '绿巨人'},
    {id: 1, name: '黑寡妇'},
    {id: 1, name: '钢铁侠'},
    {id: 1, name: '雷神'},
    {id: 1, name: '蜘蛛侠'},
    {id: 1, name: '神奇博士'},
    {id: 2, name: '孙悟空'},
    {id: 2, name: '唐僧'},
    {id: 2, name: '沙悟净'},
    {id: 2, name: '猪八戒'},
    {id: 3, name: '林春通'},
    {id: 3, name: '陈建川'},
    {id: 3, name: '陈建峰'},
    {id: 3, name: '王海龙'},
    {id: 3, name: '邵婷婷'},
    {id: 3, name: '罗岚'},
    {id: 4, name: '李逵'},
    {id: 4, name: '林冲'},
    {id: 4, name: '吴用'},
    {id: 4, name: '宋江'},
    {id: 4, name: '武松'},
    {id: 4, name: '时迁'}
];
// End好友信息存储

var oRemG = {};
var oRemC = {};
// 信息删除操作存储
var Top = 60;
var Left = 60;

// 联系人列表打印
function showContacts() {
	aGroup = localStorage.hx180310QQaGroup ? JSON.parse(localStorage.hx180310QQaGroup) : aGroup;
	aFriend = localStorage.hx180310QQaFriend ? JSON.parse(localStorage.hx180310QQaFriend) : aFriend;
	// 获取本地存储好友分组

	var oShow = $('#contactShow');
	$('#contactShow').html('');//清空联系人列表

	//打印联系人分组
	$.each(aGroup, function(index, item) {
		var olist_G = $('<li class="list-group"></li>');
		var otitle = $('<div class="groupTitle"></div>').text(item.name);
		var oCont_G = $('<ul class="groupFriend"></ul>');

		olist_G.append(otitle);

		// 向分组节点追加联系人
		$.each(aFriend, function(index2, item2) {
			if (item2.id == item.id) {
				var oCont_list = $('<li class="list-item"></li>');
				var oCont_img = $('<img src="images/logo.png" alt="" class="Friend-head" />');
				var oCont_name = $('<span class="Friend-name"></span>').text(item2.name);

				// 联系人右键选项
				oCont_list.on({
					'contextmenu': function(e) {
						var e = e || window.Event;
						var target = e.target || e.srcElement;

						e.preventDefault();

						$('.main-contacts').css({
							'top': e.pageY,
							'left': e.pageX,
							'display': 'block'
						});

						oRemC = oCont_list;
					},
					'dblclick': function(e) {
						var aH1 = $('.Msg-head h1');

						for (var i = 0; i < aH1.length; i++) {
							if (aH1[i].innerText == item2.name) {
								return;
							}
						}

						Top += 20;
						Left += 20;

						var oMchat = new MsgChat(item2.name, Top, Left);
					}
				});

				oCont_list.append(oCont_img);
				oCont_list.append(oCont_name);
				oCont_G.append(oCont_list);

			}
		});

		olist_G.append(oCont_G);
		oShow.append(olist_G);

		// 分组点击展开联系人列表
		$(otitle).on({
			'click': function() {
				$(oCont_G).slideToggle(100);
	
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}
				else {
					$(this).addClass('active');
				}
			},
			'contextmenu': function(e) {
				e.preventDefault();

				$('.main-list').css({
					'top': e.pageY,
					'left': e.pageX,
					'display': 'block'
				});

				oRemG = olist_G;//将分组对象存储于变量
			}
		});

	});
}

showContacts();

// End 联系人列表打印

// 分组子菜单功能
$('.main-list').on('click', function(e) {
	var e = e || window.Event;
	var target = e.target || e.srcElement;
	/*兼容IE*/

	var oItem = $(oRemG.children('div'));
	console.log(oItem.text());

	if (target.innerText == '添加分组') {
		var add = prompt('请输入分组名');

		if (add != null && add) {
			var oGlast = aGroup[aGroup.length - 1].id;
			oGlast++;
			var oGroup = new Group(oGlast, add);
			console.log(oGlast);

			aGroup.push(oGroup);
			localStorage.hx180310QQaGroup = JSON.stringify(aGroup);
			$(this).hide();
			showContacts();
			//添加联系人更新于本地存储并重新打印联系人信息
		}
		else {
			$(this).hide();
		}
	}

	if (target.innerText == '添加联系人') {
		var add = prompt('请输入联系人名');

		if (add != null && add) {
			$.each(aGroup, function(index4, item4) {
				if (item4.name == oItem.text()) {
					var oCont = new Conts(item4.id, add);

					aFriend.push(oCont);

					localStorage.hx180310QQaFriend = JSON.stringify(aFriend);//更新本地存储
					$('.main-list').hide();
					showContacts();
					return false;
				}
			});
		}
	}

	if (target.innerText == '删除分组') {
		console.log('删除分组');

		if (confirm('选定的分组将被删除，组内联系人也将删除。\n您确定要删除该分组吗？')) {
			$.each(aGroup, function(index3, item3) {
				if (item3.name == oItem.text()) {
					aGroup.splice(index3, 1);//删除对应分组名称数组项

					for (var i = 0; i < aFriend.length; i++) {
						if (item3.id == aFriend[i].id) {
							aFriend.splice(i--, 1);
						}
					}//遍历删除对应分组联系人

					localStorage.hx180310QQaFriend = JSON.stringify(aFriend);//本地存储刷新删除操作后的联系人数组
					localStorage.hx180310QQaGroup = JSON.stringify(aGroup);//本地存储刷新删除后的数组
					return false;
				}
			});

			oRemG.remove();//删除分组对象
			$(this).hide();
		}
		else {
			$(this).hide();
		}
	}
});

$('.main-contacts li:eq(0)').on('click', function(e) {
	var oItem = $(oRemC).children('span');
	var oDele = confirm('确定要删除该联好友？');

	if (oDele) {
		$.each(aFriend, function(index5, item5) {
			if (item5.name == oItem.text()) {
				aFriend.splice(index5, 1);

				localStorage.hx180310QQaFriend = JSON.stringify(aFriend);//更新本地存储联系人数组

				oRemC.remove();

				$('.main-contacts').hide();

				return false;
			}
		});
	}
})


// 子菜单功能
$('.mainB').on('click', function(e) {
	var e = e || window.Event;
	var target = e.target || e.srcElement;

	if (target.innerText == '退出') {
		$(this).css('display', 'none');
	}
});

// 聊天框封装

var zIndex = 10;

/**
 * [MsgChat 聊天框]
 * @param {[string]} ConName [对话人昵称]
 * @param {[number]} top     [顶部定位距离]
 * @param {[number]} left    [左侧定位距离]
 */
function MsgChat(ConName, top, left) {
	var self = this;
	this.oChat = $('<div class="Msg-chat"></div>');//聊天弹窗
	this.oHead = $('<header class="Msg-head"></header>');//聊天窗头部
	this.oBody = $('<div class="Msg-body"></div>');//聊天信息展示区
	this.oFoot = $('<footer class="Msg-footer"></footer>');//聊天窗底部输入操作区
	this.oInpDiv = $('<div class="inpArea" contenteditable="true"></div>');//输入框
	this.oFace = $('<div class="face"></div>');//表情标签
	this.oBtnS = $('<button>发送</button>');//发送按钮
	this.oBtl = $('<div class="btn-l"><span></span></div>');
	this.oH1 = $('<h1></h1>').text(ConName);
	this.oClos = $('<button class="btn-r"><span>关闭</span></button>');//关闭按钮
	this.oFaceU = $('<ul></ul>');//表情容器
	this.oFsPan = $('<span></span>');//表情按钮

	for (var i = 1; i <= 75; i++) {//表情标签遍历插入
		this.oFaceLi = $('<li></li>');
		this.oFaImg = $('<img src="" alt="" />').attr('src','images/' + i + '.gif');

		this.oFaceLi.append(this.oFaImg);
		this.oFaceU.append(this.oFaceLi).on('click', function(e) {
			e.preventDefault();
		});

		this.oFaImg.on('click', function(e) {
			$(this).clone().appendTo(self.oInpDiv);//选中表情点击复制进聊天输入框
		})
	}

	this.oFace.append(this.oFsPan).on('click', function(e) {
		self.oFaceU.slideToggle(100);
	});

	this.oHead.append(this.oBtl, this.oH1, this.oClos);

	this.oFoot.append(this.oFace, this.oInpDiv, this.oBtnS, this.oFaceU);

	this.oChat.append(this.oHead, this.oBody, this.oFoot);

	this.oChat.css({
		'top': top + 'px',
		'left': left + 'px'
	});
	/*this.oChat[0].clientTop = top;
	this.oChat[0].clientLeft = left;*/

	// 信息发送功能
	this.oBtnS.on('click', function(e) {
		var oP = $('<pre></pre>');
		if (self.oInpDiv.html()) {
			oP.html(self.oInpDiv.html());
			self.oBody.append(oP);
			self.oInpDiv.html('');
		}

		console.log(e);
	});

	$(document).on('keydown', function(e) {
		var e = e || window.Event;
		// IE
		var oP = $('<pre></pre>');

		if (self.oInpDiv.is(':focus') && e.ctrlKey && e.keyCode == 13 && self.oInpDiv.text()) {
			oP.html(self.oInpDiv.html());
			self.oBody.append(oP);
			self.oInpDiv.html('');
		}
	})

	// 鼠标拖拽
	self.oChat.on('mousedown', function(e) {
		zIndex++;

		$(this).css('z-index', zIndex);
	});
	this.oHead.on('mousedown', function(e) {//聊天窗头部拖拽
		var ChatX = e.clientX - self.oChat[0].offsetLeft;
		var ChatY = e.clientY - self.oChat[0].offsetTop;

		zIndex++;

		self.oChat.css('z-index', zIndex);

		$(this).on('mousemove', function(e) {

			self.oChat.css({
				'top': e.clientY - ChatY + 'px',
				'left': e.clientX - ChatX + 'px'
			});

		});
		$(this).on('mouseup mouseout', function(e) {
			$(this).off('mousemove');
		});
	});

	//消息框关闭功能
	$(this.oClos).on('click', function() {
		self.oChat.remove();
	})

	$('.Msg-container').append(this.oChat);
}

console.log($('.panelBody > div'), $('.panelFooter ul > li'))

// 选项卡切换

$('.panelFooter ul > li').on('click', function(e) {
	var e = e || window.Event;
	var self = this;

	$.each($('.panelFooter ul > li'), function(index, item) {//遍历选项修改当前样式
		$(item).removeClass('selected');
	});

	$.each($('.panelBody > div'), function(index2, item2) {//遍历隐藏显示选项菜单
		if ($(self).index() == index2) {//判断选项列表下标和点击选项相匹配
			$(item2).show();
		}
		else {
			$(item2).hide();
		}
	});

	$(this).addClass('selected');
});
