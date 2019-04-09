var express = require('express');
var UUID = require('uuid');
var md5 = require('md5');

var router = express.Router();
var {transcation,pool} = require('./mysql_config');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增
router.post('/add',function(req,res) {
    
});

// 删
router.get('/delete',function(req,res) {

});

// 改
router.post('/motify',function(req,res){

});

// 查
router.get('/findAll',function(req,res){

});

module.exports = router;
