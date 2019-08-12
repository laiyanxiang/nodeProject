var express = require('express');
var router = express.Router();
//2、引入multer模块
var multer = require("multer");
var goodsController = require('../controller/goods');
//3、对上传的文件进行配置
var storage = multer.diskStorage({

//指定文件上传到服务器的路径
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },

//指定上传到服务器文件的名称
  filename: function (req, file, cb) {
    cb(null, Date.now()+ '-' + file.originalname )
  }
})
var upload = multer({ storage: storage })


// //4、使用 在使用路由的时候调用upload方法 name值是客户端传递的key值
var cpUpload = upload.fields([{ name: 'goodsPic', maxCount: 1 }])
// console.log(cpUpload);

 // 添加商品
router.post('/add',cpUpload,goodsController.Add);

//商品列表
router.get('/list',goodsController.List);

//删除商品
router.post('/remove',goodsController.Remove);
//修改商品信息
router.post('/modify',cpUpload,goodsController.Modify);

app.use((req ,res,next)=>{
  let cookie = qs.parse(req.headers.cookie); 
  if(cookie.token){

    jwt.verify(cookie.token, '1905', function(err, decoded) {
        if(decoded){
           
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
})

module.exports = router;