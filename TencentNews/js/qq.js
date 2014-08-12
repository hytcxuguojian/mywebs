$(function(){
	/*搜索区下拉菜单*/
	$("#searchSelect").hover(function(){
		$("#searchSelect ul").show();
	},function(){
		$("#searchSelect ul").hide();
	});

	$("#sosoTB").focus(function(){
		$(this).attr("value","");
	});
	$("#sosoTB").blur(function(){
		$(this).attr("value","QQ");
	});
	/*搜索区下拉菜单 end*/
	/*选项卡1*/
	$("#importantNews").hover(function(){
		$(this).attr("class","currentTitle");
		$("#importantNewsContent").css({
			"display":"block"
		});
		$("#jiangSuNews").attr("class","notcurrentTitle");
		$("#jiangsuNewsContent").css({
			"display":"none"
		});
	},function(){});

	$("#jiangSuNews").hover(function(){
		$(this).attr("class","currentTitle");
		$("#jiangsuNewsContent").css({
			"display":"block"
		});
		$("#importantNews").attr("class","notcurrentTitle");
		$("#importantNewsContent").css({
			"display":"none"
		});
	},function(){});

	$("#todayPlayT").hover(function(){
		$(this).attr("class","currentTitle");
		$("#todayPlayC").css({
			"display":"block"
		});
		$("#lm2MovieTVT").attr("class","notcurrentTitle");
		$("#lm2MovieTVC").css({
			"display":"none"
		});
	},function(){});

	/*选项卡2*/
	$("#lm2MovieTVT").hover(function(){
		$(this).attr("class","currentTitle");
		$("#lm2MovieTVC").css({
			"display":"block"
		});
		$("#todayPlayT").attr("class","notcurrentTitle");
		$("#todayPlayC").css({
			"display":"none"
		});
	},function(){});

	/*选项卡3*/
	$(".lm7LTitleNormal").hover(function(){
		var currentTitleId=$(this).attr("id");
		$(".lm7LTitleNormal").removeClass("lm7LTitleActive");
		$(this).addClass("lm7LTitleActive");
		$(".lm7LContent").removeClass("activeContent");
		$("#"+currentTitleId+"C").addClass("activeContent");
	},function(){});

	/*选项卡4*/
	$(".zhiShu").hover(function(){
		var currentTitleId=$(this).attr("id");
		$(".zhiShu").removeClass("currentZhishu");
		$(this).addClass("currentZhishu");
		$(".lm2LRight2Content2").removeClass("activeContent");
		$("#"+currentTitleId+"C").addClass("activeContent");
	},function(){});

	/*右侧菜单栏伸缩效果*/
	$("#rightArealR").hover(function(){
		$(this).css("background-position","-86px -79px");
	},function(){
		$(this).css("background-position","");
	});
	$("#rightArealR").click(function(){
		var state=$(this).attr("state");
		if (state==0) {
			$(this).css("left","-353px");
			$("#lm2RLineULC").show();
			$(this).attr("state",'1');
		}
		else
		{
			$(this).css("left","-14px");
			$("#lm2RLineULC").hide();
			$(this).attr("state",'0');
		}
	});

	/*大家爱看区效果*/
	$(".rightarea3contentUl li").hover(function(){
		$(this).css("background-color","#D3E0F0")
		$(this).parent().find(".rightArea3ContentSpecial").hide();
		$(this).find(".rightArea3ContentSpecial").show();
	},function(){
		$(this).css("background-color","")
	});

	/*淘宝商品展示区效果*/
	setInterval("showTaoBaoGoods()",1000);

	/*视觉焦点效果*/
	var picwidth=952;
	var picCount=3;
	var selector="layoutPicContentCenterUl";
	timer1=setInterval('$("#layoutPicContentCL").click()',3000);
	$("#layoutPicContent").hover(function(){
		clearInterval(timer1);
	},function(){
		timer1=setInterval('$("#layoutPicContentCL").click()',3000);
	});
	$("#layoutPicContentCL").click(function(){
		index++;
		huadong(picwidth,picCount,selector)
	});
	$("#layoutPicContentCR").click(function(){
		index--;
		huadong(picwidth,picCount,selector)
	});
});
var number=0;
function showTaoBaoGoods()
{
	if (number>16) {number=0};
	number++;
	$(".lm9RightContentUlli[num="+ number+"]").css("background-color","#f00");
	$(".lm9RightContentUlli[num!="+ number+"]").css("background-color","#fff");
	$("#lm9RightContent2 a[picid="+ number+"]").show();
	$("#lm9RightContent2 a[picid!="+ number+"]").hide();
}

var timer1;
var index=0;
function huadong(picwidth,picCount,selector)
{
	if (index==picCount) {
		index=0;
	}
	if (index<0) {index=(picCount--)};
	var Obj=$("#"+selector);
	var a=Math.floor((index)%picCount);
	Obj.animate({"left":"-"+a*picwidth+"px"},1000);

}