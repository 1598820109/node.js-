

// 创建验证码
// 在全局定义验证码
var code_title; //在全局定义验证码

function createCode() {

    code_title = "";

    var codeLength = 4; //验证码的长度

    var checkCode = document.getElementById("codeNumber"); //获取验证码节点

    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R',

        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数字或字母

    for (var i = 0; i < codeLength; i++) { //循环操作

        // 返回小于等于其数值参数的最大整数。 
        var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）

		code_title += random[index]; //根据索引取得随机数加到code上
	}
	
	checkCode.value = code_title; //把code值赋给验证码
}

createCode();  //调用函数



function codeDate(){

	console.log(321321);

	var code = document.getElementById('code').value.toUpperCase();
	var CODE = document.getElementById('CODE');
	console.log(code,CODE);

        if (code != code_title) { //若输入的验证码与产生的验证码不一致时

            // CODE.innerHTML="验证码输入错误！请重新输入"; //则弹出验证码输入错误

            CODE.className = "text-danger";

            createCode(); //刷新验证码

            document.getElementById("code").value = ""; //清空文本框

        } else { //输入正确时
             return true;
	}

}
	
codeDate();

// 获取提示信息的标签  label标签  紧跟在input上一个标签 <lable></lable>
function gogin(cobj){
      while(true){
           if(cobj.previousSibling.nodeName != "LABEL"){
                cobj = cobj.previousSibling;               
           }else{
               return cobj.previousSibling;
           }
      }
}

// 查看
function check(obj,text,fun,sub){

        var title =  gogin(obj);

        // 用户名
        obj.onfocus = function(){
            title.innerHTML = text;
            title.className = "text-primary";

        }

        obj.onblur = function(){
            title.innerHTML = "";

          if(fun(this.value)){
                title.innerHTML = "输入格式正确";
                title.className = "text-success";
           }else{
               title.innerHTML = text;
               title.className = "text-danger";
           }
        }


        if(sub == "sub"){
            obj.onblur();
        }
}

onload = login

function login(sub){

var state = true;  //成功后的状态

    // 用户名
    var username = document.getElementById('username');

    // 密码
    var password = document.getElementById('password');

    // 验证码
    var code = document.getElementById('code');

    console.log(username,password,code);
    
    // 用户名
    check(username,'请输入账号',function(val){
            if(val.length != ''){
                return true;
            }else{
                state = false;
                return false;
            }
    },sub);

    //密码
    check(password,"请输入密码",function(val){
           if(val.length != ''){
                return true;
           }else{
               state = false;
               return false;
           }
    },sub);

    // 验证码
    check(code,"请输入正确的验证码", function(val){
        if(val.length == 4){
              return true;
        }else{
              state = false;
              return false;
        }
    },sub);

    return state;

}























