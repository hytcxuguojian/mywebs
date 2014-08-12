$(function(){
	$(".ContentItem").hover(function(){
		$(this).css("border","2px solid #389cff")
		$(this).find(".ContentItemSpan").fadeOut();
	},function(){
		$(this).css("border","");
		$(this).find(".ContentItemSpan").fadeIn();
	});
});