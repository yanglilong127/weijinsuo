// JavaScript Document

$(function(){
	//当文档加载完成后加载
	//轮播图
	function imgSize(){
		var winW=$(window).width();    //获取屏幕宽度	
		var isSmScreen=winW<768;		//判断当前是否为小屏幕
		//var _height=isSmScreen?340:410;  //确定轮播图盒子的高度
		$("#main-ad .carousel-inner .item").each(function(i, element) {
			//element是DOM对象，需要将其转换为jq对象
			var $item=$(element);
			var imgSrc=isSmScreen?$item.data("img-xs"):$item.data("img-lg");
			$item.css({"backgroundImage":"url("+imgSrc+")"});
			if(isSmScreen)
				$item.html("<img src='"+imgSrc+"' alt='小图'>");
			else $item.html("");
		});
	
	};
	imgSize();
	ulSize();
	//给标签导航设定宽度让其出现横向滚动条
	function ulSize(){
		var ul_width=60;     //标签盒子的宽度
		$(".ul-wrapper ul.nav-tabs li").each(function(index, element) {
			ul_width+=$(element).width();
		});
		//当屏幕宽度小于导航条宽度时
		if($(window).width()<ul_width)
			$(".nav.nav-tabs").css("width",""+ul_width+"px").parent().css("overflow-x","scroll");
		else 
			$(".nav.nav-tabs").css("width","auto").parent().css("overflow-x","hidden");
	};
	//当窗口大小改变时
	$(window).resize(function(){
		ulSize();
		imgSize();
		
	});
	//初始化tooltips,提示生效
	$('[data-toggle="tooltip"]').tooltip();
	
	//新闻块点击图标更改文字
	$("#news .container .row .nav.nav-pills li a").click(function(){
		$("#news .news-title").text($(this).data("title"));
		});
	
	
	//模态框
	$('#myModal').on('hidden.bs.modal', function (e) {
	  // do something...
	});
	
	/*****轮播图手指左右滑动****/
	//获取界面上轮播图容器 
	var startX;   //手指触摸坐标
	var endX;   //手指触摸结束坐标
	$(".carousel").on('touchstart',function(e){
		//手指触摸开始时记录一下手指所在的坐标X;
		startX=e.originalEvent.touches[0].clientX;
		});
	$(".carousel").on('touchmove',function(e){
		//手指触摸移动时记录一下手指所在的坐标X;
		endX=e.originalEvent.touches[0].clientX;
		});
	$(".carousel").on('touchend',function(){
		var distance=Math.abs(startX-endX);
		if(distance>50)
			$(this).carousel(startX>endX? "next" : "prev")	
	});
});