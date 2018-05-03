/**
 * [User 用户类]
 * @param {[字符串]} uName [用户名]
 * @param {[字符串]} uPhon [手机号]
 * @param {[字符串]} uPswd [密码]
 */
function User(uName, uPhon, uPswd) {//声明一个用来收集用户注册信息的类方便统一调用存储
	this.username = uName;
	this.phonenum = uPhon;
	this.password = uPswd;
}