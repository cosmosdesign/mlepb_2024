/*網站區js*/
$(document).ready(function() {

	/*導覽列開合*/
	$(".js-navOpenBt").on('click',function(){
		// console.log("我有觸發click事件");
		//0.6 為整個動作在0.6秒間完成
		TweenMax.to(".js-patheader", 0.3, {ease: Power4.easeInOut, y: -200 });
		TweenMax.to(".js-patnavBk", 0, {zIndex: 6 , backgroundColor: "#FFF", opacity: 1});
		TweenMax.staggerTo(".js-navBg", 0.4, { backgroundColor: "#FFF" ,width:"25%", opacity: 1, delay: 0.5, ease: Power4.inOut, }, 0.15);
		TweenMax.to(".js-patnavContent", 0.5, {zIndex: 7,opacity: 1,delay: 1});
		/*無障礙焦點*/
		$(".js-navOpenfocus").focus();
		$(".js-tabnone").attr("tabindex", " ");
	});
	$(".js-navCloseBt").on('click',function(){
		// console.log("我有觸發關閉事件");
		TweenMax.to(".js-patnavBk", 0.5, {zIndex: -1, delay: 1, opacity: 0});
		TweenMax.to(".js-patnavContent", 0.5, {zIndex: 0,opacity: 0,delay: 0.5});
		TweenMax.staggerTo(".js-navBg", 0.4, { backgroundColor: "#C98B05" ,width:"0%", opacity: 0, delay: 0.5, ease: Power4.inOut, }, 0.15);
		TweenMax.to(".js-patheader", 0.3, {ease: Power4.easeInOut, y: 0 ,delay: 1});
		$(".js-tabnone").attr("tabindex", "-1");
	});


	/*搜尋區開合*/
	$(".js-navSearchBt").on('click',function(){
		// console.log("我有觸發click事件");
		//0.6 為整個動作在0.6秒間完成
		TweenMax.to(".js-patheader", 0.3, {ease: Power4.easeInOut, y: -200 });
		TweenMax.to(".js-patSearchBk", 0, {zIndex: 5 , backgroundColor: "#FFF", opacity: 1});
		TweenMax.staggerTo(".js-searchBg", 0.4, { backgroundColor: "#FFF" ,width:"25%", opacity: 1, delay: 0.5, ease: Power4.inOut, }, 0.15);
		TweenMax.to(".js-patSearchContent", 0.5, {zIndex: 7,opacity: 1,delay: 1});
		/*無障礙焦點*/
		$("#___gcse_0").css("display" , "block");
		$(".gsc-input").focus();
		$(".gstl_50").css("outline" ,"rgb(201, 139, 5) dashed medium ");
		$(".js-tabnone").attr("tabindex", " ");
		$(".gsc-search-button").attr("tabindex", " ");

	});
	// var el = $("#my-element"); // 獲取要判斷的元素
	// 	if (el.is(":focus")) { // 比較是否與當前焦點元素相同
	// 	// 元素處在焦點狀態
	// 	} else {
	// 	// 元素不處在焦點狀態
	// 	}
	// if($(".gsc-search-button").is(":focus")){
	// 	console.log($(".gsc-search-button").is(":focus"));
	// 	$(".gstl_50").css("outline" ,"");
	// };
	$(".gsc-search-button").focus(function() {
		// 當元素獲得焦點時執行的代碼
		console.log($(".gsc-search-button").is(":focus"));
		$(".gstl_50").css("outline" ,"");
	});
	$(".js-searchCloseBt").on('click',function(){
		// console.log("我有觸發關閉事件");
		TweenMax.to(".js-patSearchBk", 0.5, {zIndex: -1, delay: 1, opacity: 0});
		TweenMax.to(".js-patSearchContent", 0.5, {zIndex: 0,opacity: 0,delay: 0.5});
		TweenMax.staggerTo(".js-searchBg", 0.4, { backgroundColor: "#C98B05" ,width:"0%", opacity: 0, delay: 0.5, ease: Power4.inOut, }, 0.15);
		TweenMax.to(".js-patheader", 0.3, {ease: Power4.easeInOut, y: 0 ,delay: 1});
		$("#___gcse_0").css("display" , "none");
		$(".js-tabnone").attr("tabindex", "-1");


	});


	/* 滑動消失header的logo*/
	$(window).scroll(function() {
		// alert(123);
		if($(window).scrollTop() >= 400){
			// $(".patSmlHeader").show();
			TweenMax.to(".js-headerLogo", 0.2, {ease: Power4.easeInOut, y: -200 });
		}else if($(window).scrollTop()<= 400){
			// $(".patSmlHeader").hide();
			TweenMax.to(".js-headerLogo", 0.2, {ease: Power4.easeInOut, y: 0 });
		}
	});


	/*小視口導覽列以及大視口導覽列第二層開合特效*/
	$(".js-navFirstLink").unbind('click').on('click',function(){
		// $(".js-navFirstLink > .js-navSecondLink").slideUp(300);
		if($(this).children(".js-navSecondLink").css("display") == "none" && $(window).width() <= 1280){
			// TweenMax.to(".js-navFirstLink > .js-navSecondLink", 0.5, {display: "none", opacity: 0 ,height:"0" ,ease: Power4.inOut});
			// var $thisSecondLink =  $(this).children(".js-navSecondLink");
			// TweenMax.to( $thisSecondLink, 0.5, {display: "block", opacity: 1 ,height:"auto" ,ease: Power4.inOut});
			$(".js-navFirstLink > .js-navSecondLink").slideUp(300);
            $(this).children(".js-navSecondLink").slideDown(300);
		}else if($(this).children(".js-navSecondLink").css("display") == "block" &&  $(window).width() <= 1280 ){
			$(this).children(".js-navSecondLink").slideUp(300);
		}

	});

	$(".js-navFirstLink--com").unbind('click').on('click',function(){
		// $(".js-navFirstLink > .js-navSecondLink").slideUp(300);
		if($(this).children(".js-navSecondLink").css("display") == "none" && $(window).width() >= 1280){
			// TweenMax.to(".js-navFirstLink > .js-navSecondLink", 0.5, {display: "none", opacity: 0 ,height:"0" ,ease: Power4.inOut});
			// var $thisSecondLink =  $(this).children(".js-navSecondLink");
			// TweenMax.to( $thisSecondLink, 0.5, {display: "block", opacity: 1 ,height:"auto" ,ease: Power4.inOut});
			$(".js-navFirstLink--com > .js-navSecondLink").slideUp(300);
            $(this).children(".js-navSecondLink").slideDown(300);
		}else if($(this).children(".js-navSecondLink").css("display") == "block" &&  $(window).width() >= 1280 ){
			$(this).children(".js-navSecondLink").slideUp(300);
		}

	});

	//小視口通知按鈕
	$(".jsNoteBt").on('click',function(){
		// console.log("我有觸發click事件");
		$(".jsNavSmall").animate({
		  left: '-320',
		});
		$(".jspatSmlNavNote").animate({
			left: '0',
		});
		$(".jsNavSml-openbg").show();
	});
	$(".jsNavSmlNote-bt--close").on('click',function(){
		// console.log("我有觸發關閉事件");
		$(".jspatSmlNavNote").animate({
			left: '-320',
		});
		$(".jsNavSml-openbg").fadeOut(500);
	});


	/*classify 打開select*/
	$(".js-eleClassifyBt").on('click',function(){
		if($(".js-eleClassifySel").css("display") == "none" ){
            $(".js-eleClassifySel").slideDown(300);
		}else if($(".js-eleClassifySel").css("display") == "block" ){
			$(".js-eleClassifySel").slideUp(300);
		}
	});

	// 出現錨點
	// $(".jsindthumbArea").css("display","none");
	// $(window).scroll(function(){
	// 	var bannerHeight = $(".indBanner").height();
	// 	// console.log("banner高度:"+bannerHeight);
	// 	var showBtH = bannerHeight - 150;
	// 	// console.log(bannerHeight + "- 150 = "+showBtH);
	// 	// 該元素只有適口1856px出現,如果抓不到,判斷式不會觸發
	// 	var eleHeight = $(".indele-pro05").offset().top;
	// 	var winHeight = $(window).height();
	// 	// console.log(eleHeight);
	// 	// console.log(winHeight);
	// 	var hidBtH = eleHeight - winHeight + 100;
	// 	// console.log("卷軸關閉高度"+hidBtH);
	// 	// console.log($(window).scrollTop());
	// 	if($(window).scrollTop()>= showBtH && $(window).scrollTop()<= hidBtH){
	// 		$(".jsindthumbArea").css("display","block");
	// 		TweenMax.staggerTo(".jsthumb", 0, {transform: "translateY(0px)", opacity:1, delay:0}, 0.1);
	// 	}else{
	// 		// console.log("關閉");
	// 		TweenMax.to(".jsthumb", 0.5, {transform: "translateY(-50px)", opacity:0, delay:0}, 0);
	// 	}
	// });

	//修改aria-expanded狀態
	if($(window).width() >= 1280) {
		$(".js-linkOpen").attr("aria-expanded","true");
		$(".js-comtabno").attr("tabindex","-1");
	}else {
		$(".js-linkOpen").attr("aria-expanded","false");
		$(".js-comtabno").attr("tabindex"," ");
	}

	/*a.skip_main定位*/
	$("#patSkip_main", "#patSkip_acc").click(function(){
		$("#patSkip_main","#patSkip_acc").css("position","absolute");
	});


	/*footer開合*/
	$(".js-patFooter-openBt").on('click',function(){
		if($(".js-patFooter-linkBk").css("display") == "none" ){
            // $(".js-patFooter-linkBk").slideDown(500);
			$(".js-patFooter-linkBk").css("display", "flex");
            $(".js-patFooter-openBt--icon").addClass("patFooter-openBt--icon--rotate");
            $(".js-patFooter-openBt--text").text("Close");
			$(".js-footer-tabno").attr("tabindex", " ");
		}else if($(".js-patFooter-linkBk").css("display") == "flex" ){
			// $(".js-patFooter-linkBk").slideUp(500);
			$(".js-patFooter-linkBk").css("display", "none");
			$(".js-patFooter-openBt--icon").removeClass("patFooter-openBt--icon--rotate");
            $(".js-patFooter-openBt--text").text("Open");
			$(".js-footer-tabno").attr("tabindex", "-1");
		}
	});

	/* 出現回頁頂按鈕*/
	$(window).scroll(function() {
		if($(window).scrollTop() >= 400){
			TweenMax.to(".js-eletopBk-topBt", 0.2, {ease: Power4.easeInOut, opacity: 1 });
			$(".js-eletopBk-topBt").on('click' , function(){
				$(window).scrollTop(0);
    			$("#patSkip_main").focus(); // 將焦點返回視窗起點
			});
		}else if($(window).scrollTop() <= 400){
			// console.log($(window).scrollTop());
			TweenMax.to(".js-eletopBk-topBt", 0.2, {opacity: 0 });
		}
	});

	/* 出現FB粉絲團按鈕*/
	$(window).scroll(function() {
		if($(".eleFbBk").hasClass("eleFbBk--page") && $(window).scrollTop() >= 400){
			TweenMax.to(".eleFbBk--page", 0.2, {ease: Power4.easeInOut, opacity: 1 });
		}else if($(".eleFbBk").hasClass("eleFbBk--page") && $(window).scrollTop() <= 400){
			TweenMax.to(".eleFbBk--page", 0.2, {opacity: 0 });
		}
	});



});

//window.onload會等網頁的全部內容，包括圖片，CSS及<iframe>等外部內容載入後才會觸發，但$(document).ready()在Document Object Model (DOM) 載入後就會觸發，所以順序上$(document).ready()會比window.onload先執行。
//window.onload是JavaScript的原生事件，而$(document).ready()是jQuery的事件（其實是透過監聽JavaScript的DOMContentLoaded事件來實現）。
$(window).on('load',function(){
	TweenMax.to(".js-patLoadingAniBg", 1, { delay: 1, zIndex: -9999, opacity: 0});

	// 空氣品質監測
	var NowImg = 1;//表示當前顯示的div
	var MaxImg = 3;//表示div的個數
	const show = ()=>{
		for(let i=1; i<=MaxImg ; i++){
			if(NowImg==i){
				// document.getElementById("div"+NowImg).style.display='block';//當前顯示的div
				$(".js-indMainAir-section" + NowImg).css("display","flex");
				$(".js-indMainAir-section" + NowImg).css("opacity","1");
				// console.log(i);
			}else{
				$(".js-indMainAir-section" + i).css("display","none");
				$(".js-indMainAir-section" + i).css("opacity","0");
				// console.log( "i"+ i);
			}
		};
		if(NowImg == MaxImg){//判斷當前div是否是最後一個，如果是則從第一個重新輪迴顯示
			NowImg = 1;
		}else{
			// console.log(NowImg);
			NowImg++;//設置下一個顯示的圖片
		};
	};
	setInterval(show,5000);//設置定時器，顯示下一個圖片，10000表示每間隔10秒，可以改的

	/*監測svg text字體寬度*/

	if($("#js-patPagMainbody-pagetitEnBk").hasClass("patPagMainbody-pagetitEnBk") == true){
		let windowWidth = $(".patPagMainbody").width();
		let textAReaWidth = $("#js-patPagMainbody-pagetitEnBk text")[0].getBoundingClientRect().width;
		let textAReaWidthParseInt = parseInt(textAReaWidth);
		let textPaddingNum = (windowWidth - textAReaWidthParseInt) / 2;
		// console.log(windowWidth);
		// console.log(textAReaWidthParseInt);
		// console.log(textPaddingNum);
		$("#patPagMainbody-pagetitEn").attr("x",textPaddingNum);
		let textAReaHeight = $("#js-patPagMainbody-pagetitEnBk text")[0].getBoundingClientRect().height;
		// console.log(textAReaHeight);
		$("#patPagMainbody-pagetitEn").attr("y",textAReaHeight);
		/*svg text 動畫*/
		var tl = new TimelineLite();
		tl.to(".js-textani", 2, {strokeDashoffset:"0"}, "-=0.3");
	};






});


