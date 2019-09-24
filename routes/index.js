var express = require('express');
var router = express.Router();

// 前端路由控制器
// 引入数据控制器文件
var indexControll = require('../Controllections/indexControll.js');

// 前端首页
router.get('/',indexControll.index);

// 前端文章
router.get('/article',indexControll.article);
//文章详情
router.get('/articleConent/:_id',indexControll.articleConent);

//文章列表
router.get('/articleList/:_id',indexControll.articleList);




// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
