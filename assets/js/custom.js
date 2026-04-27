(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var headerHeight = $('header').outerHeight() || 0;
	  var heroHeight = $('.header-text').first().outerHeight() || 0;
	  var pageHeadingHeight = $('.page-heading').first().outerHeight() || 0;

	  // English: Use a safe fallback threshold for pages without hero banners.
	  // 中文：當頁面沒有首頁大圖區時，改用保底門檻，避免判斷失效。
	  var triggerPoint = 10;

	  if (heroHeight > 0) {
	    triggerPoint = Math.max(heroHeight - headerHeight, 10);
	  } else if (pageHeadingHeight > 0) {
	    triggerPoint = Math.max(pageHeadingHeight - headerHeight, 10);
	  }

	  if (scroll >= triggerPoint) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	// Initialize Owl carousel only on pages that actually have banner slides.
	// 只在有輪播區塊的頁面初始化 Owl，避免非首頁呼叫外掛報錯。
	if ($('.owl-banner').length && $.fn.owlCarousel) {
		$('.owl-banner').owlCarousel({
		  center: true,
	      items:1,
	      loop:true,
	      nav: true,
		  dots:true,
		  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
	      margin:30,
	      responsive:{
	        992:{
	            items:1
	        },
			1200:{
				items:1
			}
	      }
		});
	}

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.properties-box');
	const filtersElem = document.querySelector('.properties-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.properties-items',
			layoutMode: 'masonry',
			// 維持大致左到右順序，減少篩選後「中間空一欄」的視覺洞 / preserve left-to-right order within masonry
			masonry: {
				horizontalOrder: true
			}
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function (event) {
				// 找到實際被點到的篩選連結（比未定義的 matchesSelector 穩，且 a 內有子節點也 OK）
				// Resolve the filter <a>; replaces missing matchesSelector util and handles nested elements
				const link = event.target.closest('a');
				if (!link || !filtersElem.contains(link)) {
					return;
				}
				event.preventDefault();
				const filterValue = link.getAttribute('data-filter');
				rdn_events_list.arrange({ filter: filterValue });
				const current = filtersElem.querySelector('.is_active');
				if (current) {
					current.classList.remove('is_active');
				}
				link.classList.add('is_active');
			});
		}
	}

	// Contact form fake submit (frontend only)
	// English: Prevent page reload and show success feedback without clearing inputs.
	// 中文：攔截表單送出避免重整，顯示成功訊息且保留使用者輸入。
	const contactForms = document.querySelectorAll('#contact-form');
	contactForms.forEach(function(form) {
		form.addEventListener('submit', function(event) {
			event.preventDefault();

			// Keep browser-native validation UX.
			// 保留瀏覽器原生驗證提示。
			if (!form.checkValidity()) {
				form.reportValidity();
				return;
			}

			let feedback = form.querySelector('.form-feedback');
			if (!feedback) {
				feedback = document.createElement('p');
				feedback.className = 'form-feedback is-success';
				feedback.setAttribute('role', 'status');
				feedback.setAttribute('aria-live', 'polite');
				form.appendChild(feedback);
			}

			feedback.textContent = '已收到您的預約資訊，我們會盡快與您聯絡。';
			feedback.classList.add('is-visible');
		});
	});


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

})(window.jQuery);