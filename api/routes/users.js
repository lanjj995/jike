var express = require('express');
var UUID = require('uuid');
var md5 = require('md5');

var router = express.Router();
var {transcation,pool} = require('./mysql_config');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/regist',function(req,res) {
  var user = req.body;
  var id = UUID.v1();
  var password = md5(user.password);
  var salt = getSalt();
  var sqls = [{
    sql:"insert into g_user values (?,?,?,?,?)",
    params:[id,user.username,password,user.sex,salt]
  }];
  var p1 = new Promise(function(resolve,reject) {
    pool.query("select username from g_user where username = ?",[user.username],function(err,data){
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
  
  transcation(sqls,function(err,data){
    if (err) {
      console.log(err);
      if (err.code === "ER_WRONG_VALUE_COUNT_ON_ROW") {
      res.send({
        code:'param_incomplete',
        message:"请求参数不完整"
      });
      } else {
        res.send({
          code:'err',
          message:"注册失败"
        });
      }
    } else {
      res.send({
        code:'suucess',
        message:'注册成功',
      });
    }
  })
});

router.post('/login',function(req,res) {
  var user = req.body;
  if (!(user.username || user.passwrod)) {
    res.send({
      code:"param_incomplete",
      message:"请求参数不完整"
    })
  } else {
    pool.query("select username,password,salt from g_user where username = ?",[user.username],function(err,result,filed) {
      if (err) {
        console.log(err);
      } else {
        var queryUser = result[0];
        if (queryUser) {
          if (md5(user.password + queryUser.salt) === queryUser.password) {
            res.send({
              code:"success",
              message:"登陆成功"
            });
          } else {
            res.send({
              code:"account_password_error",
              message:"账号或密码错误"
            })
          }
        } else{
          res.send({
            code:"account_password_error",
            message:"账号或密码错误"
          })
        }
        
      }
    });
  }
});

// 修改密码
router.post('/reset',function(req,res){
  
});

function getSalt (){
  var str = "abcdefghijklmnopqistuvwxyz";
  var salt = ""
  for (var i=0;i<4;i++) {
    salt += str.charAt(Math.floor(Math.random()*26));
  }
  return salt;
}
module.exports = router;
