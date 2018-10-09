var $ = require('jquery');
var inf={
    Public(title,content,mode,data,callback){

        $.post(
            '/inf/post',
            {
                title:title,
                content:content,
                mode:mode,
                place:data.place,
                date:data.date
            },
            function(data,status){
                if(data == '0')
                {
                    //showerror();
                    callback(false);
                }else{
                    //window.localStorage.loggedin = true;
                    callback(true);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    },Getreply(threadid,callback){

        $.post(
            '/inf/getreply',
            {
                threadid:threadid
            },
            function(data,status){
                if(data == '0')
                {
                    //showerror();
                    callback(false);
                }else{
                    //window.localStorage.loggedin = true;
                    callback(true,data);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    },Postreply(threadid,content,callback){

        $.post(
            '/inf/postreply',
            {
                threadid:threadid,
                content:content
            },
            function(data,status){
                if(data == '0')
                {
                    //showerror();
                    callback(false);
                }else{
                    //window.localStorage.loggedin = true;
                    callback(true,data);
                    //browserHistory.push('/');
                    //window.navigate("/");
                }
            }
        );
    },
    findinfbyname(name,callback)
    {
        $.post(
            '/inf/findbyname',
            {
                name:name
            },
            function(data){

                if(data == '0')
                {
                    callback(true);
                }else{
                    callback(false,data);
                }
            }
        );
    }
    ,
    Get(id,callback){

        $.post(
            '/inf/get',
            {
                id:id
            },
            function(data){

                if(data == '0')
                {
                    callback(true);
                }else{
                    callback(false,data);
                }
            }
        );
    }
    ,
    Getnew(num,index,callback){

        $.post(
            '/inf/getnew',
            {
                num:num,
                index:index
            },
            function(data,status){

                if(data == '0')
                {
                    callback(false);
                }else{
                    callback(true,data);
                }
            }
        );
    }


    }

module.exports = inf;