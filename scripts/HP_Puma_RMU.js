
var timeTextToggle = 5;
var timeTextFade = .5;
var timeDivFade = 1;
var timeExpand = 1;
var timePulse = 1;
var timeDotMove = .5;
var idxCurrCollapsedText = 0;
var idxCurrFeature = 0;
var idxFrame;
var currDotID = "";
var timeNow = 0;
var clickX = 0;
var clickXNew = 0;
var numSpinFramesAfterSwipe = 8;
var arrExtraSpins = [45, 30, 20, 14, 8, 4];  // !first item should be one less than the number of spin images
var arrSwipTimesToSpin = [150, 200, 300, 400, 500, 600];
var maxSwipeTime = 400;
var arrFeatureBoxes = ['#featureMain', '#feature1', '#feature2', '#feature3', '#feature4', '#footnoteScrollBox']
var marginLeftBlueDot1;
var marginLeftBlueDot2;
var marginLeftBlueDot3;
var marginLeftBlueDot4;
var marginTopBlueDot1;
var marginTopBlueDot2;
var marginTopBlueDot3;
var marginTopBlueDot4;

var bFootnoteShowing = false;

var arrFootnotes = ["<sup>1</sup>Mopria is a mobile printing standard that enables easy mobile printing between Mopria certified printers and mobile device&ndash;without the need for a special app or software. Learn more at <a href='#'>URL</a>. HP printer and mobile device must be connected to the same wireless network or have a direct wireless connection. Performance is dependent on physical environment and distance from the wireless access point. Wireless operations are compatible with 2.4GHz routers only. Separately purchased data plans or usage fees may apply. Print times and connection speeds may vary.", "<sup>2</sup>Wireless direct printing is standard on the HP Color LaserJet Pro MFP M476nw and dw only. This feature can be enabled with separate purchase and installation of the HP Mobile Print Accessory for the HP Color LaserJet Pro MFP M476dn. Mobile device needs to be connected directly to the WiFi network of a wireless direct-capable printer prior to printing. Depending on mobile device, an app or driver may also be required. Wireless performance is dependent on physical environment and distance from the access point in the printer.<br><br><sup>3</sup>Touch-to-print capability is standard on the HP Color LaserJet Pro MFP M476 dw only. This feature can be enabled with separate purchase and installation of the HP Mobile Print Accessory for the HP Color LaserJet Pro MFP M476dn and nw. Mobile device must support near field communications–enabled printing. For a list of supported devices, see <a href='http://hp.com/go/mobileprinting'>hp.com/go/mobileprinting</a>", "<sup>4</sup>Requires an Internet connection to an HP web-enabled printer and HP ePrint account registration. (For a list of eligible printers, supported documents and image types, and other HP ePrint details, see hpconnected.com.) Mobile devices require Internet connection and email capability. May require wireless access point. Separately purchased data plans or usage fees may apply. Print times and connection speeds may vary."];

var arrFrames = ["img/513_00047.png", "img/513_00048.png", "img/513_00049.png", "img/513_00050.png", "img/513_00051.png", 
				"img/513_00052.png", "img/513_00053.png", "img/513_00008.png", "img/513_00009.png", "img/513_00010.png", 
				"img/513_00011.png", "img/513_00012.png", "img/513_00013.png", "img/513_00014.png", "img/513_00015.png", 
				"img/513_00016.png", "img/513_00017.png", "img/513_00018.png", "img/513_00019.png", "img/513_00020.png", 
				"img/513_00021.png", "img/513_00022.png", "img/513_00023.png", "img/513_00024.png", "img/513_00025.png", 
				"img/513_00026.png", "img/513_00027.png", "img/513_00028.png", "img/513_00029.png", "img/513_00030.png",
		        "img/513_00031.png", "img/513_00032.png", "img/513_00033.png", "img/513_00034.png", "img/513_00035.png", 
		        "img/513_00036.png", "img/513_00037.png", "img/513_00038.png", "img/513_00039.png", "img/513_00040.png", 
		        "img/513_00041.png", "img/513_00042.png", "img/513_00043.png", "img/513_00044.png", "img/513_00045.png", "img/513_00046.png"];

var arrBlueDot1OffsetsX = [0, -3, -6, -12, -19, -24, -24, -24, -22, -16, 
							-8, 0, 7, 14, 28, 47, 57, 63, 73, 82, 
							89, 94, 98, 104, 110, 114, 121, 124, 129, 136, 
							151, 169, 169, 169, 162, 152, 140, 131, 109, 103, 
							81, 65, 53, 38, 23, 10];
var arrBlueDot1OffsetsY = [0, 3, 3, 5, 5, 5, 5, 6, 6, 6, 
							7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 
							9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 
							0, 4, 4, 4, 3, 3, 3, 3, 10, 4, 
							7, 3, 2, 2, 3, 1];
var arrBlueDot2OffsetsX = [3, 1, 1, -1, 2, -2, -3, -3, -16, -28, 
							-44, -53, -64, -78, -90, -101, -114, -124, -132, -144, 
							-148, -150, -156, -158, -160, -162, -163, -999, -999, -999, 
							-999, -999, -999, -999, -999, -999, -999, -999, -999, -33, 
							-27, -22, -17, -9, -2, 2];
var arrBlueDot2OffsetsY = [0, 0, 0, 1, -1, -1, -1, -1, 3, 4, 
							4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 
							1, 1, 2, 1, 0, -1, 0, 0, -999, -999, 
							-999, -999, -999, -999, -999, -999, -999, -999, -999, -1, 
							-1, -4, -4, -4, -3, -3];
var arrBlueDot3OffsetsX = [0, -20, -38, -56, -64, -69, -71, -77, -85, -82, 
							-76, -82, -81, -74, -68, -67, -67, -60, -55, -53, 
							-44, -37, -20, -5, 11, 30, 52, 62, 67, 73,
							90, 115, 119, 122, 124, 122, 118, 114, 105, 84, 
							65, 47, 42, 39, 28, 19];
var arrBlueDot3OffsetsY = [0, 0, -1, -3, -3, -3, -4, -4, -4, -4, 
							-1, -4, -7, -8, -8, -9, -9, -9, -9, -9, 
							-9, -9, -9, -9, -9, -9, -9, -9, -9, -4,  
							-4, -4, -4, -4, -4, 0, 2, 4, 9, 11,
							11, 11, 7, 7, 3, 3];
var arrBlueDot4OffsetsX = [0, -2, -5, -11, -21, -30, -40, -57, -74, -94, 
							-118, -139, -158, -175, -194, -999, -999, -999, -999, -999, 
							-999, -999, -999, -999, -999, -999, -999, -999, -999, -999, 
							-999, -999, -999, -999, -999, -999, -999, -999, -999, -999,
							-30, -22, -17, -10, -5, -3];
var arrBlueDot4OffsetsY = [0, 2, 3, 7, 11, 11, 14, 14, 17, 15, 
							15, 14, 13, 11, 9, -999, -999, -999, -999, -999, 
							-999, -999, -999, -999, -999, -999, -999, -999, -999, -999, 
							-999, -999, -999, -999, -999, -999, -999, -999, -999, -999,
							-10, -8, -7, -5, -2, -2];

$(function() {



	// Listen to message from parent
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent,function(e) {
	console.log('iFrame received message!:  ',e.data);
		// gotMessage(e.data);
		receiveDataFromParent(e.data);
		// gotMessage(e.data);
	},false);

	//--- to send message to parent  ---//
		// var pass_data = {
		//     'todo':'expand',
		//     'amt': expandedHeight
		// };
		// parent.postMessage(JSON.stringify(pass_data), "*");
	//--- to send message to parent  ---//

	function sendDataToParent(sTodo, sAmt) {
		var pass_data = {
		    'todo':sTodo,
		    'amt': sAmt
		};
		parent.postMessage(JSON.stringify(pass_data), "*");
		// $("#hp_puma").get(0).contentWindow.postMessage(JSON.stringify(pass_data), '*');	
	}

	// window.addEventListener(message, function(e){},false);

	function receiveDataFromParent(msg) {
		var paramObj = JSON.parse(msg);
		console.log(msg);
		console.log(paramObj.todo);
		console.log(paramObj.amt);
		// alert("paramObj:"+paramObj);
		// alert("receiveDataFromParent");
		if (paramObj.todo == "showExpandedElements") {
			showExpandedElements();
		}else if (paramObj.todo == "changeOrientation") {
			changeOrientationCSS(paramObj.amt);
		}
	}

	function changeOrientationCSS(dir){		
		// alert ("banner changeOrientation:" + dir);	
		if (dir == "portrait") {		
			//$("#orientCSS").attr("href", "styles/tablet_portrait.css");
			$('body').removeClass('landscape').addClass('portrait');
		}else{
			//$("#orientCSS").attr("href", "styles/tablet_landscape.css");
			$('body').removeClass('portrait').addClass('landscape');
		}		
		$('*').removeAttr('style');
		init();		
		sendDataToParent("resetBannerStyle", "");		
	}

	// setInterval(function() {
	// 		// Send the message "Hello" to the parent window
	// 		// ...if the domain is still "davidwalsh.name"
	// 		parent.postMessage("Hello", "*");
	// 		// parent.postMessage("Hello","HP_Puma_RMU.html");
	// 	},1000);

	// var mql = window.matchMedia("screen and (min-width: 800px)")
	// if (mql.matches) { // if media query matches
	// 	alert("Window is 800px or wider")
	// }else{
	// 	// do something else
	// }
	// Find matches
	// var mql = window.matchMedia("(orientation: portrait)");

	// // If there are matches, we're in portrait
	// // if(mql.matches) {  
	// 	// Portrait orientation
	// // } else {  
	// 	// Landscape orientation
	// // }

	// // Add a media query change listener
	// mql.addListener(function(m) {
	// 	if (m.matches) {
	// 		// Changed to portrait
	// 		console.log("portrait");
	// 		alert("portrait");
	// 	}else{
	// 		// Changed to landscape
	// 		console.log("landscape");
	// 		alert("landscape");
	// 	}
	// 	// orientation has changed
	// 	resetBlueDotStyles();
	// 	initBlueDotLocs();		
	// 	idxFrame = $("#printerSpin").spritespin("frame");
	// 	setBlueDotLocs();
	// });

	// $("#printer1").resize(function() {
	// 	console.log("----RESIZE----");
	// });
	// $( window ).resize(function() {

	// });

	var printerW = parseInt($("#printerSpin").css("width"));
	var printerH = parseInt($("#printerSpin").css("height"));

	$("#printerSpin").spritespin({
		width     : printerW,
		height    : printerH,
		frames    : arrFrames.length,
		behavior  : "drag", // "hold"
		module    : "360",
		sense     : -1,
		source    : arrFrames,
		animate   : false
		// animate: true,// loop:true,// frameWrap:true,// framestep:1,// frameTime:60,// enableCanvas:
		// }).bind("touchstart touchmove touchend scroll", function(e){
  // 		e.preventDefault();
	});

	$('#btnSeeHow').click(function(){
		TweenLite.killDelayedCallsTo(toggleCollapsedText);   // stop the fade in/out of texts
		hideCollapsedElements();
		var theTop = $('#banner').position().top;

		// $('#banner').toggleClass("collapsed expanded");

		// TweenLite.fromTo('#banner', timeExpand, {top: theTop}, {top:'0px', onComplete:showExpandedElements});

		// $( "spritespin-stage > img" ).css( "border", "3px double black" );		

		var expandedHeight = $("#banner").css("height");
		//alert("expandedHeight:"+expandedHeight);
		sendDataToParent("expand", expandedHeight);		
	});

	$('#btnCollapse').click(function(){
		hideExpandedElements();
		showCollapsedElements();
		// $('#banner').toggleClass("collapsed expanded");		
		var newTop = parseInt($(window).height()) - parseInt($("#banner").css("height"));
		// TweenLite.to('#banner', timeExpand, {top: newTop + 'px', bottom:'0px'});
		sendDataToParent("collapse", newTop + "px");
	});

	$('#printerSpin').mousedown(function(event){
		$("#arrows").hide();
		hideDots();
		clickX = event.pageX;
		timeNow = $.now();
	});

	$('#printerSpin').mouseup(function(event){
		showDots();
		var elapsedTime = $.now() - timeNow;
		if (elapsedTime < arrSwipTimesToSpin[0]) {
			clickXNew = event.pageX;
			spinPrinter(0);
		}else if (elapsedTime < arrSwipTimesToSpin[1]) {
			clickXNew = event.pageX;
			spinPrinter(1);
		}else if (elapsedTime < arrSwipTimesToSpin[2]) {
			clickXNew = event.pageX;
			spinPrinter(2);
		}
	});

	$('#printerSpin').bind( "touchstart", function(event){
		$("#arrows").hide();
		hideDots();
		clickX = event.originalEvent.touches[0].pageX;
		timeNow = $.now();
	});
	$('#printerSpin').bind( "touchend", function(event){
		showDots();
		// if (($.now() - timeNow) < maxSwipeTime) {
		var elapsedTime = $.now() - timeNow;
		if (elapsedTime < arrSwipTimesToSpin[0]) {
			clickXNew = event.originalEvent.touches[0].pageX;
			spinPrinter(0);
		}else if (elapsedTime < arrSwipTimesToSpin[1]) {
			clickXNew = event.originalEvent.touches[0].pageX;
			spinPrinter(1);
		}else if (elapsedTime < arrSwipTimesToSpin[2]) {
			clickXNew = event.originalEvent.touches[0].pageX;
			spinPrinter(2);
		}
	});

	$('#printerSpin').mouseleave (function(event){
		showDots();
	});

	function spinPrinter(idx){
		var destinationFrame = $("#printerSpin").spritespin("frame");
		var reverseSpin = false;

		if (clickX < clickXNew) reverseSpin = true;

		if (reverseSpin) {
			// destinationFrame -= numSpinFramesAfterSwipe;
			destinationFrame -= arrExtraSpins[idx];
			$("#printerSpin").spritespin({reverse: true});
		}else{			
			// destinationFrame += numSpinFramesAfterSwipe;
			destinationFrame += arrExtraSpins[idx];
			$("#printerSpin").spritespin({reverse: false});
		}			

		if (destinationFrame > (arrFrames.length - 1)) destinationFrame = destinationFrame - arrFrames.length;
		if (destinationFrame < 0) destinationFrame = destinationFrame + arrFrames.length;

		$("#printerSpin").spritespin("animateTo", destinationFrame);
		idxFrame = destinationFrame;
		setBlueDotLocs();
	}

	$('#replay').click(function(){
		deselectBlueDot();
		currDotID = "";
		$("#replay").hide();
		$("#featuresDivider").hide();		
		showCurrFeature(0);
	});

	$('#blueDot1').mouseover(function(){
		deselectBlueDot();
		currDotID = "#blueDot1";
		$("#replay").show();
		$("#featuresDivider").hide();
		showCurrFeature(1);
	});

	$('#blueDot2').mouseover(function(){
		deselectBlueDot();
		currDotID = "#blueDot2";
		$("#replay").show();
		$("#featuresDivider").show();
		showCurrFeature(2);
	});

	$('#blueDot3').mouseover(function(){
		deselectBlueDot();
		currDotID = "#blueDot3";
		$("#replay").show();
		$("#featuresDivider").show();
		showCurrFeature(3);
	})

	$('#blueDot4').mouseover(function(){
		deselectBlueDot();
		currDotID = "#blueDot4";
		$("#replay").show();
		$("#featuresDivider").show();
		showCurrFeature(4);
	});

	$('#featurePop1').click(function(){
		$("#footnoteScrollText").html(arrFootnotes[0]);
		showScroller();
	});
	$('#featurePop2').click(function(){
		$("#footnoteScrollText").html(arrFootnotes[1]);
		showScroller();
	});
	$('#featurePop3').click(function(){
		$("#footnoteScrollText").html(arrFootnotes[2]);
		showScroller();
	});
	$('#btnCloseFootnote').click(function(){
		hideScroller();
		$(arrFeatureBoxes[idxCurrFeature]).show();
		showDots();
	});
	
	function showScroller(){
		bFootnoteShowing = true;
		// use 'visibility' instead of 'display', needed for custom scroller
		$("#footnoteScrollText").mCustomScrollbar({
		    theme:"light"
		});
		$("#footnoteScrollBox").css("visibility", "visible");		
		$(arrFeatureBoxes[idxCurrFeature]).hide();
		hideDots();
	}

	function hideScroller(){
		bFootnoteShowing = false;
		$("#footnoteScrollBox").css("visibility", "hidden");
	}
	
	function isPortrait(){
		var returnVal = false;
		if (window.matchMedia("(orientation: portrait)").matches) {
		   // alert("portrait");
			returnVal = true;
		}
		// if (window.matchMedia("(orientation: landscape)").matches) {
		//    alert("LANDSCAPE");
		// }
		return returnVal;
	}
	
	function hideCurrFeature(){
		$(arrFeatureBoxes[idxCurrFeature]).hide();
	}

	function deselectBlueDot(){
		if (currDotID != "") {
			$(currDotID).removeClass("blueDotSelected");
			stopPulse();
			TweenLite.to($(currDotID), timePulse, {opacity:'1'});
		}
	}

	function showCurrFeature(idx){
		if (currDotID != "") {
			$(currDotID).addClass("blueDotSelected");
			pulseSelectedBlueDot();
		}
		hideCurrFeature();
		$(arrFeatureBoxes[idx]).show();
		TweenLite.fromTo(arrFeatureBoxes[idx], timeDivFade, {opacity:'0'}, {opacity:'1'});
		idxCurrFeature = idx;
	}
	
	function pulseSelectedBlueDot(){
		TweenLite.to($(currDotID), timePulse, {opacity:'.2', onComplete:pulseBack});

	}
	function pulseBack(){
		TweenLite.to($(currDotID), timePulse, {opacity:'1', onComplete:pulseSelectedBlueDot});
	}
	function stopPulse(){		
		TweenLite.killTweensOf($(currDotID));
	}
	
	function showExpandedElements(){
		$('#logosMain').toggleClass("logosMainCollapsed logosMainExpanded");
		$("#overlay").show();
	}
	
	function hideExpandedElements(){
		$('#logosMain').toggleClass("logosMainCollapsed logosMainExpanded");
		$("#overlay").hide();
	}

	function showCollapsedElements(){	
		$('#printer1').show();
		$('#text1a').show();
		$('#text1b').show();
		$('#btnSeeHow').show();		
		TweenLite.delayedCall(timeTextToggle, toggleCollapsedText);
	}
	
	function showDots(){
		idxFrame = $("#printerSpin").spritespin("frame");
		setBlueDotLocs();

		$('#blueDot1').show();
		$('#blueDot2').show();
		$('#blueDot3').show();
		$('#blueDot4').show();
	}
	
	function hideDots(){
		$('#blueDot1').hide();
		$('#blueDot2').hide();
		$('#blueDot3').hide();
		$('#blueDot4').hide();
	}
	
	function hideCollapsedElements(){
		$('#printer1').hide();
		$('#text1a').hide();
		$('#text1b').hide();
		$('#btnSeeHow').hide();
	}
	
	function toggleCollapsedText(){
		if (idxCurrCollapsedText == 0) {
			idxCurrCollapsedText = 1;
			TweenLite.to('#text1a', timeTextFade, {opacity:'0'});
			TweenLite.to('#text1b', timeTextFade, {opacity:'1', delay:timeTextFade});
		}else{
			idxCurrCollapsedText = 0;
			TweenLite.to('#text1b', timeTextFade, {opacity:'0'});
			TweenLite.to('#text1a', timeTextFade, {opacity:'1', delay:timeTextFade});
		}		
		TweenLite.delayedCall(timeTextToggle, toggleCollapsedText);
	}

	function initBlueDotLocs(){		
		marginLeftBlueDot1 = parseInt($("#blueDot1").css("margin-left"));
		marginTopBlueDot1 = parseInt($("#blueDot1").css("margin-top"));
		marginLeftBlueDot2 = parseInt($("#blueDot2").css("margin-left"));
		marginTopBlueDot2 = parseInt($("#blueDot2").css("margin-top"));
		marginLeftBlueDot3 = parseInt($("#blueDot3").css("margin-left"));
		marginTopBlueDot3 = parseInt($("#blueDot3").css("margin-top"));
		marginLeftBlueDot4 = parseInt($("#blueDot4").css("margin-left"));
		marginTopBlueDot4 = parseInt($("#blueDot4").css("margin-top"));
	}
	function resetBlueDotStyles(){
		$("#blueDot1").removeAttr('style');	
		$("#blueDot2").removeAttr('style');	
		$("#blueDot3").removeAttr('style');	
		$("#blueDot4").removeAttr('style');	
	}
	function setBlueDotLocs(){
		TweenLite.to('#blueDot1', timeExpand, {css:{marginLeft: (marginLeftBlueDot1 + arrBlueDot1OffsetsX[idxFrame]) + 'px', 
													marginTop:(marginTopBlueDot1 + arrBlueDot1OffsetsY[idxFrame]) + 'px'}});		
		if (arrBlueDot2OffsetsX[idxFrame] == -999) {    // only dots 2 and 4 disappear
			if (currDotID == "#blueDot2") stopPulse();
			$('#blueDot2').css("opacity", 0);
		}else{		
			$('#blueDot2').css("opacity", 1);
			if (currDotID == "#blueDot2") pulseSelectedBlueDot();
			TweenLite.to('#blueDot2', timeExpand, {css:{marginLeft: (marginLeftBlueDot2 + arrBlueDot2OffsetsX[idxFrame]) + 'px', 
														marginTop:(marginTopBlueDot2 + arrBlueDot2OffsetsY[idxFrame]) + 'px'}});
		}
		TweenLite.to('#blueDot3', timeExpand, {css:{marginLeft: (marginLeftBlueDot3 + arrBlueDot3OffsetsX[idxFrame]) + 'px', 
												marginTop:(marginTopBlueDot3 + arrBlueDot3OffsetsY[idxFrame]) + 'px'}});
		if (arrBlueDot4OffsetsX[idxFrame] == -999) {
			$('#blueDot4').css("opacity", 0);
			if (currDotID == "#blueDot4") stopPulse();
		}else{		
			$('#blueDot4').css("opacity", 1);
			if (currDotID == "#blueDot4") pulseSelectedBlueDot();
			TweenLite.to('#blueDot4', timeExpand, {css:{marginLeft: (marginLeftBlueDot4 + arrBlueDot4OffsetsX[idxFrame]) + 'px', 
														marginTop:(marginTopBlueDot4 + arrBlueDot4OffsetsY[idxFrame]) + 'px'}});
		}
	}

	function init(){
		initBlueDotLocs();
		TweenLite.delayedCall(timeTextToggle, toggleCollapsedText);
	}

	init();

});