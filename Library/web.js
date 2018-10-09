var request = require('request');


function loginst(stid,stpw,callback){
    var j = request.jar();
    var requestb = request.defaults({jar:j});
    var stid=stid;
    var stpw=stpw;
    requestb.post('http://jwgl.szpt.edu.cn/SzptJwBsII/Secure/login.aspx', {form:
    {ddlUserType:'0',txtLogin:stid,txtPwd:stpw,__EVENTTARGET:'btnLogin'}},function(error,res,body)
    {
        if(res.statusCode == 302)
        {
            requestb.get('http://jwgl.szpt.edu.cn/SzptJwBsII/default.aspx',function(error,res,body)
            {
                callback("2",requestb);

            });
        }else if(res.statusCode == 200)
        {
            callback("0");//密码错误
        }else
        {
            callback("1");//网络错误
        }
        console.log(res.statusCode);

    });
}

module.exports = loginst;