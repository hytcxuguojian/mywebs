$(function(){	
	/**********登录区功能****************/
	$("#email").focus(function(){
		if($(this).val()=="邮箱/手机号/用户名")
		{
			$(this).val("");
		}
	});
	$("#email").blur(function(){
		if($(this).val()=="")
		{
			$(this).val("邮箱/手机号/用户名");
		}
	});
	$("#pwd").focus(function(){
		if($(this).val()=="请输入密码")
		{
			$(this).val("");
		}
	});
	$("#pwd").blur(function(){
		if($(this).val()=="")
		{
			$(this).val("请输入密码");
		}
	});

	$("#loginbtn").click(function(){
		if ($("#email").val()=="邮箱/手机号/用户名"||$("#email").val()=="")
		{
			$("#loginError").html("请输入用户名和密码");
		}
		else if ($("#pwd").val()=="请输入密码"||$("#pwd").val()=="")
		{
			$("#loginError").html("您还没有填写密码");
		}
		else
		{
			$("#loginError").html("");
		}
	});

	/**************点击更多事件************/
	$(".more").click(function(){
		var state=$(this).attr("isopen");
		if (state=="0") 
		{
			$("#webList").show();
			$(this).attr("isopen","1");
			$(this).css({"background-color":"#fff","color":"#333","background-position":"30px -12px"});
		}
		if (state=="1") 
		{
			$("#webList").hide();
			$(this).attr("isopen","0");
			$(this).css({"background-color":"","color":"","background-position":""});
		}
	});
});