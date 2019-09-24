
// 引入本地的monoose数据模块
var mongoose = require('../configs/db_configs.js');

const Schema = mongoose.Schema;

// 创建栏目列表数据类型
const Admin = new Schema({
    
    // 用户头像
    userimgurl:String,

    // 管理员排序
    userorder:Number,

    // 管理员性别
    userSex: String,

    // 真实姓名
    relname:String,

    // 联系电话
    usertel:Number,

    // 个人昵称
    username:String,

    // 自我介绍
    usercontent:String,

});

// 创建数据库模型
const adminModel = mongoose.model('user', Admin);

// 暴露模块
module.exports = adminModel;

