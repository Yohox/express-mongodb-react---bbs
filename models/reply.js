var mongoose = require('./db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var replySchema = new mongoose.Schema({
        threadid:String,
        content:String,
        username:String,
        date:String
    }
);
var collection = mongoose.model('reply', replySchema);
function reply(mp){
    this.threadid = mp.threadid;
    this.content = mp.content;
    this.username = mp.username;
    this.date=mp.date;
};

module.exports = reply;

reply.prototype.save = function(callback) {
    var date = new Date().toLocaleString();
    //存储各种时间格式，方便以后扩展

    var mpdata = {
        threadid: this.threadid,
        content: this.content,
        username:this.username,
        date:date
    };
    collection.create(mpdata, function(err, data){
        //console.log(err,user);
        callback(err, data);
    });
};

reply.get = function(threadid, callback){

    collection.find({threadid:threadid}, function(err, data){
        callback(err, data);
    });
};
