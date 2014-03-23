
// var timeTextToggle = 5;

var timeExpand = 1;
var bLandscape = false;
var collapsedHeight;


$(function() {

	// Listen to message from child iFrame
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent,function(e) {
		// console.log('parent received message!:  ',e.data);
			// receiveDataFromBanner(e.data);
			// JSON.parse(e.data);
			receiveDataFromBanner(e.data);
		},false);

	// Possible replacement for matchMedia listener, if it does not work everywhere
	// function findOrientation(e){		
 //    	screenOrientation = (window.innerWidth > window.innerHeight)? 'landscape' : 'portrait';
 //    	if (screenOrientation == 'portrait'){
 //    		sendDataToBanner("changeOrientation", "portrait");
 //    	}else if(screenOrientation == 'landscape'){
 //    		sendDataToBanner("changeOrientation", "landscape");
 //    	}
	// }
	// eventer("load",findOrientation);
	// eventer("resize", function(){
	// 	collapseFast();
	// 	findOrientation();
	// });

	var mql = window.matchMedia("(orientation: portrait)");	

	// Add a media query change listener
	mql.addListener(function(m) {
		collapseFast();
		if (m.matches) {
			// Changed to portrait
			// console.log("portrait");
			// alert("portrait1");
			// alert("sendDataToBanner");
			// SECOND TRY IPAD FAILS HERE

			sendDataToBanner("changeOrientation", "portrait");


		}else{
			// Changed to landscape
			// console.log("landscape");
			// alert("landscape1");
			sendDataToBanner("changeOrientation", "landscape");
		}
		// orientation has changed
		// resetBlueDotStyles();
		// initBlueDotLocs();		
		// idxFrame = $("#printerSpin").spritespin("frame");
		// setBlueDotLocs();
	});


	//--- to send message to iFrame  ---//
		// var pass_data = {
		//     'todo':'expand',
		//     'amt': expandedHeight
		// };
		// $("#hp_puma").get(0).contentWindow.postMessage(JSON.stringify(pass_data), '*');	
	//--- to send message to iFrame  ---//



	function sendDataToBanner(sTodo, sAmt) {
		var pass_data = {
		    'todo':sTodo,
		    'amt': sAmt
		};
		$("#hp_puma").get(0).contentWindow.postMessage(JSON.stringify(pass_data), '*');	
	}

	// window.addEventListener(message, function(e){},false);

	function receiveDataFromBanner(msg) {
		var paramObj = JSON.parse(msg);
		console.log(msg);
		console.log(paramObj.todo);
		console.log(paramObj.amt);
		if (paramObj.todo == "expand") {
			expandBanner(paramObj.amt);
		}else if (paramObj.todo == "collapse") {
			collapseBanner(paramObj.amt);
		}else if (paramObj.todo == "resetBannerStyle") {
			$('#hp_puma').removeAttr('style');
		}
	}

	function expandBanner(amt) {
		// console.log("expandBanner");
		// $("#hp_puma").get(0).contentWindow.postMessage('hello', '*');		
		// $("#hp_puma").get(0).contentWindow.postMessage('hello', '*');
		// $("#hp_puma").css("height", amt);		
		// $("#hp_puma").css("top", "0");
		collapsedHeight = $("#hp_puma").css("height")

		var theTop = $('#hp_puma').position().top;
		console.log("theTop:"+theTop);
		// TweenLite.to('#hp_puma', timeExpand, {top:'0px', onComplete:showExpandedElements});
		TweenLite.to('#hp_puma', timeExpand, {css:{top: '0px', height: amt}, onComplete:showExpandedElements});
		// TweenLite.fromTo('#banner', timeExpand, {top: theTop}, {top:'0px', onComplete:showExpandedElements});	
		// TweenLite.to('#hp_puma', timeExpand, {css:{top:'0', onComplete:showExpandedElements});	
		// TweenLite.to('#blueDot3', timeExpand, {css:{marginLeft: (marginLeftBlueDot3 + arrBlueDot3OffsetsX[idxFrame]) + 'px', 
		// 										marginTop:(marginTopBlueDot3 + arrBlueDot3OffsetsY[idxFrame]) + 'px'}});
	}
	function collapseBanner(amt) {
		// var theTop = $('#hp_puma').position().top;
		console.log("amt:"+amt);
		// TweenLite.to('#hp_puma', timeExpand, {css:{top: '0px', height: amt}, onComplete:showExpandedElements});;

		// !!!LOSING THE SCALING
		// var newTop = ((parseInt($(window).height()) - parseInt(collapsedHeight)) - 20) + "px";
		var newTop = ((parseInt($(window).height()) - parseInt(collapsedHeight)) - 4) + "px";
		console.log("newTop:"+newTop);
		// TweenLite.to('#hp_puma', timeExpand, {top: newTop, height:collapsedHeight});
		// TweenLite.to('#hp_puma', timeExpand, {css:{top: newTop, height: collapsedHeight}, onComplete:resetStyle});
		// TweenLite.to('#hp_puma', timeExpand, {css:{top: newTop, bottom: "0px", height: collapsedHeight}, onComplete:relocBanner});
		TweenLite.to('#hp_puma', timeExpand, {css:{top: newTop, bottom: "0px", height: collapsedHeight}});
		// $("#hp_puma").css("bottom", "0px");
	}
	function collapseFast() {
		$("#hp_puma").css("height", collapsedHeight);
	}

	// function relocBanner() {		
	// 	$("#hp_puma").css("top", "100px");
	// }

	// function resetStyle() {		
	// 	$("#hp_puma").removeAttr('style');	
	// }

	function showExpandedElements() {
		console.log("expandBanner!!!");
		sendDataToBanner("showExpandedElements", "");
		// // $("#hp_puma").get(0).contentWindow.postMessage('hello', '*');		
		// // $("#hp_puma").get(0).contentWindow.postMessage('hello', '*');
		// $("#hp_puma").css("height", amt);		
		// $("#hp_puma").css("top", "0");

		// var theTop = $('#hp_puma').position().top;
		// TweenLite.fromTo('#hp_puma', timeExpand, {top: theTop}, {top:'0px', onComplete:showExpandedElements});	
	}


	// Find matches
	// var mql = window.matchMedia("(orientation: portrait)");
	// // If there are matches, we're in portrait
	// if(mql.matches) {  
	// 	bLandscape = false;
	// } else {  
	// 	bLandscape = true;
	// }

	// mql.addListener(function(m) {
	// 	if(m.matches) {
	// 		bLandscape = false;
	// 	}
	// 	else {
	// 		bLandscape = true;
	// 	}
	// });


    // $.receiveMessage(function(e) {
    // 					alert(e.data);
    // 				});

	// function test() {
	// 	alert("test");
	// }

	// --- !!!REMOVING SCALING FOR NOW
    // scaleBanner();
    // $(window).resize(scaleBanner);
    
	function scaleBanner() {

		// alert("change");

		// console.log("innerWidth:"+window.innerWidth);

		var browserWidth = window.innerWidth;
		var bannerWidth = parseInt($("#hp_puma").css("width"));

		// console.log("bannerW:"+bannerWidth);

		var pct = (browserWidth / bannerWidth) *.98;
		var oldH = parseInt($('#hp_puma').height());
		var newH = oldH * pct;
		var newBottom = (newH - oldH + 10) + "px";

		console.log("newBottom:"+newBottom);

	    $('#hp_puma').css({
	        "-moz-transform"    : "scale("+pct+")",
	        "-webkit-transform" : "scale("+pct+")",
	        "-ms-transform"     : "scale("+pct+")",
	        "-o-transform"      : "scale("+pct+")",
	        "transform"         : "scale("+pct+")",
			"transform-origin": "0 0",
			"-webkit-transform-origin": "0 0",
			"-o-transform-origin": "0 0",
			"-ms-transform-origin": "0 0",
			"-moz-transform-origin": "0 0",	
	        // "left"              : "0px",
	        // "right"              : "0px"
	        // "bottom"               : "0px"
	        "bottom"               : newBottom
	    });
	}
});