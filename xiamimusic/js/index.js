$(window).load(function(){
	var myaudio=document.getElementById("myaudio");
	$(".playBtn").click();
	$("#music1 .playIcon").click();
});
$(function(){
	/*******背景模糊效果******/
	setTimeout("loadBG()",100);

	/*******复选框******/
	$(".checkIn").hover(function(){
		if ($(this).attr("select")=="0")
		{
			$(this).css("background-position","-19px -710px");
		}
	},function(){
		if ($(this).attr("select")=="0")
		{
			$(this).css("background-position","-1px -710px");
		}
	});

	$(".checkIn").click(function(){
		var select=$(this).attr("select");
		if (select=="0")
		{
			$(this).attr("select","1");
			$(this).css("background-position","-37px -710px");
		}
		if (select=="1")
		{
			$(this).attr("select","0");
			$(this).css("background-position","-1px -710px");
			
		}
	});
	$(".checkAll").hover(function(){
		if ($(this).attr("select")=="0")
		{
			$(this).css("background-position","-19px -710px");
		}
	},function(){
		if ($(this).attr("select")=="0")
		{
			$(this).css("background-position","-1px -710px");
		}
	});
	$(".checkAll").click(function(){
		var select=$(this).attr("select");
		if (select=="0")
		{
			$(this).attr("select","1");
			$(this).css("background-position","-37px -710px");
			$(".checkIn").attr("select","1");
			$(".checkIn").css("background-position","-37px -710px");
		}
		if (select=="1")
		{
			$(this).attr("select","0");
			$(this).css("background-position","-1px -710px");
			$(".checkIn").attr("select","0");
			$(".checkIn").css("background-position","-1px -710px");
		}
	});


	/*******显示更多和删除******/
	$(".playListContentli").hover(function(){
		$(this).find(".playIcon").show();
		$(this).find("em").hide();
		$(this).find(".more").show();
		$(this).find(".dele").show();
	},function(){
		$(this).find(".playIcon").hide();
		$(this).find("em").show();
		$(this).find(".more").hide();
		$(this).find(".dele").hide();
	});

	/*******播放音乐******/
	$(".playBtn").click(function(){
		var isplay=$(this).attr("isplay");
		if(isplay=="0")
		{
			$(this).attr("isplay","1");
			$(this).css("background-position","0 -30px");
			$(".iplay").css("background",'url("css/images/T1oHFEFwGeXXXYdLba-18-18.gif") 0 0');
		}
		if(isplay=="1")
		{
			$(this).attr("isplay","0");
			$(this).css("background-position","0 0");
			$(".iplay").css("background",'url("css/images/T1bMh.FxNXXXb_r3IF-72-730.png") 0 -358px');
		}
		if (myaudio.paused) 
		{
			myaudio.play();
		}
		else
		{
			myaudio.pause();
		}
		//添加监听事件
		//播放器播放时间发生改变的事件
		myaudio.addEventListener('timeupdate',syncProgress,false);
		//播放结束事件
		// myaudio.addEventListener('ended',myaudioEnded,false); 
	});
	/*******播放列表中的播放按钮******/
	$(".playIcon").click(function(){
		var parentli=$(this).parent().parent().parent();
		$(".playListContentli").removeClass("active");
		parentli.addClass("active");
		$(".manyou").hide();
		parentli.find(".manyou").show();
		$(".playingIcon").attr("class","playIcon");
		$(this).attr("class","playingIcon");
		$("em").show();
		parentli.find("em").hide();
		$(".playIcon").hide();
		$(".playBtn").attr("isplay","1");
		$(".playBtn").css("background-position","0 -30px");

		$("#bgcanvas").attr("src",parentli.attr("bgCanvas"));
		setTimeout("loadBG()",100);
		$("#myaudio").attr("src",parentli.attr("musicUrl"));
		myaudio.load();
		myaudio.play();

		$(".trackInfo .songName").html(parentli.find(".songName").html()+'&nbsp-&nbsp');
		$(".trackInfo .songPlayer").html(parentli.find(".songer").html());
		var liLrc=parentli.attr("id");
		showLrc(getlrctext(getLrc(liLrc)));
	});


	/*********播放器进度条控制*********/
	//拖动进度条
	$(".dian" ).draggable({ 
		containment:".pro2",
		drag: function() {
			var p=$(".dian").css("left");
			var position = parseInt(p);
			myaudio.currentTime=myaudio.duration*(position/678);
      	}
	});
	//点击滚动条跳转
	$(".pro2").click(function(e){
		var offset = $(this).offset();
		var relativeX = (e.pageX - offset.left);
		myaudio.currentTime=myaudio.duration*(relativeX/678);
	});

	/*********播放器音量控制*********/
	$( ".dian2" ).draggable({ 
		containment:".volControl",
		drag: function() {
			var p=$(".dian2").css("left");
			var position = parseInt(p);
			myaudio.volume=(position/80);
			$(".volposition").css("width",p);
      }
	});
	//点击音量条跳转
	$(".volControl").click(function(e){
		var offset = $(this).offset();
		var relativeX = (e.pageX - offset.left);
		myaudio.volume=(relativeX/80);
		$(".volposition").css("width",relativeX);
		$(".dian2").css("left",relativeX)
	});

	
});

/*背景模糊效果*/
function loadBG(){
	// stackBlurImage('canvas1', 'canvas', 60, false);
	var canvas =document.getElementById("mycanvas");
	var ctx=canvas.getContext("2d");
	var img=document.getElementById("bgcanvas");
	ctx.drawImage(img,45,45,139,115,0,0,1366,700);
	stackBlurCanvasRGBA('mycanvas',0,0,1366,700,60);
}
//计算歌曲的播放时间
function carculatePlayTime(time){
	var hour;
	var minute;
	var second;
	hour = String(parseInt ( time / 3600 , 10 ));
	if (hour.length ==1 )   hour='0'+hour;
	minute=String(parseInt((time%3600)/60,10));
	if(minute.length==1) minute='0'+minute;
	second=String(parseInt(time%60,10));
	if(second.length==1)second='0'+second;
	if(hour=='00')
		return minute+":"+second;
	else
		return hour+":"+minute+":"+second;
}
//同步进度条
function syncProgress(){
	/*显示歌曲总长度*/
	var musicLength= carculatePlayTime(myaudio.duration);
	$(".duration").html(musicLength);
	/*显示歌曲当前时间*/
	var currentTime= carculatePlayTime(myaudio.currentTime);
	$(".position").html(currentTime);
	/*进度条*/
	var p = 678*(myaudio.currentTime/myaudio.duration);
	var position = Math.floor(p).toString()+"px";
	$(".dian").css("left",position);
	$(".playposition").css("width",position);
	syncLrc();
}

//取得歌词
function getLrc(song){
	var lrc="";
	if (song=="music1") 
	{
		lrc="[00:00:00]盛夏光年（live）[00:03:00]作词：阿信·五月天[00:04:00]作曲：阿信·五月天[00:05:00]演唱：陈冰[00:12:00][00:14:00]我骄傲的破坏[00:17:00]我痛恨的平凡[00:19:00]才想起那些是我最爱[00:23:00][00:24:00]让盛夏去贪玩[00:27:00]把残酷的未来[00:29:00]狂放到光年外[00:34:00][00:34:00]放弃规则 放纵去爱[00:39:00]放肆自己 放空未来[00:44:00]我不转弯 我不转弯[00:49:00]我不转弯 我不转弯[00:56:00][01:14:00]我要我疯 我要我爱 就是[01:17:00]我要我疯 我要我爱[01:19:00]一万首的mp3 一万次疯狂的爱[01:21:00]灭不了一个渺小的孤单[01:25:00]我要我疯 我要我爱 就是[01:27:00]我要我疯 我要我爱[01:29:00]盛夏的一场狂欢 来到了光年之外[01:32:00]长大难道是人必经的溃烂[01:35:00][01:36:00]放弃规则 放纵去爱[01:40:00]放肆自己 放空未来[01:45:00]我不转弯 我不转弯[01:50:00]我不转弯 我不转弯[01:58:00][02:05:00]我不转弯[02:15:00]我不转弯我不 我不转弯我不 我不转弯[02:25:00]我不转弯[02:36:00]";
	}
	if (song=="music2") 
	{
		lrc="[00:00.00]What Are Words[00:05.00]Chris Medina[00:08.88][00:14.00][00:16.08]Anywhere you are, I am near[00:20.00]Anywhereyou go, I＇ll be there[00:24.00]Anytime you whisper my name, you＇ll see[00:31.88]How every single promise I keep[00:35.00]Cuz what kind of guy would I be[00:39.00]If I was to leave when you need me most[00:47.00]What are words[00:48.04]If you really don＇t mean them[00:51.00]When you say them[00:55.00]What are words[00:56.08]If they＇re only for good times[00:58.88]Then it＇s on[01:02.88]When it＇s love[01:03.98]Yeah, you see them as lover＇s words[01:06.88]They never go away[01:09.68]They live on, even when we＇re gone[01:18.06]And I know an angel would say[01:22.02]Just from me and now know I＇m meant[01:26.01]To be where I am and I＇m gonna be[01:32.98]Standing right beside her tonight[01:37.00]And I＇m gonna be by your side[01:41.04]I would never leave when she needs me most[01:49.04]What are words[01:50.09]If you really don＇t mean them[01:53.01]When you say them[01:57.00]What are words[01:58.04]If they＇re only for good times[02:01.00]Then it＇s off[02:04.04]When it＇s love[02:06.00]Yeah, you see them as lover＇s words[02:09.01]They never go away[02:12.04]They live on, even when we＇re gone[02:20.01]Anywhere you are, I am near[02:24.02]Anywhere you go, I＇ll be there[02:28.00]And I＇m gonna be here forever more[02:35.04]Every single promise I keep[02:39.03]Cuz what kind of guy would I be[02:43.01]If I was to leave when you need me most[02:50.88]I＇m forever keeping my angel close[03:05.00][03:06.00]本歌词由网友sg提供";
	}
	return lrc;
}
//得到歌词中的歌词文本部分
function getlrctext(lrc){
	var lrclines= lrc.split('[');
	var lrctext=new Array();
	if (lrc=="") { return ""}
	for (var i = 1; i<lrclines.length - 1; i++) 
	{
		var lrcline=lrclines[i].split(']');
		lrctext[i-1]=lrcline[1];
	}
	return lrctext;
}

//得到歌词中的歌词时间部分
function getlrctime(lrc){
	var lrclines= lrc.split('[');
	var lrctime=new Array();
	for (var i = 1; i<lrclines.length - 1; i++) 
	{
		var lrcline=lrclines[i].split(']');
		lrctime[i-1]=lrcline[0].substring(0,5);
	}
	return lrctime;
}

//显示歌词，将每行歌词追加到歌词显示区域
function showLrc(lrctext){
	$(".lrcUl").css("top","0");
	$(".lrcUl").html("");
	var html='';
	if (lrctext=="")
	{
		html+='<div class="no-lrc"></div>';
		$(".lrcUl").append(html);
		return;
	}
	for (var i = 0; i<lrctext.length - 1; i++) 
	{
		html+='<li class="lrcLi" num='+i+'>'+lrctext[i]+'</li>';
	}
	$(".lrcUl").append(html);
}
//歌词同步
function syncLrc(){
	var lrc=$(".active").attr("id");
	var lrctime=getlrctime(getLrc(lrc));
	var currentTime= carculatePlayTime(myaudio.currentTime);
	for (var i = 0; i< lrctime.length - 1; i++) 
	{
		if(currentTime.toString()==lrctime[i].toString())
		{
			$(".lrcLi").removeClass("currentli");
			$('.lrcLi[num='+i+']').addClass("currentli");
			if (i>5) 
			{
				$(".lrcUl").animate({"top":-28*i+140+"px"},1000);
			}
			
			// var p = 678*(myaudio.currentTime/myaudio.duration);
			// var position = Math.floor(p).toString()+"px";
		}
	}
	
}