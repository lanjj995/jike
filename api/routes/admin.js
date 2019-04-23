var express = require('express');
var UUID = require('uuid');
var md5 = require('md5');
var router = express.Router();
var {transcation,pool} = require('./mysql_config');
var jwt = require("jsonwebtoken");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// admin登陆
router.post('/login',function(req,res) {
    var user = req.body;
    console.log(user);
    pool.query("select id,username,password,avatar from jk_admin where username = ? and password = ?",[user.username,user.password],function(err,data) {
        if (err) {
            res.send({
                code:"err",
                message:"登陆失败"
            });
        } else {
            var user = data[0];
            if (data[0]) {
                var content = {name:req.body.username};
                var secret = "suiyi";
                var token = jwt.sign(content,secret,{expiresIn:60*1});
                res.send({
                    code:"success",
                    data:{
                        user:{
                            username:user.username,
                            avatar:user.avatar,
                        },
                        token:token
                    }
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