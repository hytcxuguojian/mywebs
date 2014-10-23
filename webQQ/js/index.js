$(function(){	
	/*改变背景*/
	$(".changeBgFre").click(function(){
		index--;
		if (index<1) {index=10};
		if (index>10) {index=1};
		changeBackground(index);
	});
	$(".changeBgNext").click(function(){
		index++;
		if (index<1) {index=10};
		if (index>10) {index=1};
		changeBackground(index);
	});

	/*********联系人选项卡切换*********/
	$(".menberTabLi").click(function(){
		var param=$(this).attr("param");
		$(".menberTabLi").removeClass("menberTabLiA");
		$(this).addClass("menberTabLiA");
		$(".menberTabBodyLi").removeClass("active");
		$("#menberTabBody-"+param).addClass("active");
	});

	/*底部选项卡切换事件*/
	$(".navTHead li").click(function(){
		var panelname=$(this).attr("id");
		$(".navTHead li").removeClass("Selected");
		$(this).addClass("Selected");
		$(".navTHead li").find("div").removeClass("newicon");
		$(this).find("div").addClass("newicon");
		$(".panel").hide();
		$("#"+panelname+"P").show();
	});

	/*查看联系人列表*/
	$(".listGroupTitle").click(function(){
		$(this).toggleClass("TitleActive");
		$(this).parent().find(".listGroupBody").toggleClass("active");
	});

	/***********************会话区事件*********************/
	/*删除按钮显隐*/
	$(document).on("mouseover","#huihualist .listItem",function(){
		$(this).find(".delete").show();
	});
	$(document).on("mouseout","#huihualist .listItem",function(){
		$(this).find(".delete").hide();
	});
	/*删除当前会话*/
	$(document).on("click",".delete",function(){
		var belongTolistItem=$(this).parent().attr("belongTo");
		$(this).parent().remove();
		$("#chatPanel-"+belongTolistItem).remove();
		$("#"+belongTolistItem).attr("newpanel",'false')
	});
	/*还原当前会话框*/
	$(document).on("click","#huihualist .listItem",function(){
		var belongToId=$(this).attr("belongTo");
		$("#chatPanel-"+belongToId).show();
		$(".chatPanel").css("z-index","40");
		$("#chatPanel-"+belongToId).css("z-index","100");
	});

	/************进行对话************/
	$(document).on("click",".listItem",function(){
		var nick=$(this).find(".member_nick b").html();
		var nick2=$(this).find(".member_nick span").html();
		var panelID=$(this).attr("id");
		var headimage=$(this).find(".avatar img").attr("src");
		var ischatting=$(this).attr("isChatting");
		var newpanel=$(this).attr("newPanel");
		if(newpanel=='false')
		{
			addChatPanel(panelID,nick);
			$(".chatPanel").draggable({handel:".chatHeader"});
			addHuihuaPanel(panelID,headimage,nick,nick2);
			$(this).attr("newPanel",true);
		}
		$("#chatPanel-"+panelID).fadeIn();
		$(".chatPanel").css("z-index","30");
		$("#chatPanel-"+panelID).css("z-index","100");
		return false;
	});

	/**************发送消息***************/
	/***点击发送按钮发送***/
	$(document).on("click",".sendBtn",function(){
		
		var content = $(this).parent().find(".chatTextarea").val();
		var id=$(this).attr("btnId");
		if (content!="")
		{
			if (showtimestate==true)
			{
				showTime(id);
				showtimestate=false;
			}
			sendmessage(id,content);
		}
		$(this).parent().find(".chatTextarea").val("");
	});
	

	/**************显示聊天窗口下拉菜单*************/
	$(document).on("click",".chatHeaderLeftButton",function(){
		var isshow=$(this).parent().parent().find(".pannelMenuList").attr("isshow");
		if (isshow=='false') 
		{
			$(this).parent().parent().find(".pannelMenuList").attr("isshow","true");
			$(this).parent().parent().find(".pannelMenuList").slideDown();
		}
		if (isshow=='true') 
		{
			$(this).parent().parent().find(".pannelMenuList").attr("isshow","false");
			$(this).parent().parent().find(".pannelMenuList").slideUp();
		}
	});

	/**************最小化聊天窗口*************/
	$(document).on("click",".chatHeaderRightButton",function(){
		$(this).parent().parent().hide();
	});

	/**************显示QQ表情*************/
	$(document).on("click",".addFaceBtn",function(){
		var isshow=$(this).parent().parent().find(".facemenu").attr("isshow");
		if (isshow=='false') 
		{
			$(this).parent().parent().find(".facemenu").attr("isshow","true");
			$(this).parent().parent().find(".facemenu").show();
		}
		if (isshow=='true') 
		{
			$(this).parent().parent().find(".facemenu").attr("isshow","false");
			$(this).parent().parent().find(".facemenu").hide();
		}
	});

	/*****添加QQ表情*****/
	$(document).on("click",".faceItem i",function(){
		var faceItem=$(this).attr("title");
		var content = $(this).parent().parent().parent().find(".chatTextarea").val();
		content=content+'['+faceItem+']';
		$(this).parent().parent().parent().find(".chatTextarea").val(content);
	});
	
	/********移动对话框********/
	$(document).on("click",".chatPanel",function(){
		$(".chatPanel").css("z-index","30");
		$(this).css("z-index",100);
	});

	/*设置登录状态*/
	$(".dropDown").click(function(){
		var openstate=$(this).attr("isopen");
		if (openstate==0) 
		{ 
			$(".onlineStateSetUl").show();
			$(this).attr("isopen","1");
		};
		if (openstate==1) 
		{ 
			$(".onlineStateSetUl").hide();
			$(this).attr("isopen","0");
		};
	});
	$(".onlineStateSetUl li").click(function(){
		var iClass=$(this).find("i").attr("class");
		$("#onlineState").removeClass();
		$("#onlineState").addClass("onlineStateSet");
		$("#onlineState").addClass(iClass);
		$(".avatarWrap span").removeClass();
		$(".avatarWrap span").addClass("userState");
		$(".avatarWrap span").addClass(iClass);
		$(".dropDown").click();
	});

	/*消息相关设置*/
	$(".messageSet").click(function(){
		$("#messageSetP").show();
		$(".chatPanel").css("z-index","30");
	});
	$(".leftbtn").click(function(){
		$("#messageSetP").hide();
	});
	$(".checkbox").click(function(){
		$(this).toggleClass("checked");
		$(this).find("span").toggleClass("spanChecked");
	});

	/*查看关于QQ*/
	$(".aboutQQ").click(function(){
		var openstate=$(this).attr("isopen");
		if (openstate==0) 
		{ 
			$("#aboutQQInfo").show();
			$(this).attr("isopen","1");

		};
		if (openstate==1) 
		{ 
			$("#aboutQQInfo").hide();
			$(this).attr("isopen","0");
		};
		$(this).find("span").toggleClass("more_icon_open");
	});

});
/*****切换背景******/
var index=1;
function changeBackground(picindex)
{
	$("#bgImage").find("img").hide(0,function(){
		$("#bgImage").find("img[picIndex="+picindex+"]").show();
	});
	
}

/******添加聊天窗口******/
function addChatPanel(id,name){
	var html="";
	html+='			<div class="chatPanel" id="chatPanel-'+id+'">';
	html+='				<div class="chatHeader">';
	html+='					<div class="chatHeaderLeftButton">';
	html+='						<span class="chatHeaderLeftButtonI"></span>';
	html+='					</div>';
	html+='					<h1 class="chatTitle">'+name+'</h1>';
	html+='					<div class="chatHeaderRightButton" title="最小化到会话栏">';
	html+='						<span class="chatHeaderRightButtonI">最小化</span>';
	html+='					</div>';
	html+='				</div>';
	html+='				<div class="chatBodyWrapper">';
	html+='					<div class="chatBodyBox">';
	html+='					</div>';
	html+='				</div>';
	html+='				<ul class="pannelMenuList" isshow="false">';
	html+='					<li>';
	html+='						<div class="menuListIcon menuListIcon1"></div>';
	html+='						QQ空间';
	html+='					</li>';
	html+='					<li>';
	html+='						<div class="menuListIcon menuListIcon2"></div>';
	html+='						详细资料';
	html+='					</li>';
	html+='					<li>';
	html+='						<div class="menuListIcon menuListIcon3"></div>';
	html+='						聊天记录';
	html+='					</li>';
	html+='				</ul>';
	html+='				<div class="chatFooter">';
	html+='					<ul class="facemenu" isshow="false">';
	html+='						<li class="faceItem">';
	html+='					        <i title="微笑"  num="1"></i>';
	html+='					        <i title="撇嘴" num="2"></i>';
	html+='					        <i title="色" num="3"></i>';
	html+='					        <i title="发呆" num="4"></i>';
	html+='					        <i title="得意" num="5"></i>';
	html+='					        <i title="流泪" num="6"></i>';
	html+='					        <i title="害羞" num="7"></i>';
	html+='					        <i title="闭嘴" num="8"></i>';
	html+='					        <i title="睡" num="9"></i>';
	html+='					        <i title="delKey"  class="delKey"></i>';
	html+='        				</li>';
	html+='					</ul>';
	html+='					<div class="chatToolbar">';
	html+='						<div class="addFaceBtn" >';
	html+='							<span class="btnImg"></span>';
	html+='						</div>';
	html+='						<textarea class="chatTextarea"></textarea>';
	html+='						<button class="sendBtn" btnId="'+id+'">';
	html+='							<span>发送</span>';
	html+='						</button>';
	html+='					</div>';
	html+='				</div>';
	html+='			</div>';
	$("#rightPanel").append(html);
}

/********添加会话窗口********/
function addHuihuaPanel(id,headimage,nick,nick2)
{
	var html="";
	html+='<li id="huihua-'+id+'" belongTo="'+id+'" class="listItem">';
	html+='	<a href="" class="avatar"><img src="'+headimage+'"></a>';
	html+='	<p class="member_nick">';
	html+='		<b>'+nick+'</b>';
	html+='		<span>'+nick2+'</span>';
	html+='	</p>';
	html+='	<p class="member_msg text_ellipsis"></p>';
	html+='	<span class="delete" title="删除当前会话"></span>';
	html+='</li>';
	$("#huihualist").prepend(html);
}

//显示时间
var showtimestate=true;
setInterval("shouldshowtime()",10000);
function shouldshowtime()
{
	showtimestate=true;
}

function showTime(id){
	var Time = new Date();
	var h = Time.getHours()<10?"0"+Time.getHours():Time.getHours();
	var m = Time.getMinutes()<10?"0"+Time.getMinutes():Time.getMinutes();
	var s = Time.getSeconds()<10?"0"+Time.getSeconds():Time.getSeconds();
	var T = h+":"+m+":"+s;
	var html="";
	html+='						<div class="chatTime">';
	html+='							<span>'+T+'</span>';
	html+='						</div>';
	$("#chatPanel-"+id).find(".chatBodyBox").append(html);
}

/*********发送消息********/
function sendmessage(id,content)
{
	var newContent=facetextTofaceicon(content);
	var html="";
	html+='<div class="chatContentSelf">';
	html+='	<img class="avatarImg" src="css/images/userpic.jpg">';
	html+='	<p class="chatNick">子胥吾有</p>';
	html+='	<p class="chatContent">'+newContent+'</p>';
	html+='</div>';
	$("#chatPanel-"+id).find(".chatBodyBox").append(html);
	$("#huihualist #huihua-"+id).find(".member_msg").html(newContent);/*对应会话窗口显示最近的消息*/
}

/*************将消息框中的表情文字代号转换为图标*************/
function facetextTofaceicon(content){
	for (var i = 0; i<= content.length - 1; i++) {
		content=content.replace("[微笑]","<img src='images/14.gif' />");
		content=content.replace("[撇嘴]","<img src='images/1.gif' />");
		content=content.replace("[色]","<img src='images/2.gif' />");
		content=content.replace("[发呆]","<img src='images/3.gif' />");
		content=content.replace("[得意]","<img src='images/4.gif' />");
		content=content.replace("[流泪]","<img src='images/5.gif' />");
		content=content.replace("[害羞]","<img src='images/6.gif' />");
		content=content.replace("[闭嘴]","<img src='images/7.gif' />");
		content=content.replace("[睡]","<img src='images/8.gif' />");
	}
	return content;
}
