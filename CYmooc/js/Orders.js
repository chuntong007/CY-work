/**
 * [Orders 用户订单类]
 * @param {[string]} cBelong [附属课程]
 * @param {[string]} uBelong [附属用户]
 * @param {[string]} status  [购买状态]
 * @param {[number]} price   [订单价格]
 */
function Orders(cBelong, uBelong, status, price) {
	this.cBelong = cBelong;
	this.uBelong = uBelong;
	this.status = status;
	this.price = price;
	this.date = function() {
		var myTime = new Date();
		var year = myTime.getFullYear();
		var month = myTime.getMonth() + 1;//月份基数为0，遂加一
		var date = myTime.getDate();
		var hours = myTime.getHours();
		var Min = myTime.getMinutes();
		var Sec = myTime.getSeconds();
		var result = '';
		/*单独声明将被输出的年月日时分秒*/

		result = year + '年' + month + '月' + date +　'日' + '/' + hours + ':' + Min + ':' +　Sec;//按日期格式衔接当前调用时间
		return result;//返回
	}
}