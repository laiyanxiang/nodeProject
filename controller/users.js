const userModule = require('../model/users');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const secret = '1905';
const Register = (req,res,next)=>{
     // 接收post请求的数据
    let {username,password} = req.body;
    

    //查找是否存在用户名
    userModule.userFind({username},(data)=>{
        if (data) {  //存在用户名
            res.json({
                code: 200,
                errMsg: "",
                data: {
                  status: 0,
                  info: "用户名重复"
                }
              })  
          }else { //不存在用户名
            //将用户存到数据库
            // 密码加密
            const hash = crypto.createHash('sha256');
            // 添加要加密的内容
            hash.update(password);
            // 获取加密后的内容
            // console.log(hash.digest('hex'));
            userModule.userSave({username,password:hash.digest('hex')},()=>{
                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                      status: 1,
                      info: "注册成功"
                    }
                })
            })
           
          }
    })
}

const Login = (req,res,next)=>{
    // 接收数据
    let {username,password} = req.body;

    userModule.userFind({username},(result)=>{
          console.log(result);
        if(result){
            // 密码加密
            const hash = crypto.createHash('sha256');
            // 添加要加密的内容
            hash.update(password);
            if(result.password == hash.digest('hex')){

                // 生成tooken
                let token = jwt.sign({username,a:1,b:2}, secret, { expiresIn: '1h' });
                //第一个参数是用户信息可随便写值，第二个参数是签名（用sha256算法算出），第三个参数是过期时间
                res.cookie("token",token);  //给客户端发送一个token值，存到cookie里面
                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:1,
                        info:"登录成功"
                    }
                })
            }else{
                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:1,
                        info:"密码错误"
                    }
                })
            }
        }else{
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    status: 0,
                    info: "用户名不存在"
                }
            })
        }
    })
}
module.exports = {
    Register,
    Login
}
