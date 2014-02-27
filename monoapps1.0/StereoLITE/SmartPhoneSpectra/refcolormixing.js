// JavaScript Document
var MIN_ZOOM 	= 1;
var zoom		= 1;
var lite 		= new Lite();
var tapCalled 	= false;

lite.onAppActivate = function(){
	lite.center($(".spectra"));
	lite.center(lite.fit($("#three_colors")));
        $(".spectra:first-child").show();
	return 0;
}
lite.load = function(){
        lite.loadBanner();
	lite.tap(function(){
		if ( navigator.userAgent.match(/Android/i) != null ){
			if ( tapCalled === true ){
				tapCalled = false;
				return;
			}
		}
		$(".spectra").hide();
		$("#"+$(this).attr("id")+"_spectrum").show();	
		tapCalled = true;
		return 0;
	},$("#green,#blue,#red"));
	lite.tap(function(){
		if ( navigator.userAgent.match(/Android/i) != null ){
			if ( tapCalled === true ){
				tapCalled = false;
				return;
			}
		}
		$("#three_colors").toggle();
		tapCalled = true;
	});
	return 0;
}
