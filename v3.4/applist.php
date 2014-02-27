<?php

$applist = array(
	array("Stereo Pairs Astronomy","/StereoPairs/","no"),
	array("Stereo Pairs Small Size", "/StereoPairs/","no"),
	array("Stereo Pairs Browser Adjusted", "/StereoPairs/","no"),
	array("Stereo Pairs Large Size", "/StereoPairs/","no"),
	array("Stereo Pairs Large Size: Art", "/StereoPairs/","no"),
	array("Synoptic Pairs", "/StereoPairs/","no"),
	array("Binocular Rivalry", "/StereoPairs/","no"),
	array("Binocular Lustre", "/StereoPairs/","no"),
	array("Dichoptic Pairs", "/StereoPairs/","no"),
	array("Dichoptic After Image", "no","./StereoLITE/DichopticAfterImage/"),
	array("Synoptic After Image", "no","./StereoLITE/SynopticAfterImage/"),
	array("Low Contrast Bars", "no","./StereoLITE/LowContrastBars/"),
	array("RDS Pairs", "/StereoPairs/", "no"),
	array("RDS Pairs Small", "/StereoPairs/", "no"),
	array("RDS Pairs Controllable", "/StereoPairs/", "no"),
	array("Glass Patterns", "no", "./StereoLITE/GlassPatterns/"),
	array("Marroquin Patterns", "no", "./StereoLITE/MarroquinPatterns/"),
	array("Flickering Images", "no", "./StereoLITE/FlickeringImages/index.php?app=flickering"),
	array("Binocular Thaumotrope", "no", "./StereoLITE/FlickeringImages/index.php?app=thaumotrope"),
	array("ARDS Pairs", "/StereoPairs/", "no"),	
	array("Green & Red Color Mixing", "/GreenVsRed/", "no"),
	array("Green & Red Color Mixing: Stable", "/GreenVsRed/Stable/", "no"),
	array("Green & Red Color Mixing: Flicker", "/GreenVsRed/Flicker%20App/", "no"),
	array("Green & Red Color Mixing: RDS", "/GreenAndRedTextured/", "no"),
	array("Green & Red Color Mixing: Bars", "/RedGreenBars/", "no"),
	array("Green & Red Mixing: Motion", "/GreenAndRedMotion/", "no"),
	array("Einstein Color Mixing", "no", "./StereoLITE/GreenAndRedEinstein/index.html"),
	array("Opponent Color Mixing", "/OpponentColors/", "no"),
	array("Isoluminance", "/Isoluminance/", "no"),
	array("Pulfrich Effect", "/PulfrichEffect/", "no"),
	array("Hering Effect", "no", "./StereoLITE/Hering/"),
	array("Jastrow", "no", "./StereoLITE/Jastrow/"),
	array("Vertical-Horizontal", "no", "./StereoLITE/Vertical-Horizontal/"),
	array("Scintillating Grid", "no", "./StereoLITE/Scintillating%20Grid/"),
	array("Kanizsa Square", "no", "./StereoLITE/KanizsaSquare/"),
	array("Cataracts", "no", "./StereoLITE/Cataracts/"),
	array("Snow Motion: Rays", "no", "./StereoLITE/SnowMotion/"),
	array("Snow Motion: Circles", "no", "./StereoLITE/SnowMotionCircles/"),
	array("Benham's Top", "no", "./StereoLITE/BenhamsTop/"),
	array("Selavy Effect", "no", "./StereoLITE/SelavyEffect/"),
	array("Motion After Effect", "no", "./StereoLITE/MotionAfterEffect/"),
	array("Spiral Motion After Effect", "no", "./StereoLITE/SpiralMotionAfterEffect/"),
	array("Stereo Kinetic Effect", "no", "./StereoLITE/StereoKineticEffect/"),
	array("Eye Chart", "no", "./StereoLITE/EyeCharts/"),
	array("Mach Bands", "no", "./StereoLITE/MachBands/"),
	array("Stroboscopic Image 1", "no", "./StereoLITE/StroboscopicImage1/"),
	array("Stroboscopic Image 2", "no", "./StereoLITE/StroboscopicImage2/"),
	array("AMES Window: Bino","no","./StereoLITE/AMESWindowBinocular/"),
	array("von Bezold Binocular","no","./StereoLITE/vonBezold/"),
	array("von Bezold Stripes","no","./StereoLITE/vonBezoldStripes/"),
);

/* Create the HTML for the home page */

$portrait = "";
$portraitSecond = "";
$portraitThird = "";

for ($i = 0, $n = count($applist); $i < $n; $i++){
	$portrait .= "<li class='portrait' id='".$applist[$i][1]."' onclick='touchEnd(this,\"".$applist[$i][2]."\");' ontouchend='touchEnd(this,\"".$applist[$i][2]."\");'>".$applist[$i][0]."</li>\n";
	$portraitSecond .= "<li class='portrait_second' id='".$applist[$i][1]."' onclick='touchEnd(this,\"".$applist[$i][2]."\");' ontouchend='touchEnd(this,\"".$applist[$i][2]."\",$i);'>".$applist[$i][0]."</li>\n";
	$portraitThird .= "<li class='portrait_third' id='".$applist[$i][1]."' onclick='touchEnd(this,\"".$applist[$i][2]."\");' ontouchend='touchEnd(this,\"".$applist[$i][2]."\",$i);'>".$applist[$i][0]."</li>\n";
}

file_put_contents('portrait.php',$portrait);
file_put_contents('portraitSecond.php',$portraitSecond);
file_put_contents('portraitThird.php',$portraitThird);

$err = error_get_last();
if (count($err)>0){
	print_r($err);
}
else {
	echo "Save complete";
}

?>