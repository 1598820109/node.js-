
// 引入mongoose模块
var mongoose = require('../configs/db_configs.js');

const Schema = mongoose.Schema;

// 声明一个数据类型对象  registerSchema
const registerSchema = new Schema({

	// 账号 用户名
	username: String,

	// 密码
	password:String,

	// 判断是否为管理员
	isAdmin:{
		  type:'boolean',
		  default:false,    //默认是false
	}

});

// const '当前的数据模块名' = mongoose.model('数据名名称', '数据类型对象');
const registerModel = mongoose.model('register', registerSchema);

// 暴露数据模块
module.exports = registerModel;
















