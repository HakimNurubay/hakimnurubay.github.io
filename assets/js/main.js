/**
* Template Name: LHT SANS - v5.0.0
* Template URL: https://hakimnurubay.github.io/LHT-SANS/
* Author: Hakim Nurubay
* License: All right reserved by Hakim N.
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
	
  /**
  * Owl Carousel
  */
  
  $('.owl-carousel').owlCarousel({
            margin: 10,
            nav: true,
            navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
        });
		
  /**
  * Instafeed
  */
  $( document ).ready(function() {
  
    var feed = new Instafeed({
        get: 'user',
        userId: '1177798209316178',
        limit: 12,
        resolution: "thumbnail",
        accessToken: 'IGQVJXbHlfLWtQcDNBOXp5aUxQdklmSWRWRjhkazdmWG9tN1RhUGNKNjJiRlhJY3VJUlBQa3RqbnZAEMFdmTzdoMVRXSGZACckNjSlVhWXZAhVWRxdGd2Tnh1Y05OSnFiV2llUXZAWZAU5DNVlTYlROMmUtYQZDZD',
		template: '<div class="col gallery instaimg"><a href="{{image}}" title="{{caption}}" src="{{image}" target="_blank"><img src="{{image}}" alt="caption" class="img-fluid"/></a><div class="text">{{caption}}</div></div>',
	});
	
  // call feed.next() on button click
  $('.loadmore').on('click', function() {
  feed.next();
  });
    
    feed.run();
	
    });
	
  $('.gallery').magnificPopup({
    type: 'image',
	delegate: 'a',
    gallery:{
      enabled:true
    }
    
	});
  
  /**
  * Contact Form
  */
  const scriptURL = "https://script.google.com/macros/s/AKfycbxiQ66IibRENk6MvpZg2nma8hkbZ2RSmZE2Lj58AT4Y1vsvyfgjJkB98hWj-8m7d8pY/exec";
      const form = document.forms["my-portfolio-contact-form"];
      const btnSend = document.querySelector(".btn-send");
      const btnLoading = document.querySelector(".btn-loading");
      const myAlert = document.querySelector(".my-alert");

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        btnLoading.classList.toggle("d-none");
        btnSend.classList.toggle("d-none");
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) => {
            btnLoading.classList.toggle("d-none");
            btnSend.classList.toggle("d-none");
            myAlert.classList.toggle("d-none");
            form.reset();
            console.log("Success!", response);
          })
          .catch((error) => console.error("Error!", error.message));
      });
	
})()