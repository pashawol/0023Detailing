"use strict";

var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".aside--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".aside--js ul li a")),
	body: document.querySelector("body"),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$(document).on('click', '.link-modal', function () {
			var th = $(this);
			var modal = th.attr('href');
			$(modal).find(".order").val(th.data('order'));
			$(modal).find(".form-wrap__title--js").html(th.data('title')); // $(modal).find(".form-wrap__text--js").html(th.data('text')); 

			$(modal).find(".form-wrap__btn").text(th.data('btn'));

			if ($(this).hasClass("modal-win__btn")) {
				$(modal).find(".order").val("Акция: " + th.parent().find(".title").text());
			}

			if ($(this).hasClass("s-services__btn")) {
				$(modal).find(".order").val("Заявка на: " + th.parents(".s-services__item").find(".s-services__item-title").text());
			}
		});
	},
	paddRight: function paddRight(elem) {
		var div = document.createElement('div');
		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';
		document.body.append(div);
		var padd = div.offsetWidth - div.clientWidth; // console.log(1);

		$(elem).css("paddingRight", padd);
		div.remove();
	},
	htmlPadding: function htmlPadding() {
		var _this = this;

		if ($("body").hasClass("fixed")) {
			_this.paddRight(_this.body); // console.log(this);

		} else {
			$("body").css("paddingRight", 0);
		}
	},
	// /magnificPopupCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		var html = document.querySelector("html");

		_this.btnToggleMenuMobile.forEach(function (element) {
			element.addEventListener('click', function () {
				_this.btnToggleMenuMobile.forEach(function (element) {
					element.classList.toggle("on");
				});

				_this.menuMobile.classList.toggle("active"); // html.classList.toggle("fixed");


				_this.body.classList.toggle("fixed");

				_this.htmlPadding();

				return false;
			});
		});
	},
	closeMenu: function closeMenu() {
		// toggleMenu();
		var _this = this;

		_this.btnToggleMenuMobile.forEach(function (element) {
			element.classList.remove("on");
		});

		_this.menuMobile.classList.remove("active");

		_this.body.classList.remove("fixed");

		var html = document.querySelector("html");
		$("body").css("paddingRight", 0);
	},
	mobileMenu: function mobileMenu() {
		// закрыть/открыть мобильное меню
		var _this = this;

		_this.paddRight('.top-line');

		_this.toggleMenu();

		_this.menuMobileLink.forEach(function (element) {
			element.addEventListener('click', function (e) {
				console.log(element);

				_this.closeMenu();
			});
		});

		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".aside--js.active"); // (1)

			var container2 = event.target.closest(".toggle-menu-mobile--js.on"); // (2)

			if (!container && !container2) {
				_this.closeMenu();
			}
		});
	},
	// /mobileMenu
	// табы  . 
	tabscostume: function tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active');
		});
	},
	// /табы  
	inputMask: function inputMask() {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	} // /inputMask

};

function eventHandler() {
	// полифил для object-fit
	objectFitImages(); // Picture element HTML5 shiv

	document.createElement("picture"); // для свг

	svg4everybody({});
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask(); // const url = document.location.href;
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
		var w = $(window).width(); // $(".main-wrapper").css("margin-bottom", $('footer').height())
		// $(".otz__item .text-wrap ").height('auto').equalHeights();
		// 
		// скрывает моб меню

		var topH = $(".top-line").innerHeight();
		$(window).scroll(function () {
			if ($(window).scrollTop() > topH) {
				$('.top-line  ').addClass('fixed');
			} else {
				$('.top-line  ').removeClass('fixed');
			}
		}); // конец добавил

		if (window.matchMedia("(min-width: 1200x)").matches) {
			JSCCommon.closeMenu();
		}

		function toggleColor() {
			var thScroll = $(window).scrollTop() + topH;

			if (thScroll > $("#s-promocode").offset().top && thScroll < $("#s-cases").offset().top) {
				$('.top-line').addClass("background--primary");
			} else {
				// console.log(thScroll);
				$('.top-line').removeClass("background--primary");
			}

			if (thScroll > $("#s-about").offset().top && thScroll < $("#s-best").offset().top || thScroll > $("#s-materials").offset().top && thScroll < $("#s-contact").offset().top) {
				$('.top-line').addClass("background--light"); // console.log(thScroll);
			} else {
				// console.log(thScroll);
				$('.top-line').removeClass("background--light");
			}

			return false;
		}

		toggleColor(); // / mask for input

		$(window).scroll(function () {
			toggleColor();
		});
	}

	$(window).resize(function () {
		heightses();
	});
	heightses(); // листалка по стр

	$(" .aside__inner li a, .scroll-link").click(function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html, body').animate({
			scrollTop: destination
		}, 1100);
		return false;
	});
	$(".header-block__scroll-down").click(function () {
		var elementClick = "#s-about";
		var destination = $(elementClick).offset().top;
		$('html, body').animate({
			scrollTop: destination
		}, 1100);
		return false;
	}); // Custom JS

	if ($("video").is("#bgvid") && $("video").is(":visible")) {
		var vidFade = function vidFade() {
			vid.classList.add("stopfade");
		};

		var vid = document.getElementById("bgvid");
		var vidSource = $("#bgvid source");

		if (window.matchMedia('(prefers-reduced-motion)').matches) {
			vid.removeAttribute("autoplay");
			vid.pause();
			pauseButton.innerHTML = "Paused";
		}

		$("#bgvid").attr("poster", $(this).data("poster"));
		vidSource.each(function () {
			$(this).attr("src", $(this).data("src"));
		});
		vid.addEventListener('ended', function () {
			// only functional if "loop" is removed
			vid.pause(); // to capture IE10

			vidFade();
		});
	}

	var gets = function () {
		var a = window.location.search;
		var b = new Object();
		var c;
		a = a.substring(1).split("&");

		for (var i = 0; i < a.length; i++) {
			c = a[i].split("=");
			b[c[0]] = c[1];
		}

		return b;
	}(); // form


	$("form").each(function () {
		// e.preventDefault();
		var th = $(this);
		var data = th.serialize();
		th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
		th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
		th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
		th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}