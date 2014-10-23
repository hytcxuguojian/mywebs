$(function(){	
	var h=parseInt($(window).height());
	var height=h-106;
	$("body").css("height",height);
	/*主焦点图效果*/
	timer1=setInterval('$("#prev").click()',6000);
	$("#prev").click(function(){
		count++;
		showPic();
	});
	$("#next").click(function(){
		count--;
		showPic();
	});
	$("#section").hover(function(){
		clearInterval(timer1);
	},function(){
		timer1=setInterval('$("#prev").click()',5000);
	});
	$("#prev").hover(function(){
		$(this).css("background-color","rgba(10,10,10,0.1)");
	},function(){
		$(this).css("background-color","");
	});
	$("#next").hover(function(){
		$(this).css("background-color","rgba(10,10,10,0.1)");
	},function(){
		$(this).css("background-color","");
	});
	/*主焦点图效果 end*/

	/*导航栏效果*/
	$(".logoSpan").hover(function(){
		$(this).animate({"opacity":"0.3"});
	},function(){
		$(this).animate({"opacity":"0"});
	});

	$(".menuLi").hover(function(){
		$(this).find(".subUl").show();
		$("#menban").show();
	},function(){
		$(this).find(".subUl").hide();
		$("#menban").hide();
	});

	/*底部footer效果*/
	$("#showFooter").click(function(){
		var state=$(this).attr("isopen");
		if (state=="0")
		{
			$(this).attr("isopen","1");
			$("#footer").show();
			$(this).removeClass("closeFooter");
		}
		if (state=="1")
		{
			$(this).attr("isopen","0");
			$("#footer").hide();
			$(this).addClass("closeFooter");
		}
	});

	/*preContent*/
	$(".newsUl").click(function(){
		var state=$(this).find("span").attr("isopen");
		if (state=="0")
		{
			$(this).find("span").attr("isopen","1");
			$(this).find("span").addClass("open");
			$(this).animate({"height":"198px"},1000);
			$(this).find(".contain").animate({"opacity":"1"},3000);
		}
		if (state=="1")
		{
			$(this).find("span").attr("isopen","0");
			$(this).find("span").removeClass("open");
			$(this).animate({"height":"24px"},3000);
			$(this).find(".contain").animate({"opacity":"0"},1000);
			
		}
	});
});
var timer1;
var count=2;
function showPic()
{
	if (count>3) {count=1};
	if (count<1) {count=3};
	$(".preloadImages img").fadeOut();
	$(".preloadImages img[picid="+ count+"]").fadeIn();
}