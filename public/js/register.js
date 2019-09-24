
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
			alert("恭喜您,注册成功");

	}

}
	

codeDate();



// 获取上一个紧跟的标签
function glabel(cobj){
	// previousSibling 返回跟紧上一个节点  nextSibling 返回跟紧下一个节点

	  while(true){
			if(cobj.previousSibling.nodeName != "LABEL"){
				 cobj = cobj.previousSibling;
			}else{
				return cobj.previousSibling;
			}
	  }
}

function check(obj,info,fun,click){

	var warning = glabel(obj);

	obj.onfocus = function(){

		warning.innerHTML = info;
		warning.className = "text-warning";

	}

	obj.onblur = function(){
		var warning = glabel(obj);

		if(fun(this.value)){
				warning.innerHTML = "输入格式正确";
				warning.className = "text-success";
		}else{
				warning.innerHTML = info;
				warning.className = "text-danger";
		}
	};

	if(click =="click")
	 	obj.onblur();

}

//将函数赋值给click
window.onload = regs

function regs(click){


		var stat = true;  //状态

		// 账号
		var username = document.getElementById('username');

		// 密码
		var password = document.getElementById('password');

		// 重复密码
		var repassword = document.getElementById('repassword');

		// 验证码
		var code = document.getElementById('code');


		// console.log( username, password, repassword, code);

		// alert(glabel(realname).nodeName);

		// 查看用户名
		check(username,"用户名长度必须在6 ~ 12之间",function(val){
			if(val.length != 0  && val.length <=12 && val.length >=6){
				 return true;
			}else{
				stat = false;
				return false;
			}
		},click);

		// 查看密码
		check(password,"密码必须长度必须是 6 ~ 12 之间",function(val){

			if(val.length >=6 && val.length <=12){
				return true;
			}else{
				stat = false;
				return false;
			}

		},click);

		// 重复密码
		check(repassword,'必须以上面的密码一致，规则也要相同',function(val){
			 if(val.length >=6 && val.length <=12 && val == password.value){
				 return true;
			 }else{
				 stat = false;
				 return false;
			 }
		},click);

		// 验证码
		check(code,"请输入正确的验证码",function(val){
			  if(val.length != 0 && val.length == 4 ){
				  return true;
			  }else{
				  stat = false;
				  return false;
			  }
		},click);

		return stat;
}


