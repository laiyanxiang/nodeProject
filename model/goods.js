const mongoose = require('../utils/database').mongoose;

let Goods = mongoose.model("goods",{
    goodsName:String,
    goodsPrice:String,
    goodsDec:String,
    tel:String,
    goodsPic:String   
});

let goodsSave = (goodsInfo,cb)=>{
    let goods = new Goods(goodsInfo);
    goods.save().then((data)=>{
        cb(data);
    })
}
let goodsFind = (goodsInfo,cb)=>{
    Goods.find().skip(goodsInfo.page).limit(goodsInfo.limit).then((data)=>{
        cb(data);
    })
}
let goodsFindOne = (goodsInfo,cb)=>{
    Goods.findOne(goodsInfo).then((data)=>{
        cb(data);
    })
}
let goodsRemove = (goodsInfo,cb)=>{
    Goods.remove(goodsInfo).then((data)=>{
        cb(data);
    })
}
let goodsModify = (goodsId,goodsInfo,cb)=>{
    Goods.update(goodsId,{$set:goodsInfo}).then((result)=>{
        cb(result);
    })
}
module.exports = {
    goodsSave,
    goodsFind,
    goodsFindOne,
    goodsRemove,
    goodsModify
}