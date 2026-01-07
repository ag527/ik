/**
 * portal.ikuai8.com认证js
 */

function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = location.search.substr(1).match(reg);

	if(r!=null){
		return  unescape(r[2]);
	}else{
		//获取当前URL值失败时,获取refer的URL参数值
		var r = document.referrer.substr(1).match(reg);
		if(r!=null){
			return unescape(r[2]);
		}else{
			return null;
		}
	}
}

function doAuth(type){
	var Search = location.search.replace('?',"&");
	var DstAddr = "/Action/webauth-up?";
	var Type = "type=" + type;
	location.href = DstAddr + Type + Search ;
}
function passwdAuth(pwd,refer){
	var ip = getParameterByName('user_ip');
	var mac = getParameterByName('mac');
	var refer = getParameterByName("refer");
	if(pwd){
		var password = CryptoJS.MD5(pwd).toString();
		var password = CryptoJS.MD5(CryptoJS.MD5(pwd).toString() + ip + mac).toString();
		location.href = "/Action/webauth-up?type=3&action=release&password=" + password + "&refer=" + getParameterByName("refer");
	}else{
		alert('密码不可以为空');
	}
}

function couponAuth(coupon,refer){
	if(!coupon){
		alert("请输入上网码号码");
		return false;
	}
	location.href = "/Action/webauth-up?type=2&action=release&username=" + UserName + "&refer=" + GetQueryString("refer");
}

function userAuth(){
	var UserName=document.getElementById("ikAccount").value;
	var PassWord=document.getElementById("ikPassword").value;
	if(!UserName){
		alert("请输入用户名");
		return false;
	}
	if(!PassWord){
		alert("请输入密码");
		return false;
	}
	var SumPassWord = CryptoJS.MD5(CryptoJS.MD5(PassWord).toString() + user_ip + user_mac).toString();
	location.href = "/Action/webauth-up?type=1&action=release&username=" + UserName + "&password=" + SumPassWord + "&refer=" + refer;
}