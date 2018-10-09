var crypto = require('crypto');
var inf = require('../models/inf.js');
var express = require('express');
var http = require('http');
var qs= require('querystring');
var router = express.Router();
var user = require('../models/user.js');
var reply =require('../models/reply.js');
router.post('/post', function(req, res, next) {
    if(req.session.user  == null)
    {
        return;
    }


    var data=new Object();
    data.title = req.body.title;
    data.content =req.body.content;
    data.mode=req.body.mode;
    data.username=req.session.user.name;
    data.place=req.body.place;
    data.date=req.body.date;
    Inf=new inf(data);
    Inf.save(function(err,ninf){

        if(err)
        {
            console.log(err);
            res.end('0');
            //req.flash('error',err);
            return;
        }
        //res.end(JSON.stringify(user));
        res.end('1');
        return;

    });

});
router.post('/get',function(req,res,next){
    var id=req.body.id;

    inf.get(id,function(err,data){
        if(err)
        {
            res.end(0);
        }else{
            var rdata=data;
            user.get(req.session.user.name,function(err,data){
				console.log(pic);
				if(typeof pic !="undefined")
				{
					  var pic=JSON.parse(data.pic);
                rdata.pic=pic.responseText;
				}else{
					rdata.pic="";
				}
              
                res.end(JSON.stringify(rdata));
            });

        }
    });
});
router.post('/getnew',function(req,res,next){

    var num=req.body.num;
    var index=req.body.index;
    inf.getnew(num,index,function(err,data){

        if(err)
        {
            res.end('0');
        }else{
            for(var p in data){
                if(data[p].mode == "0")
                {
                    data[p].mode = "帮帮区";
                }else if(data[p].mode == "1"){
                    data[p].mode="约战区";
                }else if(data[p].mode == "2"){
                    data[p].mode="交流区";
                }
                var date = new Date(data[p].pdate);
                data[p].pdate=date.toLocaleTimeString();

            }
            console.log("fuck");
            res.end(JSON.stringify(data));
        }
    });
});

router.post('/getreply',function(req,res,next){
    var threadid=req.body.threadid;

    reply.get(threadid,function(err,data){
        if(err){
            res.end('0');
        }else{
            res.end(JSON.stringify(data));
        }
    });

});
router.post('/findbyname',function(req,res,next){
    var name=req.body.name;

    inf.findbyname(name,function(err,data){
        if(err){
            res.end('0');
        }else{
            for(var p in data){
                if(data[p].mode == "0")
                {
                    data[p].mode = "帮帮区";
                }else if(data[p].mode == "1"){
                    data[p].mode="约战区";
                }else if(data[p].mode == "2"){
                    data[p].mode="交流区";
                }
                var date = new Date(data[p].pdate);
                data[p].pdate=date.toLocaleTimeString();

            }
            res.end(JSON.stringify(data));
        }
    });
});
router.post('/postreply',function(req,res,next){

    var data=new Object();
    data.threadid=req.body.threadid;
    data.content=req.body.content;
    data.username=req.session.user.name;
    var r= new reply(data);


    r.save(function(err,data){

        if(err)
        {
            res.end("0");
        }else{
            var retdata=data;
            //console.log(data.ops[0]);
            inf.get(req.body.threadid,function(ret,data){
            var replynum=data.replynum;
                replynum=replynum+1;
                data.replynum=replynum;
                data.newreply=req.session.user.name;
                //console.log(data);
                inf.update(req.body.threadid,data,function(ret,data){
                    if(!ret){
                        res.end(JSON.stringify(retdata));
                    }else
                    {
                        res.end("0");
                    }
                });
            });
            //res.end("1");
        }
    });
    }
);



module.exports = router;
