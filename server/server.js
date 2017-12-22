var express = require('express');
var app = express();
var mysql  = require('mysql');
// 数据库连接
var models = require('./db');
var connection = mysql.createConnection(models.mysql);
connection.connect();
 
// 读取mapper
var $sql = require('./sqlMap');

// connection.query($sql.user.name, function(err, rows) {
//     user = rows
// });
// app.post('/test',[param.name], function (req, res) {
//     res.send(user);
// });
app.post('/test', (req, res) => {
	var params = req.body;
	console.log(params);
	conn.query($sql.user.name,[params.name], function(err, result) {
		data = result
	})
	res.json(data)
});










connection.end();

 
var server = app.listen(8001, function () {
 
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})



