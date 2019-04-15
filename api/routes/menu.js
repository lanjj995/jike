var express = require('express');

var router = express.Router();
var {transcation,pool} = require('./mysql_config');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list',function(req,res) {
    pool.query(
        `select p.id,p.title,p.icon,p.component,
        s.id sid,s.title stitle,s.icon sicon,s.component scomponent
        from jk_menu p left join jk_menu s
        on p.id = s.parent_id
        where p.parent_id is null`,
        [],
        function(err,data) {
            if (err) {
                console.log(err);
            } else {
                var result = {};
                for (i in data) {
                    var r = data[i];
                    if (result[r.id]) {
                        result[r.id].menus.push({
                            id:r.sid,
                            title:r.stitle,
                            icon:r.sicon,
                            component:r.scomponent,            
                        })
                    } else {
                        result[r.id] = {
                            id:r.id,
                            title:r.title,
                            icon:r.icon,
                            component:r.component,
                            menus:[
                                {
                                    id:r.sid,
                                    title:r.stitle,
                                    icon:r.sicon,
                                    component:r.scomponent,            
                                }
                            ]
                        }
                    }
                }
                var data = [];
                for (r in result){
                    data.push(result[r]);
                }
                res.send({
                    code:"success",
                    data
                });
            }
    })
});

module.exports = router;
