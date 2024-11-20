/*網站區js*/
$(document).ready(function () {


	/*導覽列開合*/
	$(".js-navOpenBt").on('click', function () {
		// console.log("我有觸發click事件");
		//0.6 為整個動作在0.6秒間完成
		TweenMax.to(".js-patheader", 0.3, {
			ease: Power4.easeInOut,
			y: -200
		});
		TweenMax.to(".js-patnavBk", 0, {
			zIndex: 6,
			backgroundColor: "#FFF",
			opacity: 1
		});
		// TweenMax.staggerTo(".js-navBg", 0.4, { backgroundColor: "#FFF" ,width:"25%", opacity: 1, delay: 0.5, ease: Power4.inOut, }, 0.15);
		TweenMax.to(".js-patnavContent", 0.5, {
			zIndex: 7,
			opacity: 1,
			delay: 1
		});
		/*無障礙焦點*/
		$(".js-navOpenfocus").focus();
		$(".js-tabnone").attr("tabindex", " ");
	});
	$(".js-navCloseBt").on('click', function () {
		// console.log("我有觸發關閉事件");
		TweenMax.to(".js-patnavBk", 0.5, {
			zIndex: -1,
			delay: 1,
			opacity: 0
		});
		TweenMax.to(".js-patnavContent", 0.5, {
			zIndex: 0,
			opacity: 0,
			delay: 0.5
		});
		// TweenMax.staggerTo(".js-navBg", 0.4, { backgroundColor: "#C98B05" ,width:"0%", opacity: 0, delay: 0.5, ease: Power4.inOut, }, 0.15);
		TweenMax.to(".js-patheader", 0.3, {
			ease: Power4.easeInOut,
			y: 0,
			delay: 1
		});
		$(".js-tabnone").attr("tabindex", "-1");
	});


	/*搜尋區開合*/
	$(".js-navSearchBt").on('click', function () {
		// console.log("我有觸發click事件");
		//0.6 為整個動作在0.6秒間完成
		TweenMax.to(".js-patheader", 0.3, {
			ease: Power4.easeInOut,
			y: -200
		});
		TweenMax.to(".js-patSearchBk", 0, {
			zIndex: 5,
			backgroundColor: "#FFF",
			opacity: 1
		});
		// TweenMax.staggerTo(".js-searchBg", 0.4, { backgroundColor: "#FFF" ,width:"25%", opacity: 1, delay: 0.5, ease: Power4.inOut, }, 0.15);
		TweenMax.to(".js-patSearchContent", 0.5, {
			zIndex: 7,
			opacity: 1,
			delay: 1
		});
		/*無障礙焦點*/
		$("#___gcse_0").css("display", "block");
		$(".gsc-input").focus();
		$(".gstl_50").css("outline", "rgb(201, 139, 5) dashed medium ");
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
	$(".gsc-search-button").focus(function () {
		// 當元素獲得焦點時執行的代碼
		console.log($(".gsc-search-button").is(":focus"));
		$(".gstl_50").css("outline", "");
	});
	$(".js-searchCloseBt").on('click', function () {
		// console.log("我有觸發關閉事件");
		TweenMax.to(".js-patSearchBk", 0.5, {
			zIndex: -1,
			delay: 1,
			opacity: 0
		});
		TweenMax.to(".js-patSearchContent", 0.5, {
			zIndex: 0,
			opacity: 0,
			delay: 0.5
		});
		// TweenMax.staggerTo(".js-searchBg", 0.4, { backgroundColor: "#C98B05" ,width:"0%", opacity: 0, delay: 0.5, ease: Power4.inOut, }, 0.15);
		TweenMax.to(".js-patheader", 0.3, {
			ease: Power4.easeInOut,
			y: 0,
			delay: 1
		});
		$("#___gcse_0").css("display", "none");
		$(".js-tabnone").attr("tabindex", "-1");


	});


	/* 滑動消失header的logo*/
	$(window).scroll(function () {
		// alert(123);
		if ($(window).scrollTop() >= 400) {
			// $(".patSmlHeader").show();
			TweenMax.to(".js-headerLogo", 0.2, {
				ease: Power4.easeInOut,
				y: -200
			});
		} else if ($(window).scrollTop() <= 400) {
			// $(".patSmlHeader").hide();
			TweenMax.to(".js-headerLogo", 0.2, {
				ease: Power4.easeInOut,
				y: 0
			});
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
	$(".jsNoteBt").on('click', function () {
		// console.log("我有觸發click事件");
		$(".jsNavSmall").animate({
			left: '-320',
		});
		$(".jspatSmlNavNote").animate({
			left: '0',
		});
		$(".jsNavSml-openbg").show();
	});
	$(".jsNavSmlNote-bt--close").on('click', function () {
		// console.log("我有觸發關閉事件");
		$(".jspatSmlNavNote").animate({
			left: '-320',
		});
		$(".jsNavSml-openbg").fadeOut(500);
	});


	/*classify 打開select*/
	$(".js-eleClassifyBt").on('click', function () {
		if ($(".js-eleClassifySel").css("display") == "none") {
			$(".js-eleClassifySel").slideDown(300);
		} else if ($(".js-eleClassifySel").css("display") == "block") {
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
	// if($(window).width() >= 1280) {
	// 	$(".js-linkOpen").attr("aria-expanded","true");
	// 	$(".js-comtabno").attr("tabindex","-1");
	// }else {
	// 	$(".js-linkOpen").attr("aria-expanded","false");
	// 	$(".js-comtabno").attr("tabindex"," ");
	// }

	/*a.skip_main定位*/
	$("#patSkip_main", "#patSkip_acc").click(function () {
		$("#patSkip_main", "#patSkip_acc").css("position", "absolute");
	});


	/*footer開合*/
	$(".js-patFooter-openBt").on('click', function () {
		if ($(".js-patFooter-linkBk").css("display") == "none") {
			// $(".js-patFooter-linkBk").slideDown(500);
			$(".js-patFooter-linkBk").css("display", "flex");
			$(".js-patFooter-openBt--icon").addClass("patFooter-openBt--icon--rotate");
			$(".js-patFooter-openBt--text").text("關閉");
			$(".js-footer-tabno").attr("tabindex", " ");
		} else if ($(".js-patFooter-linkBk").css("display") == "flex") {
			// $(".js-patFooter-linkBk").slideUp(500);
			$(".js-patFooter-linkBk").css("display", "none");
			$(".js-patFooter-openBt--icon").removeClass("patFooter-openBt--icon--rotate");
			$(".js-patFooter-openBt--text").text("展開");
			$(".js-footer-tabno").attr("tabindex", "-1");
		}
	});

	/* 出現回頁頂按鈕*/
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 400) {
			TweenMax.to(".js-eletopBk-topBt", 0.2, {
				ease: Power4.easeInOut,
				opacity: 1
			});
			$(".js-eletopBk-topBt").on('click', function () {
				$(window).scrollTop(0);
				$("#patSkip_main").focus(); // 將焦點返回視窗起點
			});
		} else if ($(window).scrollTop() <= 400) {
			// console.log($(window).scrollTop());
			TweenMax.to(".js-eletopBk-topBt", 0.2, {
				opacity: 0
			});
		}
	});

	/* 出現FB粉絲團按鈕*/
	$(window).scroll(function () {
		if ($(".eleFbBk").hasClass("eleFbBk--page") && $(window).scrollTop() >= 400) {
			TweenMax.to(".eleFbBk--page", 0.2, {
				ease: Power4.easeInOut,
				opacity: 1
			});
		} else if ($(".eleFbBk").hasClass("eleFbBk--page") && $(window).scrollTop() <= 400) {
			TweenMax.to(".eleFbBk--page", 0.2, {
				opacity: 0
			});
		}
	});






});

//window.onload會等網頁的全部內容，包括圖片，CSS及<iframe>等外部內容載入後才會觸發，但$(document).ready()在Document Object Model (DOM) 載入後就會觸發，所以順序上$(document).ready()會比window.onload先執行。
//window.onload是JavaScript的原生事件，而$(document).ready()是jQuery的事件（其實是透過監聽JavaScript的DOMContentLoaded事件來實現）。
$(window).on('load', function () {
	TweenMax.to(".js-patLoadingAniBg", 1, {
		delay: 1,
		zIndex: -9999,
		opacity: 0
	});

	// 空氣品質監測
	var NowImg = 1; //表示當前顯示的div
	var MaxImg = 3; //表示div的個數
	const show = () => {
		for (let i = 1; i <= MaxImg; i++) {
			if (NowImg == i) {
				// document.getElementById("div"+NowImg).style.display='block';//當前顯示的div
				$(".js-indMainAir-section" + NowImg).css("display", "flex");
				$(".js-indMainAir-section" + NowImg).css("opacity", "1");
				// console.log(i);
			} else {
				$(".js-indMainAir-section" + i).css("display", "none");
				$(".js-indMainAir-section" + i).css("opacity", "0");
				// console.log( "i"+ i);
			}
		};
		if (NowImg == MaxImg) { //判斷當前div是否是最後一個，如果是則從第一個重新輪迴顯示
			NowImg = 1;
		} else {
			// console.log(NowImg);
			NowImg++; //設置下一個顯示的圖片
		};
	};
	setInterval(show, 5000); //設置定時器，顯示下一個圖片，10000表示每間隔10秒，可以改的

	/*監測svg text字體寬度*/

	if ($("#js-patPagMainbody-pagetitEnBk").hasClass("patPagMainbody-pagetitEnBk") == true) {
		let windowWidth = $(".patPagMainbody").width();
		let textAReaWidth = $("#js-patPagMainbody-pagetitEnBk text")[0].getBoundingClientRect().width;
		let textAReaWidthParseInt = parseInt(textAReaWidth);
		let textPaddingNum = (windowWidth - textAReaWidthParseInt) / 2;
		// console.log(windowWidth);
		// console.log(textAReaWidthParseInt);
		// console.log(textPaddingNum);
		$("#patPagMainbody-pagetitEn").attr("x", textPaddingNum);
		let textAReaHeight = $("#js-patPagMainbody-pagetitEnBk text")[0].getBoundingClientRect().height;
		// console.log(textAReaHeight);
		$("#patPagMainbody-pagetitEn").attr("y", textAReaHeight);
		/*svg text 動畫*/
		var tl = new TimelineLite();
		tl.to(".js-textani", 2, {
			strokeDashoffset: "0"
		}, "-=0.3");
	};

});

/*dialog-js*/
$(document).ready(function () {
	/*
	 *   This content is licensed according to the W3C Software License at
	 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
	 */

	'use strict';

	var aria = aria || {};

	aria.Utils = aria.Utils || {};

	(function () {
		/*
		 * When util functions move focus around, set this true so the focus listener
		 * can ignore the events.
		 */
		aria.Utils.IgnoreUtilFocusChanges = false;

		aria.Utils.dialogOpenClass = 'has-dialog';

		/**
		 * @description Set focus on descendant nodes until the first focusable element is
		 *       found.
		 * @param element
		 *          DOM node for which to find the first focusable descendant.
		 * @returns {boolean}
		 *  true if a focusable element is found and focus is set.
		 */
		aria.Utils.focusFirstDescendant = function (element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if (
					aria.Utils.attemptFocus(child) ||
					aria.Utils.focusFirstDescendant(child)
				) {
					return true;
				}
			}
			return false;
		}; // end focusFirstDescendant

		/**
		 * @description Find the last descendant node that is focusable.
		 * @param element
		 *          DOM node for which to find the last focusable descendant.
		 * @returns {boolean}
		 *  true if a focusable element is found and focus is set.
		 */
		aria.Utils.focusLastDescendant = function (element) {
			for (var i = element.childNodes.length - 1; i >= 0; i--) {
				var child = element.childNodes[i];
				if (
					aria.Utils.attemptFocus(child) ||
					aria.Utils.focusLastDescendant(child)
				) {
					return true;
				}
			}
			return false;
		}; // end focusLastDescendant

		/**
		 * @description Set Attempt to set focus on the current node.
		 * @param element
		 *          The node to attempt to focus on.
		 * @returns {boolean}
		 *  true if element is focused.
		 */
		aria.Utils.attemptFocus = function (element) {
			if (!aria.Utils.isFocusable(element)) {
				return false;
			}

			aria.Utils.IgnoreUtilFocusChanges = true;
			try {
				element.focus();
			} catch (e) {
				// continue regardless of error
			}
			aria.Utils.IgnoreUtilFocusChanges = false;
			return document.activeElement === element;
		}; // end attemptFocus

		/* Modals can open modals. Keep track of them with this array. */
		aria.OpenDialogList = aria.OpenDialogList || new Array(0);

		/**
		 * @returns {object|void} the last opened dialog (the current dialog)
		 */
		aria.getCurrentDialog = function () {
			if (aria.OpenDialogList && aria.OpenDialogList.length) {
				return aria.OpenDialogList[aria.OpenDialogList.length - 1];
			}
		};

		aria.closeCurrentDialog = function () {
			var currentDialog = aria.getCurrentDialog();
			if (currentDialog) {
				currentDialog.close();
				return true;
			}

			return false;
		};

		aria.handleEscape = function (event) {
			var key = event.which || event.keyCode;

			if (key === aria.KeyCode.ESC && aria.closeCurrentDialog()) {
				event.stopPropagation();
			}
		};

		document.addEventListener('keyup', aria.handleEscape);

		/**
		 * @class
		 * @description Dialog object providing modal focus management.
		 *
		 * Assumptions: The element serving as the dialog container is present in the
		 * DOM and hidden. The dialog container has role='dialog'.
		 * @param dialogId
		 *          The ID of the element serving as the dialog container.
		 * @param focusAfterClosed
		 *          Either the DOM node or the ID of the DOM node to focus when the
		 *          dialog closes.
		 * @param focusFirst
		 *          Optional parameter containing either the DOM node or the ID of the
		 *          DOM node to focus when the dialog opens. If not specified, the
		 *          first focusable element in the dialog will receive focus.
		 */
		aria.Dialog = function (dialogId, focusAfterClosed, focusFirst) {
			this.dialogNode = document.getElementById(dialogId);
			if (this.dialogNode === null) {
				throw new Error('No element found with id="' + dialogId + '".');
			}

			var validRoles = ['dialog', 'alertdialog'];
			var isDialog = (this.dialogNode.getAttribute('role') || '')
				.trim()
				.split(/\s+/g)
				.some(function (token) {
					return validRoles.some(function (role) {
						return token === role;
					});
				});
			if (!isDialog) {
				throw new Error(
					'Dialog() requires a DOM element with ARIA role of dialog or alertdialog.'
				);
			}

			// Wrap in an individual backdrop element if one doesn't exist
			// Native <dialog> elements use the ::backdrop pseudo-element, which
			// works similarly.
			var backdropClass = 'dialog-backdrop';
			if (this.dialogNode.parentNode.classList.contains(backdropClass)) {
				this.backdropNode = this.dialogNode.parentNode;
			} else {
				this.backdropNode = document.createElement('div');
				this.backdropNode.className = backdropClass;
				this.dialogNode.parentNode.insertBefore(
					this.backdropNode,
					this.dialogNode
				);
				this.backdropNode.appendChild(this.dialogNode);
			}
			this.backdropNode.classList.add('active');

			// Disable scroll on the body element
			document.body.classList.add(aria.Utils.dialogOpenClass);

			if (typeof focusAfterClosed === 'string') {
				this.focusAfterClosed = document.getElementById(focusAfterClosed);
			} else if (typeof focusAfterClosed === 'object') {
				this.focusAfterClosed = focusAfterClosed;
			} else {
				throw new Error(
					'the focusAfterClosed parameter is required for the aria.Dialog constructor.'
				);
			}

			if (typeof focusFirst === 'string') {
				this.focusFirst = document.getElementById(focusFirst);
			} else if (typeof focusFirst === 'object') {
				this.focusFirst = focusFirst;
			} else {
				this.focusFirst = null;
			}

			// Bracket the dialog node with two invisible, focusable nodes.
			// While this dialog is open, we use these to make sure that focus never
			// leaves the document even if dialogNode is the first or last node.
			var preDiv = document.createElement('div');
			this.preNode = this.dialogNode.parentNode.insertBefore(
				preDiv,
				this.dialogNode
			);
			this.preNode.tabIndex = 0;
			var postDiv = document.createElement('div');
			this.postNode = this.dialogNode.parentNode.insertBefore(
				postDiv,
				this.dialogNode.nextSibling
			);
			this.postNode.tabIndex = 0;

			// If this modal is opening on top of one that is already open,
			// get rid of the document focus listener of the open dialog.
			if (aria.OpenDialogList.length > 0) {
				aria.getCurrentDialog().removeListeners();
			}

			this.addListeners();
			aria.OpenDialogList.push(this);
			this.clearDialog();
			this.dialogNode.className = 'default_dialog'; // make visible

			if (this.focusFirst) {
				this.focusFirst.focus();
			} else {
				aria.Utils.focusFirstDescendant(this.dialogNode);
			}

			this.lastFocus = document.activeElement;
		}; // end Dialog constructor

		aria.Dialog.prototype.clearDialog = function () {
			Array.prototype.map.call(
				this.dialogNode.querySelectorAll('input'),
				function (input) {
					input.value = '';
				}
			);
		};

		/**
		 * @description
		 *  Hides the current top dialog,
		 *  removes listeners of the top dialog,
		 *  restore listeners of a parent dialog if one was open under the one that just closed,
		 *  and sets focus on the element specified for focusAfterClosed.
		 */
		aria.Dialog.prototype.close = function () {
			aria.OpenDialogList.pop();
			this.removeListeners();
			aria.Utils.remove(this.preNode);
			aria.Utils.remove(this.postNode);
			this.dialogNode.className = 'hidden';
			this.backdropNode.classList.remove('active');
			this.focusAfterClosed.focus();

			// If a dialog was open underneath this one, restore its listeners.
			if (aria.OpenDialogList.length > 0) {
				aria.getCurrentDialog().addListeners();
			} else {
				document.body.classList.remove(aria.Utils.dialogOpenClass);
			}
		}; // end close

		/**
		 * @description
		 *  Hides the current dialog and replaces it with another.
		 * @param newDialogId
		 *  ID of the dialog that will replace the currently open top dialog.
		 * @param newFocusAfterClosed
		 *  Optional ID or DOM node specifying where to place focus when the new dialog closes.
		 *  If not specified, focus will be placed on the element specified by the dialog being replaced.
		 * @param newFocusFirst
		 *  Optional ID or DOM node specifying where to place focus in the new dialog when it opens.
		 *  If not specified, the first focusable element will receive focus.
		 */
		aria.Dialog.prototype.replace = function (
			newDialogId,
			newFocusAfterClosed,
			newFocusFirst
		) {
			aria.OpenDialogList.pop();
			this.removeListeners();
			aria.Utils.remove(this.preNode);
			aria.Utils.remove(this.postNode);
			this.dialogNode.className = 'hidden';
			this.backdropNode.classList.remove('active');

			var focusAfterClosed = newFocusAfterClosed || this.focusAfterClosed;
			new aria.Dialog(newDialogId, focusAfterClosed, newFocusFirst);
		}; // end replace

		aria.Dialog.prototype.addListeners = function () {
			document.addEventListener('focus', this.trapFocus, true);
		}; // end addListeners

		aria.Dialog.prototype.removeListeners = function () {
			document.removeEventListener('focus', this.trapFocus, true);
		}; // end removeListeners

		aria.Dialog.prototype.trapFocus = function (event) {
			if (aria.Utils.IgnoreUtilFocusChanges) {
				return;
			}
			var currentDialog = aria.getCurrentDialog();
			if (currentDialog.dialogNode.contains(event.target)) {
				currentDialog.lastFocus = event.target;
			} else {
				aria.Utils.focusFirstDescendant(currentDialog.dialogNode);
				if (currentDialog.lastFocus == document.activeElement) {
					aria.Utils.focusLastDescendant(currentDialog.dialogNode);
				}
				currentDialog.lastFocus = document.activeElement;
			}
		}; // end trapFocus

		window.openDialog = function (dialogId, focusAfterClosed, focusFirst) {
			new aria.Dialog(dialogId, focusAfterClosed, focusFirst);
		};

		window.closeDialog = function (closeButton) {
			var topDialog = aria.getCurrentDialog();
			if (topDialog.dialogNode.contains(closeButton)) {
				topDialog.close();
			}
		}; // end closeDialog

		window.replaceDialog = function (
			newDialogId,
			newFocusAfterClosed,
			newFocusFirst
		) {
			var topDialog = aria.getCurrentDialog();
			if (topDialog.dialogNode.contains(document.activeElement)) {
				topDialog.replace(newDialogId, newFocusAfterClosed, newFocusFirst);
			}
		}; // end replaceDialog
	})();
	'use strict';
	/**
	 * @namespace aria
	 */

	var aria = aria || {};

	/**
	 * @description
	 *  Key code constants
	 */
	aria.KeyCode = {
		BACKSPACE: 8,
		TAB: 9,
		RETURN: 13,
		SHIFT: 16,
		ESC: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		DELETE: 46,
	};

	aria.Utils = aria.Utils || {};

	// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
	aria.Utils.matches = function (element, selector) {
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function (s) {
					var matches = element.parentNode.querySelectorAll(s);
					var i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {
						// empty
					}
					return i > -1;
				};
		}

		return element.matches(selector);
	};

	aria.Utils.remove = function (item) {
		if (item.remove && typeof item.remove === 'function') {
			return item.remove();
		}
		if (
			item.parentNode &&
			item.parentNode.removeChild &&
			typeof item.parentNode.removeChild === 'function'
		) {
			return item.parentNode.removeChild(item);
		}
		return false;
	};

	aria.Utils.isFocusable = function (element) {
		if (element.tabIndex < 0) {
			return false;
		}

		if (element.disabled) {
			return false;
		}

		switch (element.nodeName) {
			case 'A':
				return !!element.href && element.rel != 'ignore';
			case 'INPUT':
				return element.type != 'hidden';
			case 'BUTTON':
			case 'SELECT':
			case 'TEXTAREA':
				return true;
			default:
				return false;
		}
	};

	aria.Utils.getAncestorBySelector = function (element, selector) {
		if (!aria.Utils.matches(element, selector + ' ' + element.tagName)) {
			// Element is not inside an element that matches selector
			return null;
		}

		// Move up the DOM tree until a parent matching the selector is found
		var currentNode = element;
		var ancestor = null;
		while (ancestor === null) {
			if (aria.Utils.matches(currentNode.parentNode, selector)) {
				ancestor = currentNode.parentNode;
			} else {
				currentNode = currentNode.parentNode;
			}
		}

		return ancestor;
	};

	aria.Utils.hasClass = function (element, className) {
		return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
	};

	aria.Utils.addClass = function (element, className) {
		if (!aria.Utils.hasClass(element, className)) {
			element.className += ' ' + className;
		}
	};

	aria.Utils.removeClass = function (element, className) {
		var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
		element.className = element.className.replace(classRegex, ' ').trim();
	};

	aria.Utils.bindMethods = function (object /* , ...methodNames */ ) {
		var methodNames = Array.prototype.slice.call(arguments, 1);
		methodNames.forEach(function (method) {
			object[method] = object[method].bind(object);
		});
	};




});