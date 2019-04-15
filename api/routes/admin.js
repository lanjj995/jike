var express = require('express');
var UUID = require('uuid');
var md5 = require('md5');

var router = express.Router();
var {transcation,pool} = require('./mysql_config');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// admin登陆
router.post('/login',function(req,res) {
    var user = req.body;
    console.log(req.body);
    pool.query("select id,username,password from jk_admin where username = ? and password = ?",[user.username,user.password],function(err,data) {
        if (err) {
            res.send({
                code:"err",
                message:"登陆失败"
            });
        } else {
            console.log(data);
            if (data[0]) {
                res.send({
                    code:"success",
                    message:"登陆成功"
                });
            } else {
                res.send({
                    code:"account_password_error",
                    message:"账号不存在或密码错误"
                });
            }
        }
    })
});

module.exports = router;