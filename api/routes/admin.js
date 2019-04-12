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
    pool.query("select id,username,password from jk_admin where username = ? and password = ?",[user.username,user.password],function(err,data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
});