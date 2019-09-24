// 前端数据操作控制器
var indexControll = {};

// 引入栏目数据模块
var itemModel = require('../module/itemModel.js');
//引入文章数据模型
var articleModel = require('../module/articleModel.js');


// 首页
indexControll.index = function(req,res){
    res.render('index')
}

indexControll.article = function(req,res){

    // 查询栏目
    itemModel.find({}).sort({order:1}).exec(function(err,data){

        if(err){
            res.send("数据查询失败")
        }else{
           getArticle(0)
           function getArticle(i){
             articleModel.find({itemId:data[i]._id}).limit(1).exec(function(err,article){
                data[i].articlelist = article;
                if(i < data.length - 1){
                    getArticle(++i);
                }else{
                    res.render('article',{items:data})
                }
             })
           }
        }
    })
}



// 文章详情
indexControll.articleConent = function(req,res){

        // 查找栏目数据
        itemModel.find({}).sort({order:1}).exec(function(err,data){
                if(err){
                    console.log("item 数据查询失败")
                }else{
                    // 文章数据
                    articleModel.find({_id:req.params._id}).sort({order:1}).exec(function(err,data2){
                        if(err){
                            console.log('文章数据查询失败')
                        }else{
                             // 响应模板
                              console.log(data2)
                              res.render('articleConent',{items:data,article:data2})
                        }
                    })
                }
        })
}


// 文章列表
indexControll.articleList = function(req,res){

    itemModel.find({_id:req.params._id}).sort({order:1}).exec(function(err,data){

         if(err){
             console.log('栏目数据查询失败')
         }else{

             getItemArticle(0)
             function getItemArticle(i){
                articleModel.find({itemId:data[i]._id}).populate('itemId',{name:1}).exec(function(err,article){
                    if(err){
                        console.log("文章数据查询失败")
                    }else{
                        data[i].articlelist = article;
                        if( i < data.length - 1){
                            getItemArticle(++i)
                        }else{
                            // console.log(article);
                            itemModel.find({}).sort({order:1}).exec(function(err,data){
                                    if(err){
                                        console.log('栏目数据查询失败')
                                    }else{
                                        res.render('articleList',{items:data,article:article})
                                    }
                            })
                        }
                    }
                })
             }
         }
    })

}


// 暴露indexControll
module.exports = indexControll;