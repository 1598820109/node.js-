
// 连接本地的moongoose数据模块
var mongoose = require('../configs/db_configs.js');


const Schema = mongoose.Schema;

// 创建栏目列表数据类型
const Article = new Schema({
    
    // 文章分类
    itemId:{
        type:'ObjectId',  //所在栏目
        
        //   关联的集合
        ref:'item',
  },

    // 图片路径
    imgurl:String,

    // 文章排序
    order:Number,

    // 文章名称
    title:String,

    // 文章标题
    author:String,

    //文章标题
    info:String,

    // 关键字
    keyword:String,

    // 文章内容
    content:String,

    //   创建时间
    ctime:{
         type:Date,
         default: new Date(),
    }

});

// 创建数据库模型
const articleModel = mongoose.model('article', Article);

// 暴露模块
module.exports = articleModel;






