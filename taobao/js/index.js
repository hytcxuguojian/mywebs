$(function(){
	/*Nav标题栏移动事件*/
	$(".list li").hover(function(){
		var left=$(this).attr("left");
		$(".line").animate({"left":left},200);
		return false;
	},function(){});
	$(".list").hover(function(){},function(){
		$(".line").animate({"left":"0"});
	});

	/*左侧导航栏下拉菜单*/
	$(".mt-indicator").click(function(){
		var openstate=$(this).attr("isopen");
		if (openstate=="true") 
		{
			$(this).attr("isopen","false");
			$(this).css("background-position","0 -89px");
			$(this).parent().find(".mt-menu-sub-content").hide();
		}
		if (openstate=="false") 
		{
			$(this).attr("isopen","true");
			$(this).css("background-position","0 -101px");
			$(this).parent().find(".mt-menu-sub-content").show();
		}
	});

	/*tbody操作区显示*/
	$("tbody").hover(function(){
		$(this).find(".lastOperates").show();
	},function(){
		$(this).find(".lastOperates").hide();
	});

	/*全选选择框*/
	$(".allSelector").click(function(){

		var checkedState=$(this).attr("ischecked");
		if (checkedState=="false") 
		{
			$(this).attr("ischecked","true");
			$(".selector").prop("checked",true);
		}
		if (checkedState=="true") 
		{
			$(this).attr("ischecked","false");
			$(".selector").prop("checked",false);
		}
	});

	/*热卖单品*/
	$(".probtnall").hover(function(){
		var num=$(this).find("i").attr("num");
		$(this).find("i").addClass("iconcolor");
		$(".probo").hide();
		$(".probo[num="+num+"]").show();
	},function(){
		$(this).find("i").removeClass("iconcolor");
	});

	/*猜你喜欢*/
	$(".proitemmode").hover(function(){
		$(this).css("border-color","#f40");
		$(this).find(".prolitwo").show();
	},function(){
			$(this).css("border-color","");
		$(this).find(".prolitwo").hide();
	});

});