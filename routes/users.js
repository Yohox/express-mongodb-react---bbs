var crypto = require('crypto');
var User = require('../models/user.js');
var express = require('express');
var http = require('http');
var request = require('request');
var qs= require('querystring');
var router = express.Router();
var parse = require('co-busboy');
var multer = require('multer');
var fs = require('fs');
var loginst= require('../Library/web.js');
var path = require('path');
var iconv = require('iconv-lite');
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    // Mimetype stores the file type, set extensions according to filetype
    switch (file.mimetype) {
      case 'image/jpeg':
        ext = '.jpeg';
        break;
      case 'image/png':
        ext = '.png';
        break;
      case 'image/gif':
        ext = '.gif';
        break;
    }

    cb(null, file.originalname.slice(0, 4) + Date.now() + ext);
  }
});
var upload = multer({storage: storage});
/* GET users listing. */
router.post('/logout',function(req,res,next){
  req.session.user = null;
  res.end('ok');
  return;
});
router.post('/getmarktable',function(req,resq,next){
  var stid=req.session.user.stid;
  var stpw=req.session.user.stpw;
  var year=req.body.year;
  if(stid == "" || stpw == "")
  {
    resq.end("2");
    return;
  }
 User.get(req.session.user.name,function(err,data){
	  if(data.marktable != '' && typeof data.marktable != 'undefined')
	  {
		  console.log("读取缓存");
		resq.end(data.marktable);
		return;
		}
		loginst(stid,stpw,function(err,requestb){
    if(err == "0" || err == "1")
    {
        resq.end(err);
        return;
    }
    requestb.post('http://jwgl.szpt.edu.cn/szptjwbsII/Scoreqry.aspx',{form:
    {__EVENTTARGET:"ddlSemester",ddlAcademicYear:year,ddlSemester:'%'}},function(error,res,body)
    {
        //console.log(body);
      var arr = body.toString().split("<tr bgcolor=");
      var tmparr = new Array();
      arr.shift();//网页头
      arr.shift();//表格头
      arr.map(function(t){
        var x=t.match(/<font color="#4A3C8C">(.*?)<\/font>/g);
        for(var key in x){

          x[key]=x[key].replace(/<font color="#4A3C8C">/, "");
          x[key]=x[key].replace(/<\/font>/, "");



        }
        //0学号	1学年 2学期 3课程名	4考试类型 5等级成绩 6学分绩点 7备注 8获得学分 9学时 10课程学分 11修习类别 12成绩类型
        var tmp=new Object();
        tmp.team=x[2];
        tmp.name=x[3];
        tmp.mark=x[5];
        tmp.gradepoint=x[6];
        tmp.getpoint=x[8];
        tmp.studytime=x[9];
        tmp.studymark=x[10];
        tmparr.push(tmp);


      });
	   var data=new Object();
	  data.marktable=JSON.stringify(tmparr);
	    User.update(req.session.user.name,data,function(){});
      resq.end(JSON.stringify(tmparr));
    });

  });
		

		}
		
		);
  
});

router.post('/check',function(req,resx,next)
{
  var j = request.jar();
      var requestb = request.defaults({jar:j});
      var stid=req.body.stid;
      var stpw=req.body.stpw;
      requestb.post('http://jwgl.szpt.edu.cn/SzptJwBsII/Secure/login.aspx', {form:
      {ddlUserType:'0',txtLogin:stid,txtPwd:stpw,__EVENTTARGET:'btnLogin'}},function(error,res,body)
      {
        if(res.statusCode == 302)
        {
          requestb.get('http://jwgl.szpt.edu.cn/SzptJwBsII/default.aspx',function(error,res,body)
          {
            //console.log(body);
            var data=new Object();
            data.stid = stid;
            data.stpw = stpw;
            User.update(req.session.user.name,data,function(err){

              if(err){
                console.log(err);
              }else{
                req.session.user.stid=stid;
                req.session.user.stpw=stpw;
                resx.end('ok');
              }
            });

          });
        }else if(res.statusCode == 200)
        {
          resx.end("0");//密码错误
        }else
        {
          resx.end("1");//网络错误
        }
    console.log(res.statusCode);

  });



});


router.post('/login', function(req, res, next) {

  var username=req.body.username;

  var md5 = crypto.createHash('md5');

  var password = md5.update(req.body.password).digest('hex');

  User.get(username,function(err,user){
    if(!user)
    {
      res.end('0');
      return;
    }

    if(user.password != password){
      res.end('0');
      return;
    }
    req.session.user = user;
    res.end(JSON.stringify(user));
    return;
  });
});
router.post('/changeinf',function(req,res,next){
  var password=req.body.password;
  var piclj=req.body.piclj;

  var data=new Object();
  if(password != '')
  {
    var md5 = crypto.createHash('md5');
    password= md5.update(password).digest('hex');
    data.password=password;
  }
  if(piclj != '')
  {
    data.pic=piclj;
  }

  //console.log(req.session);
  User.update(req.session.user.name,data,function(err){

    if(err){
      console.log(err);
    }
  });
  res.end('ok');

});
router.get('/getpic',function(req,res,next){
  var username=req.session.user.name;

  User.get(username,function(err,user){
    if(!user)
    {
      res.end('0');
      return;
    }

    if(user.pic == ''){
      res.end('');
      return;
    }

    var pic=JSON.parse(user.pic);

    fs.readFile(path.join(__dirname,'/../'+pic.responseText),'binary',function(err,file) {
      if (err)
      {
        console.log(err);
        return;
      }else{
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(file,'binary');
        res.end();
        return;
      }
        }
    );


  });
});
router.get('/getuserpic',function(req,res,next){
  var username=req.query.username;
  if(username == null)
  {
      res.end('0');
  }
  User.get(username,function(err,user){
    if(!user)
    {
      res.end('0');
      return;
    }
    if(user.pic == '')
    {
      res.end('');
      return;
    }
    var pic=JSON.parse(user.pic);

    fs.readFile(path.join(__dirname,'/../'+pic.responseText),'binary',function(err,file) {
          if (err)
          {
            console.log(err);
            return;
          }else{
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.write(file,'binary');
            res.end();
            return;
          }
        }
    );


  });
});
router.post('/gettimetable',function(req,resq,next){
  var j = request.jar();
  var requestb = request.defaults({jar:j});
  //var stid="16240457";
  var stid=req.session.user.stid;
  User.get(req.session.user.name,function(err,data){
	  if(data.timetable != '' && typeof data.timetable != 'undefined')
	  {
		  console.log("读取缓存");
		resq.end(data.timetable);
		return;
	  }
	  requestb.get('http://sic.szpt.edu.cn/timetable/kbcx.php',function(error,res,body){


    if(error)
    {
      resq.end('0');
      return;
    }
    var t=body.match(/id="__VIEWSTATE" value="(.*?)"/);

    if(t == null)
    {
      resq.end('0');
      return;
    }else if(stid == '')
    {
      resq.end('1');
      return;
    }
    var __VIEWSTATE=t[1];
    var t=body.match(/id="__EVENTVALIDATION" value="(.*?)"/);
    var __EVENTVALIDATION=t[1];
    var t=body.match(/color="Firebrick" size="5">(.*?) /);
    var nowweek=t[1];
    var nowweek=nowweek.split('　');
    var nowweek=nowweek[1];
    nowweek=nowweek.match(/-?[1-9]\d*/);
    nowweek=nowweek[0];

    requestb.post('http://sic.szpt.edu.cn/timetable/kbcx.php', {form:
    {__VIEWSTATE:__VIEWSTATE,__VIEWSTATEENCRYPTED:'',__EVENTVALIDATION:__EVENTVALIDATION,txtStudntID:stid,btnStuNo:'按学号查询'}},function(error,res,body)
    {
      var timearr=new Array();
      var tmpbody=body.toString();
      var arr = body.toString().split("\<tr bgcolor=\"White\">");
      arr.shift();
      //0性质 1班级 2课名 3老师 4 辅讲老师 5周次 6地点 7星期 8节次 9星期文本
      arr.map(function(t){
        var x=t.match(/<font color="#330099" size="2">(.*?)<\/font>/g);

        for(var key in x){

          x[key]=x[key].replace(/<font color="#330099" size="2">/, "");
          x[key]=x[key].replace(/<\/font>/, "");

        }

        x[9]=x[7];
        switch(x[7]){
          case '星期一':x[7]=1;break;
          case '星期二':x[7]=2;break;
          case '星期三':x[7]=3;break;
          case '星期四':x[7]=4;break;
          case '星期五':x[7]=5;break;
          case '星期六':x[7]=6;break;
          case '星期日':x[7]=7;break;
        }


        var xsp=x[5].split("，");
        var belong=false;

        xsp.map(function(t){

          var tmpnum=t.split("-");

          if(tmpnum.length == 1)
          {
            var max=t.replace(/周/,"");

            if(parseInt(nowweek) == parseInt(max))
            {

              belong=true;
            }
          }else{
            var min=tmpnum[0];

            var max=tmpnum[1].replace(/周/,"");

            if(parseInt(nowweek) >= parseInt(min) && parseInt(nowweek) <= parseInt(max))
            {

              belong=true;
            }
          }

        });

        if(belong){

          if(typeof(timearr[x[7]]) == "undefined")
          {
            timearr[x[7]]=new Array();
          }
            var gt=x[8].match(/-?[1-9]\d*/g);
            gt.map(function(t){
              var tmp=new Object();
              //tmp.class=x[1];
              tmp.name=x[2];
              tmp.teacher=x[3];
              tmp.week=x[5];
              if(x[6] == "&nbsp;")
              {
                x[6]="";
              }
              tmp.place=x[6];
              tmp.day=x[7];
              tmp.c=t;
              tmp.weekstr=x[9];

              timearr[x[7]].push(tmp);
            });


        }


      });
      timearr.shift();//第一个排掉


      //三维冒泡排序
     for(var key in timearr){
       for(var key2 in timearr[key])
       {
         var arrlength=timearr[key].length;
         for(var key2 in timearr[key])
         {
           if(key2 < (arrlength-1)){
            if(timearr[key][String(parseInt(key2)+1)].c < timearr[key][key2].c)
            {
              var t=timearr[key][key2];
              timearr[key][key2]=timearr[key][String(parseInt(key2)+1)];
              timearr[key][String(parseInt(key2)+1)]=t;
            }
           }
         }
       }
    }
      for(var key in timearr){
        for(var keya in timearr[key]){
          if(timearr[key][keya].name == "&nbsp;"){
            var index=tmpbody.indexOf(timearr[key][keya].place);
            var a=tmpbody.lastIndexOf("整周",index);
            var b=tmpbody.lastIndexOf("单元",index);
            if(a>b)
            {
              var now = a;
              var nowb=tmpbody.indexOf("&nbsp;",index);
              var nowstr=tmpbody.substr(now,nowb-now);
            }else{
              var now = b;
              var nowb=tmpbody.indexOf("&nbsp;",index);
              var nowstr=tmpbody.substr(now,nowb-now);
            }
            var x=nowstr.match(/<font color="#330099" size="2">(.*?)<\/font>/g);
            //console.log(x);
            for(var keyb in x){

              x[keyb]=x[keyb].replace(/<font color="#330099" size="2">/, "");
              x[keyb]=x[keyb].replace(/<\/font>/, "");

            }
            timearr[key][keya].name=x[1];

          }
        }
      }
      var data=new Object();
	  data.timetable=JSON.stringify(timearr);
	    User.update(req.session.user.name,data,function(){});
      resq.end(JSON.stringify(timearr));

  });

});
  });
 
});
router.post('/register', function(req, res, next) {

  var username=req.body.username;

  var md5 = crypto.createHash('md5');

  var password = md5.update(req.body.password).digest('hex');

  var email = req.body.email;

  var data=new Object();
  data.name=username;
  data.password=password;
  data.email=email;
  data.pic='';
  muser=new User(data);
  muser.save(function(err,user){

    if(err)
    {
      console.log(err);
      res.end('0');
      //req.flash('error',err);
      return;
    }
    req.session.user = user;
    //console.log(req.session.user);
    res.end(JSON.stringify(user));
    return;

  });
});

router.post('/uploadpic', upload.single('file'), function (req, res, next) {
  if (req.file && req.file.originalname) {
    console.log(`Received file ${req.file.originalname}`);
  }

  res.send({ responseText: req.file.path }); // You can send any response to the user here
});
router.get('/msg',function(req,res,next){
  if(req.session.user == null)
  {
      res.end();
  }else{
    res.end(JSON.stringify(req.session.user));
  }
});

router.post('/getmoney',function(req,res,next){
  var j = request.jar();
  var requestb = request.defaults({jar:j});
  var stid=req.session.user.stid;
  if(stid  == '')
  {
    res.end("1");//未绑定学号
    return;
  }
  var date=Date.parse(new Date());
  requestb.post({url:'http://portal.szpt.edu.cn/wps/Portlet_App_szpt/ecardQuery.action?dateww='+date+'&method=queryTodyConsume',headers:{
    'Cookie':'heerPortalUserName='+stid+';'
  }, encoding:null}, function(error,resq,body)
  {

      var decodedBody = iconv.decode(body, 'gb2312');
        console.log(decodedBody);
    res.end(decodedBody);
     // console.log(decodedBody);


  });
});

module.exports = router;
