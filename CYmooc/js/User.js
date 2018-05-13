/**
 * [User 用户信息类（基本类）]
 * @param {[string]} uName     [用户帐号]
 * @param {[string]} uPhon     [用户手机号]
 * @param {[string]} uPswd     [用户密码]
 * @param {[string]} uEmail    [用户邮箱]
 * @param {[number]} uGold     [用户金币余额]
 * @param {[number]} uIntegral [用户当前积分]
 * @param {[number]} uAllInt   [用户历史总积分]
 * @param {[string]} uRank     [用户等级]
 * @param {[Date]} uDate     [用户注册时间]
 */
function User(uName, uPhon, uPswd, uEmail, uGold, uIntegral, uAllInt, uRank, uDate) {
	this.username = uName;
	this.phonenum = uPhon;
	this.password = uPswd;
	this.emailsrc = uEmail;
	this.balance = uGold;
	this.integral = uIntegral;
	this.allintergral = uAllInt;
	this.ranknum = uRank;
	this.userdate = uDate;
}