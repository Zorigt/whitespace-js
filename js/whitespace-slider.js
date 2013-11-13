$(function() {
	$("#whitespace-slider").css("width", $(window).width() * 3);
	$("#whitespace-slider img").css("width", $(window).width());
	var IMG_WIDTH = $(window).width(),
	currentImg=0,
	maxImages=3,
	speed=500,
	imgs = $("#whitespace-slider div");

	//Init touch swipe
	imgs.swipe( {
		triggerOnTouchEnd : true,
		swipeStatus : swipeStatus,
		allowPageScroll:"vertical"
	});

	function swipeStatus(event, phase, direction, distance, fingers)
	{
		//If we are moving before swipe, and we are going L or R, then manually drag the images
		if( phase=="move" && (direction=="left" || direction=="right") )
		{
			var duration=0;

			if (direction == "left")
				scrollImages((IMG_WIDTH * currentImg) + distance, duration);

			else if (direction == "right")
				scrollImages((IMG_WIDTH * currentImg) - distance, duration);
		}

		//Else, cancel means snap back to the begining
		else if ( phase == "cancel")
		{
			scrollImages(IMG_WIDTH * currentImg, speed);
		}

		//Else end means the swipe was completed, so move to the next image
		else if ( phase =="end" )
		{
			if (direction == "right")
				previousImage()
			else if (direction == "left")
				nextImage()
		}
	}

	function previousImage()
	{
		currentImg = Math.max(currentImg-1, 0);
		scrollImages( IMG_WIDTH * currentImg, speed);
	}

	function nextImage()
	{
		currentImg = Math.min(currentImg+1, maxImages-1);
		scrollImages( IMG_WIDTH * currentImg, speed);
	}

	/**
	 * Manually update the position of the imgs on drag
	 */
	function scrollImages(distance, duration)
	{
		imgs.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");

		//inverse the number we set in the css
		var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();

		imgs.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
	}
});