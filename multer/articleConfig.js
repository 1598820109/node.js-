// 引入上传文件的模块
var multer = require('multer');
// 引入path的文件模块
var path = require('path');

// 声明一个方法
var articleUpload = function (articleImgtype,articlePath,articleFileSize) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // 上传文件的位置  /Uploads/articleImages
            cb(null, articlePath);
        },
        filename: function (req, file, cb) {
            console.log(file);

            // 获取上传文件的扩展名
            var imgurl = path.extname(file.originalname);

            cb(null, file.fieldname + '-' + Date.now() + imgurl);
        }
    })

    // 设置一个函数来控制什么文件可以上传以及什么文件应该跳过，这个函数应该看起来像这样：
    function fileFilter(req, file, cb) {

        // 这个函数应该调用 `cb` 用boolean值来
        // 指示是否应接受该文件
        console.log(file);

        // 声明一个问价类型数组
        // var imgurl = ['image/jpeg', 'image/png', 'image/gif'];

        if (articleImgtype.indexOf(file.mimetype) == -1) {

            // 拒绝这个文件，使用`false`，像这样:
            cb(null, false)

            // 如果有问题，你可以总是这样发送一个错误:
            cb(new Error('请上传jpg 、png、gif、格式的图片,图片大小不超过10M'))
        } else {

            // 接受这个文件，使用`true`，像这样:
            cb(null, true)
        }

    }

    // 上传文件的基本参数
    var upload = multer({
        storage: storage,

        fileFilter: fileFilter,

        limits: {
            // 限制文件大小  10M
            fileSize:articleFileSize,
        }

    })
    // 返回upload对象
    return upload;
};

// 暴露方法
module.exports = articleUpload;
