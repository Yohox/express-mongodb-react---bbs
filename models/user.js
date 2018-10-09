var mongoose = require('./db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var userSchema = new mongoose.Schema({
      name:String,
      password:String,
      email:String,
      pic:String,
      stid:String,
      stpw:String,
	  timetable:String,
	  marktable:String,
	  money:String
    }
);
  var collection = mongoose.model('user', userSchema);
function User(user){
  this.name = user.name;
  this.password = user.password;
  this.email = user.email,
  this.pic=user.pic;
  


};

module.exports = User;

User.prototype.save = function(callback) {
  var user = {
      name: this.name,
      password: this.password,
      email: this.email,
      pic:this.pic,
      stid:'',
      stpw:'',
	  timetable:'',
	  marktable:'',
	  money:''
  };



      collection.create(user, function(err, user){
      //console.log(err,user);
        callback(err, user);
      });


};

User.update = function(name,data,callback) {

 //{$set:data}
  collection.update({name:name},{$set:data},'', function(err, user){
    callback(err, user);
  });
};

User.get = function(name, callback){

  collection.findOne({name:name}, function(err, user){
    callback(err, user);
  });
};