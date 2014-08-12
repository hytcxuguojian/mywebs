$(function(){
	/*搜索区效果*/
	$("#searchBar").hover(function(){
		$("#searchLogo").css("background-image",'url("css/images/search2.jpg")');
	},function(){
		$("#searchLogo").css("background-image",'url("css/images/search1.jpg")');
	});
	$("#searchText").focus(function(){
		$(".searchList").slideDown();
		$(".hotWords").hide();
		$(".searchList li").hover(function(){
			$(this).css("background-color","#efefef");
		},function(){
			$(this).css("background-color","#fff");
		});
	});
	$("#searchText").blur(function(){
		$(".searchList").slideUp();
		$(".hotWords").show();
	});


	$("#shopingCar").hover(function(){
		$(this).find("div").show();
	},function(){
		$(this).find("div").hide();
	});
	/*搜索区效果 end*/

	/*导航栏滑动效果*/
	$(".MenuUl").hover(function(){
		var indexid=$(this).attr("tag");
		$(this).find(".menuTitle").css("background-color","#333");
		$(this).find("."+ indexid).stop().slideDown(400);
	},function(){ 
		var indexid=$(this).attr("tag");
		$(this).find("."+ indexid).stop(true,true).fadeOut(400);
		$(this).find(".menuTitle").css("background-color","");
	});
	/*导航栏滑动效果 end*/

	/*主焦点图效果*/
	timer2=setInterval('$("#Next").click()',3000);
	$("#showGoodsRA").hover(function(){
		$("#Previous").show();
		$("#Next").show();
		clearInterval(timer2);
	},function(){
		$("#Previous").hide();
		$("#Next").hide();
		timer2=setInterval('$("#Next").click()',3000);
	});
	$("#Previous").click(function(){
			count--;
			showGoodsRA();
	});
	$("#Next").click(function(){
		count++;
		showGoodsRA();
	});
	$("#Previous").hover(function(){
		$(this).css("background-position","0 0");
	},function(){
		$(this).css("background-position","-83px 0");
	});
	$("#Next").hover(function(){
		$(this).css("background-position","-41px 0");
	},function(){
		$(this).css("background-position","-124px 0");
	});
	/*主焦点图效果 end*/

	/*分类商品展示*/
	$(".goodsCategoryLi").hover(function(){
		$(this).find(".linksSection").show();
	},function(){
		$(this).find(".linksSection").hide();
	});


	/*分类商品展示 end*/

	/*小米单品展示区互动效果*/
	var picwidth=1240;
	var picCount=2;
	var selector="goodsItems";
	//var canshu1 = "huadong("+picwidth+","+picCount+",'"+selector+"')";
	timer1=setInterval('$("#moreRight").click()',3000);
	$("#homeStarGoods").hover(function(){
		clearInterval(timer1);
	},function(){
		timer1=setInterval('$("#moreRight").click()',3000);
	});
	$("#moreRight").click(function(){
		index++;
		huadong(picwidth,picCount,selector)
	});
	$("#moreLeft").click(function(){
		index--;
		huadong(picwidth,picCount,selector)
	});

	/*小米单品展示区互动效果 end*/
	$("#dropMenu").hover(function(){
		$(".dropMenuUl").show();
	},function(){
		$(".dropMenuUl").hide();
	});
	/*底部选择语言区*/
	$(".globalList").hover(function(){
		$(".globalListUl").show();
		$(".globalListUl li").hover(function(){
			$(this).css("background-color","#efefef");
			$(this).find("a").css("color","#ff4a00");
		},function(){
			$(this).css("background-color","#fff");
			$(this).find("a").css("color","#8c8c8c");});
	},function(){
		$(".globalListUl").css("display","");
	});
	/*底部选择语言区 end*/
});
var timer1;
var timer2;
var index=0;
function huadong(picwidth,picCount,selector)
{
	var Obj=$("#"+selector);
	var a=Math.floor((index)%picCount);
	Obj.animate({"left":"-"+a*picwidth+"px"},1000);
	if (index==picCount||index<0) {
		index=0;
	}
}

var count=0;
function showGoodsRA()
{
	if (count>4) {count=1}
	if (count<1) {count=4}
	$(".showGoodsRAPic").fadeOut(1000);
	$(".showGoodsRAPic[picid="+ count+"]").fadeIn(1000);
}