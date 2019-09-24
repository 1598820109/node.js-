var express = require('express');
var router = express.Router();

// 引入后台控制器文件
var adminControll = require('../Controllections/adminControll.js');

// 后台首页
router.get('/user',adminControll.user);

// 后台首页
router.get('/',adminControll.index);

// 栏目添加
router.get('/item/itemAdd',adminControll.itemAdd);

// 插入栏目数据
router.post('/item/itemInsert',adminControll.itemInsert);

// 栏目列表管理
router.get('/item/itemList',adminControll.itemList);

// 栏目列表删除
router.get('/item/itemRemove/:_id',adminControll.itemRemove);

// 栏目列表修改
router.get('/item/itemAttrice/:_id',adminControll.itemAttrice);

// 栏目列表更新
router.post('/item/itemUpdate',adminControll.itemUpdate);
/*________________________________________________________________________________ */

// 添加文章
router.get('/article/articleAdd',adminControll.articleAdd);

// 插入文章数据
router.post('/article/articleInsert',adminControll.articleInsert);

// 文章列表
router.get('/article/articleList',adminControll.articleList);

// 文章删除
router.get('/article/articleRemove/:_id',adminControll.articleRemove);

// 文章修改
router.get('/article/articleAttrice/:_id',adminControll.articleAttrice);

// 文章封面跟新
router.post('/article/articleImage',adminControll.articleImage);

// 文章内容更新
router.post('/article/articleUpload',adminControll.articleUpload);

// 用户注册
router.get('/user/register',adminControll.register);

// 插入用户数据
router.post('/user/registerInsert',adminControll.registerInsert);

// 用户登录
router.get('/user/login',adminControll.login);

// 登录验证
router.post('/user/loginInsert',adminControll.loginInsert);

// 管理员信息
router.get('/user/userAdd',adminControll.userAdd);

// 退出登录
router.get('/logOut',adminControll.logOut);

module.exports = router;
