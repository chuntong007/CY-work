/**
 * [User 创建用户类]
 * @param {[string]} username [昵称]
 * @param {[string]} password [密码]
 * @param {[number]} phonenum [手机号]
 */
function User(username, password, phonenum) {
	this.username = username;
	this.password = password;
	this.phonenum = phonenum;
	this.QQid = function() {
		var result = '';

		while(true) {
			var index = Math.floor(Math.random() * 10);//随机获取十以内整数

			if (result.length > 0 || index != 0) {
				result += index;
				if (result.length >= 9) {
					break;
				}
			}

		}

		return result;
	}
}