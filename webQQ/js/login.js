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
				oCont_list.on('contextmenu', function(e) {
					var e = e || window.Event;
					var target = e.target || e.srcElement;

					e.preventDefault();

					$('.main-contacts').css({
						'top': e.pageY,
						'left': e.pageX,
						'display': 'block'
					});

					oRemC = oCont_list;
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
function MsgChat() {}
