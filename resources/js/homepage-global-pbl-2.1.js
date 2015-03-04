//onload document ready
$(function() {

	$('<div id="background" class="z1"></div>').insertBefore($('.wrap'));

$('#slidernav p').addClass('s3');
$('#topbuttons h3').addClass('s3');
$('#topbuttons h5').addClass('s2');
$('#downloads').addClass('s3');

var timesRun = 0;
var elementCount = 0;
var theTimer = setInterval(function(){
	timesRun += 1;
	if (timesRun == 20) {
		clearInterval(theTimer);
	}
	if($('.news').length > elementCount){
		elementCount = $('.news').length;
		$(".newsitem").addClass("closed");
		$(".newsitem").first().removeClass("closed");
		$(".closed").find(".news-content").hide();
		$(".news-header img").attr("src",minusImg);
		$(".closed").find(".news-header img").attr("src",plusImg);
		$(".news").css("padding-bottom","20px");
		$(".news").last().css("padding-bottom","52px");
	} 
},100);
	
$.fn.nextOrFirst = function(selector){
    var next = this.next(selector);
   return (next.length) ? next : this.prevAll(selector).last();
}


$('.sliderthumb').hover(function(){
	$(this).find('img').toggleClass('thumb-hover');
});


defaultTimer();

			var clickedTimerVar;
			
			//Banner interval transitions
			function defaultTimer() {
				var twoCycles = 0;
				
				defaultTimerVar = setInterval(function () {
					if (twoCycles < 6){
					twoCycles+=1;
					nextId = $("#slidernav .selected").attr('data-next-id');
					next = $("[data-id='" + nextId + "']");
					nextBack = nextId.replace('#','');
					currentBack = $("#slidernav .selected").attr('data-id').replace('#','');
					$("#slidernav div").removeClass('selected');
					
					//background
				    $('#background').fadeOut("fast").promise().done(function(){
						$('#background').removeClass(currentBack);	
						$('#background').addClass(nextBack).fadeIn("fast", function(){
						});
					});
					//banner
					$(next).addClass("selected");
					$(".sliderpanel").fadeOut("fast").promise().done(function(){
						$(nextId).fadeIn("fast");
					});
					}else{
					clearInterval(defaultTimerVar);}
					
					
				}, 8000);
				
            };
            
           function clickedTimer() {
					clearInterval(clickedTimerVar);
					clearInterval(defaultTimerVar);
					clickedTimerVar = setInterval(function () {
						nextId = $("#slidernav .selected").attr('data-next-id');
						next = $("[data-id='" + nextId + "']");
						nextBack = nextId.replace('#','');
					
					//background
						currentBack = $("#slidernav .selected").attr('data-id').replace('#','');
					    $('.'+currentBack).fadeOut(function(){
							$('#background').removeClass(currentBack);	
						$('#background').addClass(nextBack).fadeIn(function(){
						
						});
					});

					$("#slidernav div").removeClass('selected');
					$(next).addClass("selected");
					$(".sliderpanel").fadeOut().promise().done(function(){
						$(nextId).fadeIn();
						clearInterval(clickedTimerVar);
						defaultTimer();
					});
				}, 45000);
            };
			
			 //Banner thumbnail clicks
			$("#slidernav > div").click(function(){
				clickedTimer();
				currentBack = $("#slidernav .selected").attr('data-id').replace('#','');
				$("#slidernav div").removeClass("selected");
				$(this).find("[data-id]").addClass("selected");
				var goHere = $(this).find("[data-id]").attr("data-id");
				nextBack = goHere.replace('#','');
				//background
				    $('.'+currentBack).fadeOut("fast", function(){
						$('#background').removeClass(currentBack);	
						$('#background').addClass(nextBack).fadeIn("fast", function(){
						});
					});
				$(".sliderpanel").fadeOut("fast").promise().done(function(){
				$(goHere).fadeIn("fast");
				});
			});

	$("#topbuttons .topbutton").hover(
		function () {
   	 		$(this).addClass("on");
  		}, function () {
    		$(this).removeClass("on");
  			}
	); 
  	
$.fn.minimize = function(id){
					$(this).find('.buttonsexpansion').animate({
			height: '0', 
			opacity: '0'},250, function() {
				//code
				});
		$(this).find('h3,h5').animate({
			top: '29'},250, function() {
				$(this).parent().removeClass("minimize");
				$(this).parent().addClass("expandable");
				});
		
		}
	var openMenu = 0;
	
	$(document).on("click", ".expandable", function() {
		if (openMenu == 1){
			$(this).parent().find('.minimize').minimize();
			}
		$(this).find('.buttonsexpansion').animate({
			height: '244', 
			opacity: '1'},250, function() {
				//code
				});
		$(this).find('h3,h5').animate({
			top: '-162'},250, function() {
				$(this).parent().removeClass("expandable");
				$(this).parent().addClass("minimize");
		openMenu =1;	
	});

	$(document).on("click", ".minimize", function(e) {
		if($(e.target).is('a')){
            e.stopPropagation();
            return;
         } 
		$(this).find('.buttonsexpansion').animate({
			height: '0', 
			opacity: '0'},250, function() {
				//code
				});
		$(this).find('h3,h5').animate({
			top: '29'},250, function() {
				$(this).parent().removeClass("minimize");
				$(this).parent().addClass("expandable");
				});
			openMenu = 0;
		});
	});
	
	var plusImg = "~/resources/images/slide/promo_show_19x18.png"
	var minusImg = "~/resources/images/slide/promo_hide_19x18.png"
/*	$(document).bind("DOMNodeInserted", function() {
		$(".newsitem").addClass("closed");
		$(".newsitem").first().removeClass("closed");
		$(".closed").find(".news-content").hide();
		$(".news-header img").attr("src",minusImg);
		$(".closed").find(".news-header img").attr("src",plusImg);
		$(".news").css("padding-bottom","20px");
		$(".news").last().css("padding-bottom","52px");
	});*/
	
	
	
	
	$(document).on("click", ".news-header img", function(e) {
			var imgSrc = $(this).attr("src");
			if (imgSrc == plusImg) {
				$(this).attr("src", minusImg);
			} else {
				$(this).attr("src", plusImg);
			}
			$(this).parent().parent().find(".news-content").toggle();
			$(this).parent().parent().toggleClass("closed");
			
		});

	
});

//images preloading
var images = [];
function preload(imgs) {
               for (i = 0; i < imgs.length; i++) {
               images[i] = new Image()
               images[i].src = imgs[i];
               }
}
preload([ "http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/banners/imagine-design-create-banner-background-1700x815.jpg", "http://static-dc.autodesk.net/dc/content/dam/autodesk/www/products/fusion-360/images/homepage/fusion360-background-1700x815.png", "http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/banners/apps-for-the-imagination-banner-background-1700x815.jpg","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/banners/imagine-design-create-hover-thumb-100x50.jpg","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/products/fusion-360/images/homepage/fusion360-hover-thumb-100x50.jpg","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/banners/apps-for-the-imagination-hover-thumb-100x50.jpg","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/images/module_default_386x70.png","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/images/button_default.png","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/images/button_hover_386x70.png","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/images/module_hover.png","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/images/topbuttons_expanded.png","http://static-dc.autodesk.net/dc/content/dam/autodesk/www/homepage/images/module_expanded.png"]);