 

const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile : [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile : document.querySelector(".aside--js"),
	menuMobileLink : [].slice.call(document.querySelectorAll(".aside--js ul li a")),
	body : document.querySelector("body"),

	modalCall() { 
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function() {
			$.fancybox.close();
		})

		$(document).on('click', '.link-modal' ,function(){
			
			var th = $(this);
			var modal = th.attr('href');
			$(modal).find(".order").val(th.data('order'));
			$(modal).find(".form-wrap__title--js").html(th.data('title')); 
			// $(modal).find(".form-wrap__text--js").html(th.data('text')); 
			$(modal).find(".form-wrap__btn").text(th.data('btn'));
			if ($(this).hasClass("modal-win__btn")) {
				$(modal).find(".order").val("Акция: " + th.parent().find(".title").text());
				
			}
			
			if ($(this).hasClass("s-services__btn")) {
				$(modal).find(".order").val("Заявка на: " + th.parents(".s-services__item")
				.find(".s-services__item-title").text());
				
			}

		})
	},
	 paddRight(elem) {
		var div = document.createElement('div');
		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';
		document.body.append(div);
		var padd = div.offsetWidth - div.clientWidth; // console.log(1);

		$(elem).css("paddingRight", padd);
		div.remove();
	},
	htmlPadding() {
		let _this = this;
		
		if ($("body").hasClass("fixed")) {
			_this.paddRight(_this.body);
				// console.log(this);
			} else { 
				$("body").css("paddingRight", 0);
			} 
	},
	// /magnificPopupCall
	toggleMenu() {
		let  _this = this;
		let html = document.querySelector("html");
		_this.btnToggleMenuMobile.forEach(function (element) {
			element.addEventListener('click', function() {

				_this.btnToggleMenuMobile.forEach(function (element) {
					element.classList.toggle("on");
				});
				_this.menuMobile.classList.toggle("active");
				// html.classList.toggle("fixed");
				_this.body.classList.toggle("fixed");
				_this.htmlPadding();
				return false;
			});
		});
	},


	closeMenu() {
		// toggleMenu();
		let  _this = this;
		_this.btnToggleMenuMobile.forEach(function (element) {
			element.classList.remove("on");
			
		});
		_this.menuMobile.classList.remove("active");
		_this.body.classList.remove("fixed");
		let html = document.querySelector("html"); 
		$("body").css("paddingRight", 0);
	},

	mobileMenu() {
		// закрыть/открыть мобильное меню
		let  _this = this;
		_this.paddRight('.top-line'); 
		_this.toggleMenu();
		_this.menuMobileLink.forEach(function (element)  {
			element.addEventListener('click',  function (e) {
				console.log(element);
				_this.closeMenu(); 
				
			});
		})
		document.addEventListener('mouseup', function (event)   {
			let container = event.target.closest(".aside--js.active"); // (1)
			let container2 = event.target.closest(".toggle-menu-mobile--js.on"); // (2)
			if (!container && !container2) {
				_this.closeMenu(); 
				
			}
		});
	},
	// /mobileMenu

	// табы  . 
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});
	},
	// /табы  
	inputMask() {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	}
	// /inputMask

};

function eventHandler() {
	setTimeout(() => {
		$('.before-load').find('img').fadeOut().parent().delay(400).fadeOut('slow',function(){
			$("body").removeClass("before-loaded");
			$(".aside--js").removeClass("before-loaded");
			var wow = new WOW({
				mobile: false
			});
			wow.init();
		});
		
	}, 1000);
	// полифил для object-fit
	objectFitImages();
	// Picture element HTML5 shiv
	document.createElement("picture");
	// для свг
	svg4everybody({});

	JSCCommon.modalCall();

	JSCCommon.tabscostume('tabs');

	JSCCommon.mobileMenu();

	JSCCommon.inputMask();

	 

	// const url = document.location.href;
	// $.each($(".top-nav__nav a "), function() {

	// 	if (this.href == url) {
	// 		if ($(this).hasClass("top-nav__link") == true) {

	// 			$(this).addClass('top-nav__link-active');
	// 		}
	// 		if ($(this).hasClass("footer__link") == true) {

	// 			$(this).addClass('footer__link-active');
	// 		} 
	// 	}; 
	// }); 

	// /закрыть/открыть мобильное меню

	function heightses() {

		const w = $(window).width();

		// $(".main-wrapper").css("margin-bottom", $('footer').height())
		// $(".otz__item .text-wrap ").height('auto').equalHeights();
		// 
		// скрывает моб меню

		const topH = $(".top-line").innerHeight();

		$(window).scroll(function() {
			if ($(window).scrollTop() > topH) {
				$('.top-line  ').addClass('fixed');
			} else {
				$('.top-line  ').removeClass('fixed');
			}
		});
		// конец добавил
		if (window.matchMedia("(min-width: 1200px)").matches) {
			JSCCommon.closeMenu();
		}
		function toggleColor() {
			let thScroll = 	$(window).scrollTop() + topH; 
				if(thScroll > $("#s-promocode").offset().top && thScroll < $("#s-cases").offset().top) {
				 $('.top-line').addClass("background--primary"); 
	
			}
			else{ 
				// console.log(thScroll);
				$('.top-line').removeClass("background--primary");
			} 
			if( (thScroll > $("#s-about").offset().top && thScroll < $("#s-best").offset().top) || (thScroll > $("#s-materials").offset().top && thScroll < $("#s-contact").offset().top) ) {
				$('.top-line').addClass("background--light"); 
				// console.log(thScroll);
			}
			else{ 
				// console.log(thScroll);
				$('.top-line').removeClass("background--light");
			} 
			return false; 

		}
		toggleColor();
		// / mask for input
		$(window).scroll(function () {
			toggleColor();
		})
	}

	$(window).resize(function() {
		heightses();

	});

	heightses();

	// листалка по стр
	$(" .scroll-link").click(function() {
		const elementClick = $(this).attr("href");
		const destination = $(elementClick).offset().top;

		$('html, body').animate({ scrollTop: destination }, 1100);

		return false;
	});



		// Cache selectors
		var lastId,
		topMenu = $(" .aside__inner .menu"),
				topMenuHeight = 0,
				// topMenuHeight = topMenu.outerHeight()+15,
				// All list items
				menuItems = topMenu.find("a"),
				// Anchors corresponding to menu items
				scrollItems = menuItems.map(function(){
					var item = $($(this).attr("href"));
					if (item.length) { return item; }
				});

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function(e){
			var href = $(this).attr("href"),
					offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
			$('html, body').stop().animate({ 
					scrollTop: offsetTop
			}, 1100);
			e.preventDefault();
		});

		// Bind to scroll
		$(window).scroll(function(){
			// Get container scroll position
			var fromTop = $(this).scrollTop()+topMenuHeight;
			
			// Get id of current scroll item
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop)
					return this;
			});
			// Get the id of the current element
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";
			
			if (lastId !== id) {
					lastId = id;
					// Set/remove active class
					menuItems
						.removeClass("active").parent()
						.end().filter("[href='#"+id+"']").addClass("active");
			}                   
		});



	$(".header-block__scroll-down").click(function() {
		const elementClick = "#s-about";
		const destination = $(elementClick).offset().top;

		$('html, body').animate({ scrollTop: destination }, 1100);

		return false;
	});
 

		// Custom JS
		if ($("video").is("#bgvid") && $("video").is(":visible")){
			var vid = document.getElementById("bgvid");
			var vidSource =$("#bgvid source");
		
			if (window.matchMedia('(prefers-reduced-motion)').matches) {
					vid.removeAttribute("autoplay");
					vid.pause();
					pauseButton.innerHTML = "Paused";
				} 
				$("#bgvid").attr("poster", $(this).data("poster") );
				vidSource.each(function(){
					$(this).attr("src", $(this).data("src") );
				})
		
			function vidFade() {
				vid.classList.add("stopfade");
			}
		
			vid.addEventListener('ended', function()
			{
			// only functional if "loop" is removed
			vid.pause();
			// to capture IE10
			vidFade();
			});
			}

	var gets = (function() {
		var a = window.location.search;
		var b = new Object();
		var c;
		a = a.substring(1).split("&");
		for (var i = 0; i < a.length; i++) {
			c = a[i].split("=");
			b[c[0]] = c[1];
		}
		return b;
	})();
	// form
	$("form").each(function() {
		// e.preventDefault();
		const th = $(this);
		var data = th.serialize();
		th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
		th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
		th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
		th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));

		
	}); 
		var scriptMap = document.createElement('script');
		scriptMap.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCnoRp8wBQeCZLL8k4R-vckP_wDGVR2k10&callback=initMap'; 
		scriptMap.async = "true";
		scriptMap.defer = "true";
		document.body.append(scriptMap);
	var map;
	var centerMap;
	var mapPosition = {lat:51.82294807220123,lng: 55.09849149999999};
		if (window.matchMedia("(min-width: 1200px)").matches) {

			centerMap = {lat:51.82294807220123,lng: 55.095} ;
		 
		}
		else{

			centerMap =  mapPosition;
		}

				function initMap() {
					
						map = new google.maps.Map(document.getElementById('map'), {
						zoom: 15,
						//- center: new google.maps.LatLng(53.98205856875258,88.80421049999992),
						center: new google.maps.LatLng(centerMap),
						mapTypeId: 'roadmap',
						styles: [ {"featureType": "all","elementType": "labels.text.fill","stylers": [
													{
															"saturation": 36
													},
													{
															"color": "#000000"
													},
													{
															"lightness": 40
													}
											]
									},
									{
											"featureType": "all",
											"elementType": "labels.text.stroke",
											"stylers": [
													{
															"visibility": "on"
													},
													{
															"color": "#000000"
													},
													{
															"lightness": 16
													}
											]
									},
									{
											"featureType": "all",
											"elementType": "labels.icon",
											"stylers": [
													{
															"visibility": "off"
													}
											]
									},
									{
											"featureType": "administrative",
											"elementType": "geometry.fill",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 20
													}
											]
									},
									{
											"featureType": "administrative",
											"elementType": "geometry.stroke",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 17
													},
													{
															"weight": 1.2
													}
											]
									},
									{
											"featureType": "landscape",
											"elementType": "geometry",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 20
													}
											]
									},
									{
											"featureType": "poi",
											"elementType": "geometry",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 21
													}
											]
									},
									{
											"featureType": "road.highway",
											"elementType": "geometry.fill",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 17
													}
											]
									},
									{
											"featureType": "road.highway",
											"elementType": "geometry.stroke",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 29
													},
													{
															"weight": 0.2
													}
											]
									},
									{
											"featureType": "road.arterial",
											"elementType": "geometry",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 18
													}
											]
									},
									{
											"featureType": "road.local",
											"elementType": "geometry",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 16
													}
											]
									},
									{
											"featureType": "transit",
											"elementType": "geometry",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 19
													}
											]
									},
									{
											"featureType": "water",
											"elementType": "geometry",
											"stylers": [
													{
															"color": "#000000"
													},
													{
															"lightness": 17
													}
											]
									}
							]
						});
						var iconBase = 'img/@2x/mark.png';
						var icons = {
						
						info: {
						icon: iconBase
						}
						};
						var features = [
						{
						position: new google.maps.LatLng( mapPosition),
						type: 'info',
						title: 'Россия, Оренбург, Шоссейная улица, 24',
						}, 
						//- {
						//- position: new google.maps.LatLng(54.999397069703306,82.95985649999986),
						//- type: 'info',
						//- title: 'г. Новосибирск',
						//- },  
						];
						// Create markers.
						features.forEach(function(feature) {
						var marker = new google.maps.Marker({
						position: feature.position,
						icon: icons[feature.type].icon,
						map: map,
						title: feature.title,
						//- title: title
						});
						});
					}
					setTimeout(function() { 
					initMap();
				}, 3000);

				

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}




