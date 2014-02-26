var menuElements = null;
var displayItems = null;
var mainScreens  = null;
var bannerIsSet  = false;
var menuIsOpen   = false;
var FALSE		 = -1;
var TRUE		 = 1;
var initTouch	 = [-1,-1];
var touchmove	 = true;
var appIsActive  = false;
var gradientWidth= 0;
var constantWidth= 0;
var MAX_BAND_HEIGHT = 200;
var copy			= "";
var crossOffset		= 2;

// Gradient Variables
var dark		 		 = 61;
var light		 		 = 194;
var defaultDark	 		 = 61;
var defaultLight 		 = 194;
var defaultGradientHeight= 0;

$(document).on("keyup",function(e){
	var u = e.charCode ? e.charCode : e.keyCode;
	if ( document.body.onorientationchange == null ){
		document.body.onorientationchange = windowChange;
	}
	if ( u == 37 || u == 39 ){
		window.orientation = 90;		
		document.body.onorientationchange();
	}
	else if ( u == 38 || u == 40 ){
		window.orientation = 0;
		document.body.onorientationchange();
	}
});

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {

    var colors = rgb.split("(");
    colors = colors[1].split(")");
    colors = colors[0].split(",");

    var r = parseInt(colors[0]);
    var g = parseInt(colors[1]);
    var b = parseInt(colors[2]);

    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function lightUp(name,n){
	var buttons = $("[name='"+name+"']");
	if (n == 1) {
		buttons.css("background-color","#8080FE");
	}
	else {
		buttons.css("background-color","#FEF6EA");
	}
	return;
}
function popEventBubble(e){
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble();
	e.preventDefault ? e.preventDefault() : null;
	return false;
}
function checkBannerSize(){
	var images = $("img");
	if ( window.orientation === 0 ){
		if ( $(images[0]).width() > $(window).width() ){
			$(images[0]).width($(window).width()*0.95);		
			$(images[1]).width($(images[0]).width()*0.9);
		}
	}
	return;
}
function closeMenu(e){
	popEventBubble(e);
	lightUp('close',0);
	displayItemsAreDisplay = FALSE;
	menuElements.css("display","none");
	menuIsOpen = false;
	return;
}
function adjustLeft(coord,dx,dy){
	if ( coord.pageY < $(window).height()/2 ){
		// Top half of screen
		dark += dx;
		if ( dark < 0 ){
			dark = 0;	
		}
		else if ( dark > 255 ){
			dark = 255;	
		}
		$(".red_normal").html(dark.toFixed(0));
		$("#dark_left").css("background-color","#"+rgbToHex("("+dark+","+dark+","+dark+")"));								
		$("#gradient_left").css({
			"background":"-webkit-linear-gradient(rgb("+dark+","+dark+","+dark+"),rgb("+light+","+light+","+light+"))",
		});
		if ( copy == "left" ){
			$(".green_opposite").html(dark.toFixed(0));
			$("#dark_right").css("background-color","#"+rgbToHex("("+light+","+light+","+light+")"));
			$("#light_right").css("background-color","#"+rgbToHex("("+dark+","+dark+","+dark+")"));
			$("#gradient_right").css({
				"background":"-webkit-linear-gradient(rgb("+dark+","+dark+","+dark+"),rgb("+light+","+light+","+light+"))",
			});
		} 
		else {
			$("#gradient_right").css({
				"background":"-webkit-linear-gradient(rgb("+light+","+light+","+light+"),rgb("+dark+","+dark+","+dark+"))",
			});
			$("#dark_right").css("background-color","#"+rgbToHex("("+dark+","+dark+","+dark+")"));								
		}
	}
	else {
		light += dx;
		if ( light < 0 ){
			light = 0;	
		}
		else if ( light > 255 ){
			light = 255;	
		}
		$(".green_normal").html(light.toFixed(0));
		$("#light_left").css("background-color","rgb("+light+","+light+","+light+")");								
		$("#gradient_left").css({
			"background":"-webkit-linear-gradient(rgb("+dark+","+dark+","+dark+"),rgb("+light+","+light+","+light+"))",
		});
		if ( copy == "left" ){
			$(".red_opposite").html(light.toFixed(0));
			$("#light_right").css("background-color","rgb("+dark+","+dark+","+dark+")");
			$("#dark_right").css("background-color","rgb("+light+","+light+","+light+")");
			$("#gradient_right").css({
				"background":"-webkit-linear-gradient(rgb("+dark+","+dark+","+dark+"),rgb("+light+","+light+","+light+"))",
			});	
		}
		else {
			$("#gradient_right").css({
				"background":"-webkit-linear-gradient(rgb("+light+","+light+","+light+"),rgb("+dark+","+dark+","+dark+"))",
			});
			$("#light_left,#light_right").css("background-color","rgb("+light+","+light+","+light+")");
		}
	}
}
function adjustRight(coord,dx,dy){
	if ( coord.pageY < $(window).height()/2 ){
		// Top half of screen
		light += dx;
		if ( light < 0 ){
			light = 0;	
		}
		else if ( light > 255 ){
			light = 255;	
		}
		$(".green_opposite").html(light.toFixed(0));
		$("#light_right").css("background-color","rgb("+light+","+light+","+light+")");
		$("#gradient_right").css({
			"background":"-webkit-linear-gradient(rgb("+light+","+light+","+light+"),rgb("+dark+","+dark+","+dark+"))",
		});								
		if ( copy == "right" ){
			$(".red_normal").html(light.toFixed(0));
			$("#dark_left").css("background-color","rgb("+light+","+light+","+light+")");
			$("#gradient_left").css({
				"background":"-webkit-linear-gradient(rgb("+light+","+light+","+light+"),rgb("+dark+","+dark+","+dark+"))",
			});
		}
		else {
			$("#gradient_left").css({
				"background":"-webkit-linear-gradient(rgb("+dark+","+dark+","+dark+"),rgb("+light+","+light+","+light+"))",
			});
			$("#light_left").css("background-color","rgb("+light+","+light+","+light+")");
		}
	}
	else {
		dark += dx;
		if ( dark < 0 ){
			dark = 0;	
		}
		else if ( dark > 255 ){
			dark = 255;	
		}
		$(".red_opposite").html(dark.toFixed(0));
		$("#dark_right").css("background-color","rgb("+dark+","+dark+","+dark+")");
		$("#gradient_right").css({
			"background":"-webkit-linear-gradient(rgb("+light+","+light+","+light+"),rgb("+dark+","+dark+","+dark+"))",
		});								
		if ( copy == "right" ){
			$(".green_normal").html(dark.toFixed(0));
			$("#light_left").css("background-color","rgb("+dark+","+dark+","+dark+")");
			$("#gradient_left").css({
				"background":"-webkit-linear-gradient(rgb("+light+","+light+","+light+"),rgb("+dark+","+dark+","+dark+"))",
			});
		}
		else {
			$("#gradient_left").css({
				"background":"-webkit-linear-gradient(rgb("+dark+","+dark+","+dark+"),rgb("+light+","+light+","+light+"))",
			});
			$("#dark_left").css("background-color","rgb("+dark+","+dark+","+dark+")");
		}
	}
}
var windowChange = function(event){
	if ( bannerIsSet === false ){
		setTimeout(function(){
			checkBannerSize();
		},200);
	}
	if ( window.orientation === 0 ){
		document.ontouchmove = function(){return true};
		appIsActive = false;
		document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
		document.getElementById("home").style["display"]	= "block";
		document.getElementById("app").style["display"]		= "none";
		setTimeout(function(){
			window.scrollTo(1,1);
		},200);
	}
	else if ( window.orientation === 90 || window.orientation === -90 ){
		appIsActive = true;
		document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
		gradientWidth = $("#gradient_right").height();
		constantWidth = $("#light_right").height();
		$("[name='gradient_width']").html("Gradient Width: "+(gradientWidth.toFixed(0))+ "px");
		document.getElementById("home").style["display"]	= "none";
		document.getElementById("app").style["display"]		= "block";
		setTimeout(function(){
			window.scrollTo(1,1);
			$(".bar").css("left",($("#left_frame").width()/2)-($(".bar").width()/2)+"px");
			// Set the position and the touch events of the crosshair fixation point;
			gradientWidth = $("#gradient_left").height();
			$("[name='crosshair']").css({
				top		: gradientWidth/2-crossOffset+$("#gradient_left").position().top+"px",
				left	: ($("#left_frame").width()/2)-($("[name='crosshair']").width()/2)+"px"
			});
			MAX_BAND_HEIGHT = $("[name='frame']").height();
			$("[name='crosshair']").css({
				top 	: gradientWidth/2-crossOffset+$("#gradient_left").position().top+"px",
				left	: ($("#left_frame").width()/2)-($("[name='crosshair']").width()/2)+"px"
			});
		},200);
	}
};
function setUp(){
	menuElements = $("[name='menu'],[name='menu_list']");
	displayItems = $("[name='red_info'],[name='green_info'],[name='menu_button'],[name='gradient_width']");
	
	// Event handlers
	$("[name='menu_button']").on({
		"mouseup touchend" : function(e){
			popEventBubble(e);
			lightUp('menu_button',0);
			menuElements.css("display","block");
			displayItems.css("display","none");
			menuIsOpen = true;
			return;
		},
	}).attr("touchdown","false");
	$("[name='copy_left_button']").on({"mouseup touchend":function(e){
		popEventBubble(e);
		lightUp('copy_left_button',0);		
		copy = "left";
		adjustLeft({pageY:$(window).width()/2+5},0,0);
		adjustLeft({pageY:$(window).width()/2-5},0,0);
		closeMenu(e);
		return;
	}});
	$("[name='copy_right_button']").on({"mouseup touchend":function(e){
		popEventBubble(e);
		lightUp('copy_right_button',0);
		copy = "right";
		adjustRight({pageY:$(window).width()/2+5},0,0);
		adjustRight({pageY:$(window).width()/2-5},0,0);
		closeMenu(e);
		return;
	}});	
	$(document).on({
		"mousedown touchstart" : function(e){
			if ( appIsActive === true ){
				popEventBubble(e);
				initTouch = window.event.touches ? [window.event.touches[0].pageX,window.event.touches[0].pageY] : [window.event.pageX,window.event.pageY];
			}
			return;
		},
		"mousemove touchmove" : function(e){
			if ( appIsActive === true ){
				popEventBubble(e);
				touchmove = true;
				if ( initTouch !== [-1,-1] ){
					var coord = window.event.changedTouches ? window.event.changedTouches[0] : window.event;
					var dx = coord.pageX - initTouch[0];
					var dy = coord.pageY - initTouch[1];
					initTouch = [coord.pageX,coord.pageY];
					if ( coord.pageX < $(window).width()/2 && coord.pageX > $(window).width()*0.2 ) {
						// Left side of screen
						if ( copy != "right" ){
							adjustLeft(coord,dx,dy);
						}
						else if ( copy == "right" ) {
							adjustRight(coord,dx,dy);
						}
					}
					else if ( coord.pageX > $(window).width()/2 && coord.pageX < $(window).width()*0.8 ){
						// Right side of screen
						if ( copy != "left" ){
							adjustRight(coord,dx,dy);
						}
						else if ( copy == "left" ){
							adjustLeft(coord,dx,dy);
						} 
					}
					else if ( coord.pageX < $(window).width()*0.2 || coord.pageX > $(window).width()*0.8 ){
						gradientWidth += dy;
						var height = (MAX_BAND_HEIGHT - gradientWidth)/2; 
						if ( gradientWidth < 0 || isNaN(gradientWidth) ){
							gradientWidth = 0;	
						}
						else if ( gradientWidth > MAX_BAND_HEIGHT ){
							gradientWidth = MAX_BAND_HEIGHT;	
						}
						if ( gradientWidth < MAX_BAND_HEIGHT && gradientWidth > 0 ){
							$("#light_right").css({
								"height":height+"px"
							});
							$("#dark_left").css({
								"height":height+"px"	
							});
							if ( $("#light_right").length > 0 ){
								$("#gradient_right").css({
									"height":gradientWidth+"px",
									"top":$("#light_right").position().top+$("#light_right").height()+"px"
								});
								$("#gradient_left").css({
									"height":gradientWidth+"px",
									"top":$("#light_right").position().top+$("#light_right").height()+"px"
								});
							}
							if ( $("#gradient_right").length > 0 ){
								$("#dark_right").css({
									"height":height+"px",
									"top":$("#gradient_right").position().top+$("#gradient_right").height()+"px"
								});
								$("#light_left").css({
									"height":height+"px",
									"top":$("#gradient_right").position().top+$("#gradient_right").height()+"px"
								});
							}
							$("[name='gradient_width']").html("Gradient Width: "+gradientWidth.toFixed(0)+ "px");
						}
						$("[name='crosshair']").css({
							top 	: gradientWidth/2-10+$("#gradient_left").position().top+"px",
							left	: ($("#left_frame").width()/2)-($("[name='crosshair']").width()/2)+"px"
						});
					}
					displayItems.css("display","block");
				}
			}
		},
		"mouseup touchend" : function(e){
			if ( appIsActive === true ){
				if ( menuIsOpen === false ){
					if ( touchmove === false ){
						displayItems.toggle();	
					}
				}
				popEventBubble(e);
			}
			initTouch = [-1,-1];
			touchmove = false;
			return;
		}
	});
	// Event handlers for menu buttons
	$("[name='close']").on({
		"mousedown touchstart" : function(e){
			popEventBubble(e);
			lightUp('close',1);
			return;
		},
		"mouseup touchend" : function(e){
			closeMenu(e);
			return;
		}
	});
	$("[name='home_button']").on("mouseup touchend",function(e){
		lightUp('home_button',0);
		window.location = "../../";
	});
	$("[name='reset_button']").on("mouseup touchend",function(e){
		lightUp('reset_button',0);
		dark = defaultDark;
		light = defaultLight;
		$("[name='green_info']").html(light.toFixed(0));
		$("#light_left,#light_right").css("background-color","rgb("+light+","+light+","+light+")");
		$("[name='red_info']").html(dark.toFixed(0));
		$("#dark_left,#dark_right").css("background-color","rgb("+dark+","+dark+","+dark+")");
		$("#gradient_right").css({
			"background":"-webkit-linear-gradient(rgb("+defaultLight+","+defaultLight+","+defaultLight+"),rgb("+defaultDark+","+defaultDark+","+defaultDark+"))",
		});
		$("#gradient_left").css({
			"background":"-webkit-linear-gradient(rgb("+defaultDark+","+defaultDark+","+defaultDark+"),rgb("+defaultLight+","+defaultLight+","+defaultLight+"))",
		});
		copy = "";
		displayItemsAreDisplay = FALSE;
		menuElements.css("display","none");
		menuIsOpen = false;
		return;
	});
	// Set the touch events for the Show/Hide Crosshair button
	$("[name='crosshair_button']").on("touchend mouseup", function(e){
		lightUp('crosshair_button',0);
		$("[name='crosshair']").toggle();
		if ( this.innerHTML.search("Hide") > -1 ){
			$("[name='crosshair_button']").html("Show Crosshairs");	
		}
		else {
			$("[name='crosshair_button']").html("Hide Crosshairs");
		}
		closeMenu(e);
		return;		
	});
	// Check the current angle of the device
	if ( Math.abs(window.orientation/90) === 1 ){
		appIsActive = true;
		document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
		document.getElementById("home").style["display"]	= "none";
		document.getElementById("app").style["display"]		= "block";
		gradientWidth = $("#gradient_right").height();
		constantWidth = $("#light_right").height();
		$("[name='gradient_width']").html("Gradient Width: "+gradientWidth.toFixed(0)+ "px");
	}
	else {
		checkBannerSize();
		appIsActive = false;
	}
	setTimeout(function(){
		window.scrollTo(1,1);
	},200);
	return;
}
