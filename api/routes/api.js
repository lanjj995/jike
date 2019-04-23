
var jwt = require("jsonwebtoken");

function verfity (req,res,next){
    var token = req.headers.authorization; 

    if (!token) {
        return res.send({
            code:"param_implement",
            message:"请求参数不完整"
        });
    } 
    jwt.verify(token,"suiyi",function(err,data){
        if (err) {
            return res.send({
                code:"account_token_invalid",
                message:"身份已失效，请重新登陆"
            });
        } else {
            next();
        }
    })
    
}

module.exports = {verfity}