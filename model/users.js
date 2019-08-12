const mongoose = require('../utils/database').mongoose;

let User = mongoose.model('user',{
    username:String,
    password:String
});

//定义查的方法
const userFind = (userInfo,cb)=>{
    User.findOne(userInfo).then((result)=>{
        cb(result);
    })
}

//定义数据库增的方法
const userSave = (userInfo,cb)=>{
    let user = new User(userInfo);
    user.save().then((result)=>{
        cb(result);
    })
}
module.exports = {
    userFind,
    userSave
}