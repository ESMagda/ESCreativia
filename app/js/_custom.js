$( document ).ready(function() {

    $('.home_carousel').owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
		smartSpeed: 700,
		dots: false,
	});

	$('.clients_carousel').owlCarousel({
		items: 1,
		loop: true,
		nav: false,
		smartSpeed: 700,
		dots: true,
	});
	   

	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function() {
		this.classList.toggle("accordion_active");

		var panel = this.nextElementSibling;
		if (panel.style.display === "block") {
		panel.style.display = "none";
		} else {
		panel.style.display = "block";
		}
	});
	}

	$(window).scroll(function(){
		if($(this).scrollTop() > $(this).height() - 400) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});
	$('.top').click(function(){
		$('html,body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

	$(window).on('load', function(){
		$('.preloader').delay(1000).fadeOut('slow');
	});

	(function() {
		$(".toggle")[0].addEventListener( "click", function(e) {
		console.log('click 1');
		e.preventDefault();
		if(this.classList.contains("is-active") === true){
		this.classList.remove("is-active");
		$('.top_line_menu').removeClass("activeMenu");
		// $('.top_line_menu').slideUp('slow');
		} else {
		this.classList.add("is-active");
		$('.top_line_menu').addClass("activeMenu");
		// $('.top_line_menu').slideDown('slow');
		}
		});
		
		$(document).click(e => {
			if(window.innerWidth < 1024) {
				if( !$(e.target).closest('.toggle')[0] ){
				$(".toggle").removeClass("is-active");
				$('.top_line_menu').removeClass("activeMenu");
				// $('.top_line_menu').slideUp('slow');
				}
			}
		});
	})();


	var sectionArray = [1, 2, 3, 4, 5, 6, 7];

	$.each(sectionArray, function(index, value){
			
		$(document).scroll(function(){
			var offsetSection = $('#' + 'section_' + value).offset().top;
			var docScroll = $(document).scrollTop();
			var docScroll1 = docScroll + 1;
			
			
			if ( docScroll1 >= offsetSection){
				$('.nav_btn').removeClass('active');
				$('.nav_btn:link').addClass('inactive');  
				$('.nav_btn').eq(index).addClass('active');
				$('.nav_btn:link').eq(index).removeClass('inactive');
			}
		});

		$('.nav_btn').eq(index).click(function(e){
			var offsetClick = $('#' + 'section_' + value).offset().top - 70;
			e.preventDefault();
			$('html, body').animate({
				'scrollTop':offsetClick
			}, 400)  
		});
	});


	$(document).ready(function(){
		$('.nav_btn:link').addClass('inactive');    
		$('.nav_btn').eq(0).addClass('active');
		$('.nav_btn:link').eq(0).removeClass('inactive');
	});
});




