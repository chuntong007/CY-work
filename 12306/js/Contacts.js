/**
 * [Contacts 添加联系人类]
 * @param {[string]} cName  [联系人姓名]
 * @param {[number]} cAge   [联系人年龄]
 * @param {[number]} cPhone [联系人手机号]
 * @param {[string]} cSex   [联系人性别]
 * @param {[string]} cBelon [联系人附属的当前帐户名]
 */
function Contacts(cName, cAge, cPhone, cSex, cBelon) {
	this.contname = cName;
	this.contage = cAge;
	this.contphone = cPhone;
	this.contsex = cSex;
	this.contbelong = cBelon;
}