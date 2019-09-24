

// 引入本地mooose数据模块
var mongoose = require('../configs/db_configs.js');

const Schema = mongoose.Schema;
 
// 创建栏目列表数据类型
const BlogPost = new Schema({
    
      order:Number,

      //栏目标题
      title:String,

      //栏目简介
      info:String,

      
      //   创建时间
      ctime:{
           type:Date,
           default: new Date().toLocaleDateString(),
      }

});

// 创建数据库模型
const itemModel = mongoose.model('item', BlogPost);

// 暴露模块
module.exports = itemModel;