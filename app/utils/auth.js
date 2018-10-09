var $ = require('jquery');
var auth={
    login(username,password,mode,callback){
    if(mode == 0)
    {
        $.post(
            '/user/login',
            {
                username:username,
                password:password
            },
            function(data,status){
                if(data == '0')
                {
                    //showerror();
                    callback(false);
                }else{
                    window.localStorage.loggedin = true;
                    callback(true);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    }else{
        $.post(
            '/user/check',
            {
                username:username,
                password:password
            },
            function(data,status){
                if(data == '1' || data == '0')
                {
                    //showerror();
                    callback(false);
                }else{
                    window.localStorage.loggedin = true;
                    callback(true);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    }

    },
    logout(callback)
    {
        $.post(
            '/user/logout',
            {},
            function(data,status){

                window.localStorage.loggedin=false;

                callback(true);

            }
        );
    },loggedIn(callback){

        var loggedin=window.localStorage.loggedin;
       if(loggedin == "true")
       {
           callback(true);
       }else{
           callback(false);
       }
        //return !!localStorage.user;
    },resigter(username,password,email,callback)
    {
        $.post(
            '/user/register',
            {
                username:username,
                password:password,
                email:email
            },
            function(data,status){
                if(data == '0')
                {
                    //showerror();
                    callback(false);

                }else{
                    callback(true);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    },GetMarkTable(year,callback)
    {
        $.post(
            '/user/getmarktable',
            {
                year:year
            },
            function(data,status){
                if(data == '0' || data == "1" || data == "2")
                {
                    callback(true);

                }else{

                    callback(false,data);
                }
            }
        );
    },GetMoney(callback)
    {
        $.post(
            '/user/getmoney',
            {
            },
            function(data,status){
                if(data == '0' || data == "1")
                {
                    //showerror();
                    callback(true,data);

                }else{
                    callback(false,data);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    },GetTimeTable(callback)
    {
        $.post(
            '/user/gettimetable',
            {
            },
            function(data,status){
                if(data == '0' || data == "1")
                {
                    //showerror();
                    callback(true,data);

                }else{
                    callback(false,data);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    },changeinf(piclj,password,callback)
    {
        $.post(
            '/user/changeinf',
            {
                piclj:piclj,
                password:password
            },
            function(data,status){
                if(data == '0')
                {
                    //showerror();
                    callback(false);

                }else{
                    callback(true);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    },bindst(stid,stpw,callback)
    {
        $.post(
            '/user/check',
            {
                stid:stid,
                stpw:stpw
            },
            function(data,status){
                if(data == '0')
                {
                    //showerror();
                    callback(false);

                }else{
                    callback(true);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    },onChange() {}
}
module.exports = auth;