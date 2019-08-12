const path = require("path");
const goodsModule = require('../model/goods');
const qs = require('querystring');
const jwt = require('jsonwebtoken');

const Add = (req,res,next)=>{
    let { goodsName,goodsPrice,goodsDec,tel}= req.body;
    let pathUrl = "http://localhost:3000/img/"+path.parse(req.files.goodsPic[0].path).base;
    goodsModule.goodsSave({goodsName,goodsPrice,goodsDec,tel,goodsPic:pathUrl},(date)=>{
        if(date){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:1,
                    info:"添加成功"
                }
            })
        }else{
            res.json({
                code:500,
                errMsg:"服务器错误",
                data:{
                    status:0,
                    info:"添加失败"
                }
            })
        }
    })
    
}
const List = (req,res,next)=>{
    let {page,limit} = req.query;
     page = Number(page);
     limit = Number(limit);
     
    
     let cookie = qs.parse(req.headers.cookie); //将req中的headers里面的cookie转为对象

    if(cookie.token){

        jwt.verify(cookie.token, '1905', function(err, decoded) {
            if(decoded){
                goodsModule.goodsFind({page:(page-1)*limit,limit},(result)=>{
        
                    if(result.length > 0){
                        res.json({
                            code:200,
                            errMsg:"",
                            data:{
                                status:1,
                                list:result
                            }
                        })
                    }else{
                        res.json({
                            code:200,
                            errMsg:"暂无数据",
                            data:{
                                status:0,
                                list:[]
                            }
                        })
                    }
                })
            }else{
                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:0,
                        info:"请你重新登录"
                    }
                })
            }
      });
    }else{
        res.json({
            code:500,
            errMsg:"",
            data:{
                status:0,
                info:"请你登录"
            }
        })
    }
    
  
}
const Remove = (req,res,next)=>{
    
    let {id,index} = req.body;
    
    goodsModule.goodsFindOne({_id:id},(data)=>{
        if(data){
            goodsModule.goodsRemove({_id:id},(result)=>{
                if(result){
                    res.json({
                        code:200,
                        errMsg:"",
                        data:{
                            status:1,
                            index:index,
                            info:"删除成功"
                        }
                    })
                }else{
                    res.json({
                        code:200,
                        errMsg:"",
                        data:{
                            status:0,
                            info:"删除失败"
                        }
                    })
                }
            })
        }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:2,
                    info:"服务器错误"
                }
            })
        }
    })
    
}
const Modify = (req,res,next)=>{
    let { goodsName,goodsPrice,goodsDec,tel,id}= req.body;
    let pathUrl = "http://localhost:3000/img/"+path.parse(req.files.goodsPic[0].path).base; 
    goodsModule.goodsModify({_id:id},{goodsName,goodsPrice,goodsDec,tel,goodsPic:pathUrl},(result)=>{
        if(result.ok){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:1,
                    info:"修改成功"
                }
            })
        }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:0,
                    info:"修改失败"
                }
            })
        }
    })

}
module.exports = {
    Add,
    List,
    Remove,
    Modify
}