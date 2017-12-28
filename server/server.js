var express = require('express');
var app = express();
var mysql  = require('mysql');
var router = express.Router();
// 中间件
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 数据库连接
var models = require('./db');
var connection = mysql.createConnection(models.mysql);
// connection.connect();
 
// 读取mapper
var $sql = require('./sqlMap');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( models.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret,sql) {
     if(typeof ret === 'undefined') { 
          res.json({
            code:'-200',
            msg: '操作失败',
            data: ret ,
            sql: sql
        }); 
    } else { 
      res.json(ret); 
  }};
// 添加用户
app.post('/login', function(req, res, next){
 	// 从连接池获取连接 
	pool.getConnection(function(err, connection) { 
	// 获取前台页面传过来的参数  
	 	var param = req.body;   
		// 建立连接 增加一个用户信息 
		connection.query($sql.user.name, param.name, function(err, result) {
	        if(result) {      
	             result = {   
	                code: 200,   
	                msg:'成功',
	                data:result	,
	                param: param
	            };  
	        }     
     	// 以json形式，把操作结果返回给前台页面     
        responseJSON(res, result);   
     	// 释放连接  
       connection.release();  
       });
    });
 });
// 注册
app.post('/regis', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.regis.regis_data, [param.name,param.password,param.identity,param.email,param.phone,param.time], function(err, result) {
	        if(result) {      
	            res.send('注册成功') 
	        }     
        responseJSON(res, result);   
       connection.release();  
       });
    });
 });
// 账户信息
app.post('/zhxx', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.user.name, param.name, function(err, result) {
	        if(result) {      
	             result = {   
	                code: 200,   
	                msg:'成功',
	                data:result	,
	            };  
	        }     
        responseJSON(res, result);   
        connection.release();  
       });
    });
 });
// 账单查询
app.post('/zdcx', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.zdcx, param.name, function(err, result) {
	        if(result) {      
	             result = {   
	                code: 200,   
	                msg:'成功',
	                data:result	,
	            };  
	        }     
        responseJSON(res, result);   
        connection.release();  
       });
    });
 });
// 报修
app.post('/gzbx', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.gzbx, [param.address,param.problem,param.date,param.remark], function(err, result) {
	        if(result) {      
	            res.send('报修成功')  
	        }else{
      		    responseJSON(res, result,$sql.gzbx);   
	        }    
        connection.release();  
       });
    });
 });
// 留言
app.post('/ly', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.ly.insert, [param.title,param.type,param.content,param.date], function(err, result) {
	        if(result) {      
	            res.send('留言成功')  
	        }else{
      		    responseJSON(res, result);   
	        }    
        connection.release();  
       });
    });
 });
// 管理员登陆
app.post('/adminlogin', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.admin.login, param.name, function(err, result) {
	        if(result) {      
	             result = {   
	                code: 200,   
	                msg:'成功',
	                data:result
	            };  
	        }     
        responseJSON(res, result);   
       connection.release();  
       });
    });
 });
//获得公告数据
app.get('/getgonggao', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.gonggao.select, function(err, result) {
	        if(result) {      
	            result = {   
	                code: 200,   
	                msg:'成功',
	                data:result
	            };  
	        }     
        responseJSON(res, result);   
       connection.release();  
       });
    });
 });
// 获得留言数据
app.get('/getly', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.ly.select, function(err, result) {
	        if(result) {      
	            result = {   
	                code: 200,   
	                msg:'成功',
	                data:result
	            };  
	        }     
        responseJSON(res, result);   
       connection.release();  
       });
    });
 });
//获得故障数据
app.get('/getgz', function(req, res, next){
	pool.getConnection(function(err, connection) { 
	 	var param = req.body;   
		connection.query($sql.gzgl.select, function(err, result) {
	        if(result) {      
	            result = {   
	                code: 200,   
	                msg:'成功',
	                data:result
	            };  
	        }     
        responseJSON(res, result);   
       connection.release();  
       });
    });
 });


connection.end();

 
var server = app.listen(8001, function () {
 
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})



