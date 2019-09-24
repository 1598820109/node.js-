	// 后台控制器
	var adminControll = {};

	// 引入栏目数据模块
	itemModel = require('../module/itemModel.js');

	// 引入文章数据模块
	articleModel = require('../module/articleModel.js');

	// 引入后台用户数据模块
	registerModel = require('../module/registerModel.js');

	// 引入后台管理员数据模块
	adminControll = require('../module/adminModel.js');

	// 后台首页
	adminControll.user = function(req,res){
		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}else if(req.session.user.isAdmin == false){
			// 响应首页
			res.render('admin/user',{error:null});
		}
	}

	// 后台管理员首页
	adminControll.index = function(req,res){
		// 判断用户有没有登录 是不是管理员
		 if( !req.session.user){
			  res.redirect('/admin/user/login');
		}else if(req.session.user.isAdmin == false){
			// 响应首页
			res.redirect('/admin/user');
		}else{
			// 响应网页
			res.render('admin/index');
		}
	}

	// 栏目添加
	adminControll.itemAdd = function(req,res){
			  // 判断用户有没有登录 是不是管理员
			  if( !req.session.user){
					res.redirect('/admin/user/login');
			  }else if(req.session.user.isAdmin == false){
				  // 响应首页
				  res.redirect('/admin/user');
			  }else{
				  // 响应模板
				  res.render('admin/item/itemAdd')
			  }
	}

	// 插入栏目数据
	adminControll.itemInsert = function(req,res){

		// 判断用户有没有登录 是不是管理员
		if( !req.session.user){
				res.redirect('/admin/user/login');
		}

		//  将栏目数据插入数据库中
		itemModel.create(req.body,function(err,data){
			   if(err){
				   console.log('抱歉，数据插入失败')
			   }else{
				   console.log('恭喜，数据插入成功',data);
				   res.redirect('/admin/item/itemAdd');

			   }
		})
	}

	// 栏目列表
	adminControll.itemList = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}else if(req.session.user.isAdmin == false){
			// 响应首页
			res.redirect('/admin/user');
		}else{

		// 当前是第几页
		var page = req.query.page ? req.query.page:1;

		// 每一页去3条数据
		var pageSize = 6;

		//   查询当前数据
		itemModel.find({}).count(function(err,total){

				// total 查询所有数据的数量
				console.log("当前有"+ total+ "条栏目数据");

				// 声明最大页数
				var maxPage = Math.ceil(total/pageSize);

				// 判断上一页
				 if(page < 1) page = 1;

				// 判断下一页
				 if(page >=maxPage) page = maxPage;


				// 偏移量
				var offsetPage = pageSize * (page -1);

				// 查询数据
				itemModel.find({}).limit(pageSize).skip(offsetPage).sort({order:1}).exec(function(err,data){
						if(err){
							console.log('数据查询失败')
						}else{
							res.render('admin/item/itemList',{
								items:data,
								page:page,
								maxPage:maxPage,
							} )   //数据传输
						}
				})
			})
		}
	}


	// 栏目列表删除
	adminControll.itemRemove = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}

		// 删除指定的_id   值得注意的是，_id  在req.params 中
		itemModel.remove({_id:req.params._id}).sort({order:1}).exec(function(err,data){

			 if(err){
				 console.log('抱歉，数据删除失败')
			 }else{
				 console.log('恭喜，数据删除成功',data)
				 res.redirect('/admin/item/itemList')
			 }
		})
	}

	// 修改列表
	adminControll.itemAttrice = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}else if(req.session.user.isAdmin == false){
			// 响应首页
			res.redirect('/admin/user');
		}else{


		// 查询指定的_id数据
		itemModel.find({_id:req.params._id},function(err,data){
			if(err){
				console.log('抱歉，数据查询失败')
			}else{
				console.log('恭喜，数据查询成功',data);
				res.render('admin/item/itemAttrice',{item:data [0]});
			}
		})
	}
}

	// 更新栏目数据
	adminControll.itemUpdate = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}

		// 更新数据
		itemModel.update({_id:req.body._id},req.body,function(err,data){
			if(err){
				console.log('抱歉，数据更新失败')
			}else{
				console.log('恭喜，数据更新成功',data);
				res.redirect('/admin/item/itemList');
			}
		})
	}

	// 添加文章
	adminControll.articleAdd = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}else if(req.session.user.isAdmin == false){
			// 响应首页
			res.redirect('/admin/user');
		}else{

		// 查找栏目数据
		itemModel.find({}).sort({order:1}).exec(function(err,data){
			if(err){
				console.log('数据查询失败')
			}else{
				console.log('数据查询成功');
				// 响应模板
				res.render('admin/article/articleAdd',{item:data});
			}
		})
	}
}


	// 插入数据
	adminControll.articleInsert = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}

		// 引入本地上传文件的模块
		var articleUpload = require('../multer/articleConfig.js');
		// 上传文件的类型
		var articleImgtype = ['image/jpeg', 'image/png', 'image/gif'];
		// 文件的保存路径
		var articlePath = 'uploads/articleImages';
		// 文件的大小限制  10M
		var articleFileSize = 1024 * 1024 * 10;

		// 声明变量，调用函数  （重点）；
		var upload = articleUpload(articleImgtype , articlePath , articleFileSize).single('imgurl');

		// 上传文件 调用函数
		upload(req,res,function(err){
			 if(err){
				 console.log('图片上传失败')
				 res.send('请上传JPG、PNG、GIF格式的图片，大小不超过10M')
			 }else{

				console.log('图片上传成功');

				// 将图片路径存储到数据库中 数据库的图片路径 等于 上传图片的路径
				req.body.imgurl = req.file.filename;
				// 插入文章数据
				articleModel.create(req.body,function(err,data){
					if(err){
						console.log('数据插入失败')
					}else{
						console.log('数据插入成功',data);
						res.redirect('/admin/article/articleList');
					}
				})
			 }
		})
	}

	// 文章列表
	adminControll.articleList = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}else if(req.session.user.isAdmin == false){
			// 响应首页
			res.redirect('/admin/user');
		}else{

		var page = req.query.page ? req.query.page:1; //当前是第几页，默认是第一页

		var pageSize = 10; //每一页有多少条数据

		// count 查找文章所有数据
		articleModel.find({}).count(function(err,total){

			console.log('文章列表一共有'+total+'条数据');

			if(total == 0){
				res.send('抱歉，该列表没有数据，请您添加数据');
			}else{

				var maxPage = Math.ceil(total/pageSize); //一共有多少页

				//判断上一页
				if(page < 1) page = 1;

				//判断下一页
				if(page > maxPage) page = maxPage;

				var offsetPage = pageSize * (page - 1);

				articleModel.find({}).limit(pageSize).skip(offsetPage).populate('itemId',{title:1}).sort({order:1}).exec(function(err,data){
					if(err){
						console.log('数据查询失败')
					}else{
						console.log('数据查询成功')

						console.log(data);
						res.render('admin/article/articleList',{
							article:data,
							page:page,
							maxPage:maxPage,
						});
					}
			  })
			}
		})
	}
}

	// 文章列表删除
	adminControll.articleRemove = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}

		// 查询数据
		articleModel.remove({_id:req.params._id}).sort({order:1}).exec(function(err,data){
			if(err){
				console.log('数据删除失败')
			}else{
				console.log('数据删除成功',data)
				// 跳转当前列表页
				res.redirect('/admin/article/articleList');
			}
		})
	}

	//文章列表修改
	adminControll.articleAttrice = function(req,res){

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}else if(req.session.user.isAdmin == false){
			// 响应首页
			res.redirect('/admin/user');
		}else{

		// 查询数据
		itemModel.find({}).sort({order:1}).exec(function(err,data1){
			 if(err){
				 console.log('栏目数据查询失败')
			 }else{

				articleModel.findOne({_id:req.params._id}).sort({order:1}).exec(function(err,data2){
					if(err){
						 console.log('文章数据查询失败')
					}else{
						// 响应模板
						res.render('admin/article/articleAttrice',{
							item:data1,
							article:data2,
						});
					}
				})
			 }
		})
	}
}

	// 文章封面跟新
	adminControll.articleImage = function (req, res) {

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}

		// 引入本地上传文件的模块
		var articleUpload = require('../multer/articleConfig.js');
		// 上传文件的类型
		var articleImgtype = ['image/jpeg', 'image/png', 'image/gif'];
		// 文件的保存路径
		var articlePath = 'uploads/articleImages';
		// 文件的大小限制  10M
		var articleFileSize = 1024 * 1024 * 10;

		// 声明变量，调用函数  （重点）；
		var upload = articleUpload(articleImgtype, articlePath, articleFileSize).single('imgurl');

		upload(req, res, function (err) {
			if (err) {
				console.log('图片上传失败');
				res.send('请上传JPG、PNG、GIF 格式的图片');
			} else {

				articleModel.update({
					_id: req.body._id
				}, {
					$set: {
						imgurl: req.file.filename
					}
				}, function (err) {
					if (err) {
						console.log('图片更新失败');
					} else {
						console.log('图片更新成功');
						res.redirect('/admin/article/articleList');
					}
				})
			}
		})
	}

	// 文章内容更新
	adminControll.articleUpload = function(req,res){

		console.log(2132131);

		// 判断用户有没有登录
		if( !req.session.user){
			res.redirect('/admin/user/login');
		}

		articleModel.update({ _id:req.body._id },{$set:req.body},function(err){
			if (err) {
				console.log('数据更新失败');
				res.send('数据更新失败');
			} else {
				console.log('数据更新成功');
				res.redirect('/admin/article/articleList');
			}
		})
	}

	// 用户注册
	adminControll.register = function(req,res){
			// 响应模板
			res.render('admin/user/register');
	}

	// 插入后台用户数据
	adminControll.registerInsert = function(req,res){

		var md5 = require('md5');  //引入MD5加密模块

		// 去掉用户名的空白字符
		req.body.username = req.body.username.trim();
		req.body.password = md5(req.body.password.trim());

		console.log(req.body);

		// 插入用户数据
		registerModel.create(req.body,function(err,data){
			if(err){
				console.log('数据插入失败')
			}else{
				console.log('数据插入成功');
				res.redirect('/admin/user/login');
			}
		});

	}

	// 用户登录
	adminControll.login = function(req,res){
		// 响应模板
		res.render('admin/user/login',{ error:null});
	}

	// 登录验证
	adminControll.loginInsert = function(req,res){
			var md5 = require('md5');

			//去除用户名的空白字符 及对密码进行加密
			req.body.username = req.body.username.trim();
			req.body.password = md5(req.body.password.trim());

			// 重点   方便查找
			var username = req.body.username.trim();
			var isAdmin = Boolean(req.body.isAdmin);
			console.log(isAdmin);

			registerModel.findOne({username:username},function(err,data){

				  if(data == null){
					    res.render('admin/user/login',{error:'该用户不存在'})
				  }else{
					   if(req.body.password == data.password){
							// 判断用户是不是管理员
							if(data.isAdmin == false){
								req.session.user = data;
								console.log(req.session.user);
								res.redirect('/admin/user')  //跳转至首页
							}else{
								//   把用户名存入session里
								console.log(req.session.user);
								req.session.user = data;
								res.render('admin/user',{error: "@" + data.username  + '管理员 ,点击这里，即可管理后台'})  //跳转至首页
							}
					   }else{
						res.render('admin/user/login',{error:'账号或密码错误'})
					   }
				  }
			})
	}

	// 添加管理员信息
	adminControll.userAdd = function(req,res){

		  //   响应模板
		  res.render("admin/user/userAdd");
	}





	// 退出登录
	adminControll.logOut = function(req,res){
		req.session.user = null;
		// 条转到登录页面
		res.redirect('/admin/user/login');

	}

module.exports = adminControll;
