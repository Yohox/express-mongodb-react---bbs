var mongoose = require('./db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var infSchema = new mongoose.Schema({
      title:String,
      content:String,
      username:String,
      pdate:String,
      mode:String,
      date:String,
      place:String,
      newreply:String,
      replynum:Number
    }
);
var collection = mongoose.model('inf', infSchema);

function inf(mp){
  this.title = mp.title;
  this.content = mp.content;
  this.username = mp.username;
  this.mode = mp.mode;
  this.date=mp.date;
  this.place=mp.place;
  this.pdate=mp.pdate;
  this.newreply=mp.newreply;
  this.replynum=mp.replynum;
};

module.exports = inf;

inf.update = function(id,data,callback) {



  collection.update({ _id: id},{$set:data},function(err,data){
  callback(err,data);
  });

};
inf.prototype.save = function(callback) {
  var date = new Date().toLocaleString();
  //存储各种时间格式，方便以后扩展

  var mpdata = {
    title: this.title,
    content: this.content,
    username:this.username,
    pdate:date,
    mode:this.mode,
    date:this.date,
    place:this.place,
    newreply:this.username,
    replynum:0
  };
  collection.create(mpdata, function(err, data){
    callback(err, data);
  });
};

inf.get = function(id, callback){

  collection.findOne({_id:id}, function(err, data){
    callback(err, data);
  });
};

inf.findbyname = function(name, callback){
  name=new RegExp(name);
  collection.find({title:name}, function(err, data){
    callback(err, data);
  });
};

inf.getnew = function(num,index, callback){

 // collection.find().skip(parseInt(index)).limit(parseInt(num)).sort({"pdate":-1}).toArray(function(err, arr){
  collection.find(null,null,{ skip: parseInt(index),limit:parseInt(num),sort:{"pdate":-1}}, function(err, data){
    callback(err, data);
  });
};