var express = require('express');
var router = express.Router();
var userController = require('../controller/users');
/* GET users listing. */

// 注册
router.post('/register', userController.Register);
// 登录
router.post('/login', userController.Login);

module.exports = router;