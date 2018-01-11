// sql语句
var sqlMap = {
	// 用户
	user: {
		name: 'SELECT * FROM user_login where user_name = ?'
	},
	regis: {
		regis_data: 'INSERT INTO user_login(user_name,user_password,user_type,user_email,user_phone,user_date) VALUES (?,?,?,?,?,?)',
	},
	zdcx: 'SELECT * FROM user_juminzd where user_name = ?',
	gzbx: 'INSERT INTO ele_gzbx(address,type,date,content) VALUES (?,?,?,?)',
	ly:{
		select: 'SELECT * FROM ele_ly',
		insert: 'INSERT INTO ele_ly(title,type,content,date) VALUES (?,?,?,?)'
	},
	xgmm:{
		update: 'UPDATE user_login SET user_password = ? WHERE user_name = ?',
		updateyue: 'UPDATE user_login SET yue = ? WHERE user_name = ?'
	},
	// 管理员
	admin:{
		login: 'SELECT * FROM admin_login where loginname = ?'
	},
	gonggao:{
		select: 'SELECT * FROM ele_gonggao'
	},
	gzgl:{
		select: 'SELECT * FROM ele_gzbx'
	},
	zd: {
		insert: 'INSERT INTO user_juminzd(user_name,date,yongdian) VALUES (?,?,?)'
	},
	user_jumin_zd: {
		select: 'SELECT * FROM user_juminzd where user_name = ?'
	},
	// 数据管理员
	dataadmin:{
		select: 'SELECT * FROM dataadmin_login where loginname = ?'
	},
	gzbx:{
		update: 'UPDATE ele_gzbx SET progress = ? ,updatetime = ? WHERE id = ? '
	},
	b:{
		select:{
			userlogin:'SELECT * FROM user_login',
			user_jumin_zd:'SELECT * FROM user_juminzd',
			user_gongye_zd:'SELECT * FROM user_gongyezd',
			userrecord:'SELECT * FROM user_record',
		},
		insert:{
			userlogin:'INSERT INTO user_login(user_name,user_password,user_type,user_email,user_phone,user_date) VALUES (?,?,?,?,?,?)',
			user_jumin_zd:'INSERT INTO user_juminzd(user_name,date,gu,feng,ping,yongdian,dianfei) VALUES (?,?,?,?,?,?,?)',
			user_gongye_zd:'INSERT INTO user_gongyezd(user_name,date,yongdian,dianfei) VALUES (?,?,?,?)',
			gonggao:'INSERT INTO ele_gonggao(title,content,date) VALUES (?,?,?)',
			userrecord:'INSERT INTO user_record(user_name,date,dianfei) VALUES (?,?,?)'
		},
		update:{
			userlogin:'UPDATE user_login SET user_name = ?,user_password =?, user_type =?, user_email =?, user_phone =?, user_date = ? WHERE id = ? ',
			user_jumin_zd:'UPDATE user_juminzd SET user_name = ? ,date = ?, yongdian = ? WHERE id = ? ',
		},
		delete:{
			userlogin:'DELETE FROM user_login WHERE id = ?',
			user_jumin_zd:'DELETE FROM user_juminzd WHERE id = ?',
			gonggao:'DELETE FROM ele_gonggao WHERE id = ?',
			ly:'DELETE FROM ele_ly WHERE id = ?',
		}
	}

}
module.exports = sqlMap;