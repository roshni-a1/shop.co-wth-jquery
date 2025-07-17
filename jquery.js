$(document).ready(function(){

  // 1. Smooth scroll for header nav links
  $('nav a[href^="#"]').on('click', function(e){
    e.preventDefault();
    let target = $($(this).attr('href'));
    if(target.length){
      $('html, body').animate({scrollTop: target.offset().top - 80}, 600);
    }
  });

  // 2. Back to top button
  $('body').append('<button class="back-to-top" style="display:none;position:fixed;bottom:20px;right:20px;z-index:9999;">↑</button>');
  $(window).scroll(function(){
    if($(window).scrollTop() > 300){
      $('.back-to-top').fadeIn();
    } else {
      $('.back-to-top').fadeOut();
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop: 0}, 600);
  });

  // 3. Button ripple effect
  $('button').on('click', function(e){
    var $btn = $(this);
    var $ripple = $('<span class="ripple"></span>');
    var pos = $btn.offset();
    var x = e.pageX - pos.left;
    var y = e.pageY - pos.top;
    $ripple.css({top: y, left: x});
    $btn.append($ripple);
    setTimeout(() => $ripple.remove(), 600);
  });

  // 4. Fade in sections on scroll
  $(window).on('scroll', function(){
    $('.products-section, .hero-section, #testimonials, #subscribe, .cta-banner').each(function(){
      if($(window).scrollTop() + $(window).height() > $(this).offset().top + 100){
        $(this).addClass('fade-in');
      }
    });
  });

  // 5. Brand logo infinite horizontal scroll
  let $slideTrack = $('.slide-track');
  let scrollAmount = 0;
  function scrollLogos() {
    scrollAmount++;
    if(scrollAmount > $slideTrack.width() / 2){
      scrollAmount = 0;
    }
    $slideTrack.css('transform', 'translateX(' + (-scrollAmount) + 'px)');
    requestAnimationFrame(scrollLogos);
  }
  scrollLogos();

  // 6. Stats count-up animation on scroll
  let counted = false;
  $(window).scroll(function() {
    let oTop = $('.stats').offset().top - window.innerHeight;
    if(!counted && $(window).scrollTop() > oTop) {
      $('.stats strong').each(function() {
        let $this = $(this);
        $({countNum: 0}).animate({countNum: parseInt($this.text())}, {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
          }
        });
      });
      counted = true;
    }
  });

  // 7. Testimonials fade carousel
  let testiIndex = 0;
  function showTestimonial() {
    let testimonials = $('#testimonials .testimonial');
    testimonials.hide();
    testiIndex++;
    if(testiIndex > testimonials.length) testiIndex = 1;
    testimonials.eq(testiIndex -1).fadeIn(600);
    setTimeout(showTestimonial, 5000);
  }
  showTestimonial();

  // 8. Subscribe email validation
  $('#subscribe button').click(function(){
    let email = $('#subscribe input[type="email"]').val();
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(email)){
      alert('Please enter a valid email address!');
    } else {
      alert('Subscribed successfully!');
    }
  });

  // 9. Hover zoom on product images
  $('.product img').hover(function(){
    $(this).css('transform', 'scale(1.1)');
  }, function(){
    $(this).css('transform', 'scale(1)');
  });

  // 10. Shop now buttons scroll to New Arrivals
  $('#shopBtn, .shop-btn').click(function(){
    $('html, body').animate({
      scrollTop: $('#new').offset().top - 80
    }, 800);
  });

  // 11. Sticky header on scroll
  $(window).scroll(function(){
    if($(this).scrollTop() > 100){
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }
  });

  // 12. Twinkling stars animation
  setInterval(() => {
    $('.star1, .star2').fadeOut(700).fadeIn(700);
  }, 1400);

  // 13. Active nav link highlight on scroll
  $(window).on('scroll', function(){
    let scrollPos = $(document).scrollTop() + 100;
    $('nav a').each(function(){
      let refElement = $($(this).attr('href'));
      if(refElement.position() && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos){
        $('nav a').removeClass('active');
        $(this).addClass('active');
      }
    });
  });

  // 14. New Arrivals fade in product cards on scroll
  $(window).scroll(function(){
    $('.products .product').each(function(){
      if($(window).scrollTop() + $(window).height() > $(this).offset().top + 50){
        $(this).addClass('visible');
      }
    });
  });

  // 15. Shadow highlight on product hover
  $('.product').hover(function(){
    $(this).css('box-shadow', '0 10px 20px rgba(203,108,230,0.4)');
  }, function(){
    $(this).css('box-shadow', 'none');
  });

  // 16. Keyboard arrow navigation for testimonials
  $(document).ready(function() {
  let testimonials = $('#testimonials .testimonial');
  let testiIndex = 0; // zero-based index
  testimonials.hide().eq(testiIndex).show(); // show first testimonial initially
  
  // Debounce flag to avoid rapid keypress issues
  let canNavigate = true;

  $(document).keydown(function(e) {
    if(!canNavigate) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      testiIndex = (testiIndex + 1) % testimonials.length; // next testimonial (wrap around)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      testiIndex = (testiIndex - 1 + testimonials.length) % testimonials.length; // previous testimonial (wrap around)
    } else {
      return; // ignore other keys
    }

    canNavigate = false;
    testimonials.fadeOut(300);
    testimonials.eq(testiIndex).delay(300).fadeIn(400, function() {
      canNavigate = true; // re-enable navigation after animation
    });
  });
});


  // 17. Highlight nav link on hover with underline animation
  $('nav a').hover(function(){
    $(this).css({'text-decoration':'underline','text-decoration-color':'#cb6ce6'});
  }, function(){
    $(this).css({'text-decoration':'none'});
  });

  // 18. Animate CTA banner button color pulse
  setInterval(() => {
    $('.cta-banner button').animate({backgroundColor: '#cb6ce6'}, 800).animate({backgroundColor: '#6a0dad'}, 800);
  }, 1600);

  // 19. Auto-expand subscribe email input height on focus
  $('#subscribe input[type="email"]').focus(function(){
    $(this).animate({height: '40px'}, 300);
  }).blur(function(){
    $(this).animate({height: '30px'}, 300);
  });

  // 20. Scroll progress bar at top of page
  $('body').prepend('<div class="scroll-progress-bar"></div>');
  $(window).scroll(function(){
    let scrollPercent = ($(window).scrollTop()) / ($(document).height() - $(window).height()) * 100;
    $('.scroll-progress-bar').css('width', scrollPercent + '%');
  });

  // 21. Animate nav links sliding from top on page load
  $('nav a').css({position:'relative', top:'-20px', opacity:0}).each(function(i){
    $(this).delay(i * 150).animate({top: '0px', opacity:1}, 600);
  });

  // 22. Animate hero h1 letter by letter
  let heroH1 = $('.hero-content h1');
let html = heroH1.html();
let newHtml = '';

for(let i = 0; i < html.length; i++){
  let char = html[i];
  if(char === '<'){
    // detect and preserve <br> tags as is
    let brTag = html.slice(i, i + 4);
    if(brTag === '<br>'){
      newHtml += '<br>';
      i += 3; // skip ahead after <br>
      continue;
    }
  }
  if(char === ' '){
    newHtml += ' '; // preserve spaces without spans
  } else {
    newHtml += '<span class="letter" style="opacity:0;">' + char + '</span>';
  }
}
heroH1.html(newHtml);

// Animate letters sequentially
$('.letter').each(function(i){
  $(this).delay(i * 100).animate({opacity:1}, 400);
});

  // 23. Products image grayscale to color on hover
  $('.product img').hover(function(){
    $(this).css('filter', 'grayscale(0%)');
  }, function(){
    $(this).css('filter', 'grayscale(100%)');
  });

  // 24. Testimonials slide left/right on click arrows (add arrows in HTML if needed)
  $(document).ready(function() {
  let testimonials = $('#testimonials .testimonial');
  let testiIndex = 0;

  testimonials.hide().eq(testiIndex).show();

  setInterval(function() {
    testimonials.eq(testiIndex).fadeOut(600, function() {
      testiIndex = (testiIndex + 1) % testimonials.length;
      testimonials.eq(testiIndex).fadeIn(600);
    });
  }, 5000); // change slide every 5 seconds
});


  // 25. Parallax effect on hero background stars on mouse move
  $(document).mousemove(function(e){
    $('.star1').css('transform', 'translate(' + (e.pageX/50) + 'px,' + (e.pageY/50) + 'px)');
    $('.star2').css('transform', 'translate(' + (-e.pageX/60) + 'px,' + (-e.pageY/60) + 'px)');
  });

  // 26. Animate stats numbers with commas on scroll
  let statsAnimated = false;
$(window).scroll(function(){
  let oTop = $('.stats').offset().top - window.innerHeight;
  if(!statsAnimated && $(window).scrollTop() > oTop){
    $('.stats strong').each(function(){
      let $this = $(this);
      // comma remove kore number nite hobe
      let num = parseInt($this.text().replace(/,/g, ''));
      $({countNum:0}).animate({countNum:num}, {
        duration: 2000,
        easing: 'swing',
        step: function(){
          $this.text(Math.floor(this.countNum).toLocaleString());
        },
        complete: function() {
          $this.text(num.toLocaleString());
        }
      });
    });
    statsAnimated = true;
  }
});

  // 27. Animate footer menu links on hover
  $('footer ul li a').hover(function(){
    $(this).animate({paddingLeft: '10px'}, 200);
  }, function(){
    $(this).animate({paddingLeft: '0'}, 200);
  });

  // 28. Toggle "Shop Now" buttons bounce on hover
  $('#shopBtn, .shop-btn').hover(function(){
    $(this).animate({top: '-5px'}, 200).animate({top: '0'}, 200);
  });

  // 29. Highlight container border on focus for subscribe input
  $('#subscribe input').focus(function(){
    $(this).css('border-color', '#cb6ce6');
  }).blur(function(){
    $(this).css('border-color', '');
  });

  // 30. New arrivals products stagger fade-in on page load
  $('.products-section#new .product').each(function(i){
    $(this).delay(i*200).animate({opacity:1, top:0}, 600);
  });

  // 31. Smooth scroll to testimonials on clicking "Customers" nav link
  $('nav a[href="#testimonials"]').click(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: $('#testimonials').offset().top - 80}, 600);
  });

  // 32. Animate hero paragraph fade-in delay
  $('.hero-content p').css('opacity', 0).delay(1500).animate({opacity: 1}, 800);

  // 33. Animate new arrivals product images zoom in on scroll
  $(window).scroll(function(){
    $('.products-section#new .product img').each(function(){
      if($(window).scrollTop() + $(window).height() > $(this).offset().top + 50){
        $(this).addClass('zoom-in');
      }
    });
  });

  // 34. Zoom-in CSS class for product images
  $('<style>.zoom-in{transform:scale(1.1);transition:transform 0.5s ease;}</style>').appendTo('head');

  // 35. Animate brand logos fade in/out cycling every 3 seconds
  let brandIndex = 0;
  let brands = $('.slide');
  setInterval(function(){
    brands.fadeOut(500);
    brandIndex = (brandIndex + 1) % brands.length;
    brands.eq(brandIndex).fadeIn(500);
  }, 3000);

  // 36. Add focus effect on footer social spans
  $('footer span').hover(function(){
    $(this).css({'color':'#cb6ce6', 'cursor':'pointer'});
  }, function(){
    $(this).css('color', '');
  });

  // 37. Toggle newsletter input placeholder on focus/blur
  $('#subscribe input').focus(function(){
    $(this).attr('placeholder', '');
  }).blur(function(){
    $(this).attr('placeholder', 'Enter your email');
  });

  // 38. Animate contact footer fade-in on scroll
  $(window).scroll(function(){
    let footerTop = $('footer').offset().top - window.innerHeight;
    if($(window).scrollTop() > footerTop){
      $('footer').animate({opacity:1}, 1200);
    }
  });

  // 39. Smooth scroll for footer menu links
  $('footer ul li a').click(function(e){
    e.preventDefault();
    let target = $($(this).attr('href'));
    if(target.length){
      $('html, body').animate({scrollTop: target.offset().top - 80}, 600);
    }
  });

  // 40. Animate products-section headers on scroll
  $(window).scroll(function(){
    $('section.products-section h3').each(function(){
      if($(window).scrollTop() + $(window).height() > $(this).offset().top + 50){
        $(this).addClass('slide-in');
      }
    });
  });
  $('<style>.slide-in{animation:slideInLeft 1s forwards;opacity:1;} section.products-section h3{opacity:0;} @keyframes slideInLeft{from{transform:translateX(-100px);opacity:0;} to{transform:translateX(0);opacity:1;}}</style>').appendTo('head');

  // 41. Highlight nav menu on hover with color fade
  $('nav a').hover(function(){
    $(this).stop().animate({color: '#cb6ce6'}, 300);
  }, function(){
    $(this).stop().animate({color: '#000'}, 300);
  });

  // 42. Fade in new arrivals product price on hover
  $('.product').hover(function(){
    $(this).find('span').fadeIn(400);
  }, function(){
    $(this).find('span').fadeOut(400);
  });

  // 43. Animate testimonials quote fade-in letters
  $('#testimonials .testimonial').each(function(){
    let text = $(this).text();
    $(this).html('');
    $.each(text.split(''), (i, ch) => {
      $(this).append('<span class="letter" style="opacity:0;">'+ch+'</span>');
    });
  });
  function animateLetters(){
    $('#testimonials .testimonial .letter').each(function(i){
      $(this).delay(i*50).animate({opacity:1}, 300);
    });
  }
  animateLetters();

  // 44. Animate subscribe section input and button pulse every 5 seconds
  setInterval(() => {
    $('#subscribe input, #subscribe button').animate({opacity:0.7}, 1000).animate({opacity:1}, 1000);
  }, 5000);

  // 45. Products image grayscale filter on scroll
  $(window).scroll(function(){
    $('.product img').each(function(){
      let top = $(this).offset().top;
      if($(window).scrollTop() + $(window).height() > top + 50){
        $(this).css('filter', 'grayscale(0%)');
      } else {
        $(this).css('filter', 'grayscale(100%)');
      }
    });
  });

  // 46. Animate star elements rotate infinitely
  function rotateStar() {
    $('.star1').animate({deg: 360}, {
      duration: 8000,
      step: function(now){
        $(this).css({transform: 'rotate(' + now + 'deg)'});
      },
      complete: rotateStar
    });
  }
  rotateStar();

  // 47. Animate star2 rotate reverse infinitely
  function rotateStarReverse() {
    $('.star2').animate({deg: -360}, {
      duration: 10000,
      step: function(now){
        $(this).css({transform: 'rotate(' + now + 'deg)'});
      },
      complete: rotateStarReverse
    });
  }
  rotateStarReverse();

  // 48. Animate brand logos scale pulse on hover
  $('.slide').hover(function(){
    $(this).css('transform', 'scale(1.1)');
  }, function(){
    $(this).css('transform', 'scale(1)');
  });

  // 49. Animate footer copyright fade in on page load
  $('.copyright').css('opacity', 0).delay(1500).animate({opacity:1}, 800);

  // 50. Animate cta banner text pulse every 4 seconds
  setInterval(() => {
    $('.cta-banner h3').animate({opacity:0.5}, 1500).animate({opacity:1}, 1500);
  }, 4000);

  // 51. Animate nav links scale on click
  $('nav a').click(function(){
    $(this).animate({fontSize: '1.2em'}, 150).animate({fontSize: '1em'}, 150);
  });

  // 52. Animate header container padding on scroll
  $(window).scroll(function(){
    if($(this).scrollTop() > 150){
      $('header .container').animate({padding: '10px 0'}, 200);
    } else {
      $('header .container').animate({padding: '30px 0'}, 200);
    }
  });

  // 53. Animate hover scale for dress style images
  $('.dress-style img').hover(function(){
    $(this).css('transform', 'scale(1.05)');
  }, function(){
    $(this).css('transform', 'scale(1)');
  });

  // 54. Animate footer grid div fade in staggered
  $('footer .footer-grid > div').each(function(i){
    $(this).delay(i*300).animate({opacity:1, top:0}, 600);
  });

  // 55. Animate nav bar background color on hover
  $('nav').hover(function(){
    $(this).animate({backgroundColor: '#f5f5f5'}, 300);
  }, function(){
    $(this).animate({backgroundColor: 'transparent'}, 300);
  });

  // 56. Animate product name text color on hover
  $('.product p').hover(function(){
    $(this).animate({color: '#cb6ce6'}, 300);
  }, function(){
    $(this).animate({color: '#000'}, 300);
  });

  // 57. Animate newsletter button background color on hover
  $('#subscribe button').hover(function(){
    $(this).animate({backgroundColor: '#cb6ce6'}, 300);
  }, function(){
    $(this).animate({backgroundColor: '#000'}, 300);
  });

  // 58. Animate new arrivals product cards rotate on hover
  $('.products-section#new .product').hover(function(){
    $(this).css('transform', 'rotate(2deg)');
  }, function(){
    $(this).css('transform', 'rotate(0)');
  });

  // 59. Animate testimonials stars scale pulse
  $('#testimonials .testimonial').hover(function(){
    $(this).find('⭐').animate({fontSize: '1.5em'}, 300);
  }, function(){
    $(this).find('⭐').animate({fontSize: '1em'}, 300);
  });

  // 60. Animate footer social spans bounce on hover
  $('footer span').hover(function(){
    $(this).animate({top: '-5px'}, 200).animate({top: '0'}, 200);
  });

});


// 61. Gradient Text on Hover (Hero, Links, Headings)
$('.hero h1, .hero h2, .hero a').hover(function(){
  $(this).css({
    'background': 'linear-gradient(to right, #00f2fe, #4facfe)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    'transition': '0.6s ease-in-out'
  });
}, function(){
  $(this).css({
    'background': '',
    '-webkit-background-clip': '',
    '-webkit-text-fill-color': '',
  });
});

// 62. Scroll-triggered Text Slide Reveal with Blur
$('.section-title, .hero h1').css({'opacity':0, 'transform':'translateY(50px)', 'filter':'blur(4px)'});
$(window).on('scroll', function(){
  $('.section-title, .hero h1').each(function(){
    if($(window).scrollTop() + window.innerHeight > $(this).offset().top + 50){
      $(this).css({
        'opacity':1,
        'transform':'translateY(0)',
        'filter':'blur(0)',
        'transition':'1.2s ease-out'
      });
    }
  });
});

// 63. Tilt on Hover for Cards/Boxes
$('.tbox, .card, .service-box').on('mousemove', function(e){
  let $this = $(this);
  let relX = e.pageX - $this.offset().left;
  let relY = e.pageY - $this.offset().top;
  let centerX = $this.width() / 2;
  let centerY = $this.height() / 2;
  let rotateX = (relY - centerY) / 15;
  let rotateY = (centerX - relX) / 15;
  $this.css('transform', `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
}).on('mouseleave', function(){
  $(this).css('transform', 'rotateX(0) rotateY(0)');
});

// 64. Floating Neon Glow on Cards/Buttons
setInterval(() => {
  $('.tbox, .btn, .service-box').each(function(){
    $(this).css('box-shadow', `0 0 15px ${getRandomColor()}, 0 0 30px ${getRandomColor()}`);
  });
}, 1200);
function getRandomColor(){
  const colors = ['#00f2fe', '#cb6ce6', '#004aad', '#ff6ec4'];
  return colors[Math.floor(Math.random()*colors.length)];
}

// 55. Scale In on Scroll for Images/Boxes
$('.hero img, .portfolio img, .tbox').css({'transform':'scale(0.85)', 'opacity':'0'});
$(window).on('scroll', function(){
  $('.hero img, .portfolio img, .tbox').each(function(){
    if($(window).scrollTop() + window.innerHeight > $(this).offset().top + 100){
      $(this).css({
        'transform':'scale(1)',
        'opacity':'1',
        'transition':'1s ease-out'
      });
    }
  });
});

// 66. Text Shadow Flicker Effect
setInterval(() => {
  $('.hero h1, h2, h3, .section-title').each(function(){
    $(this).css('text-shadow', `0 0 8px ${getRandomColor()}`);
  });
}, 900);

// 67. Button Pulse Effect on Hover
$('.btn, .hire-btn, .read-more').hover(function(){
  $(this).css({
    'transform': 'scale(1.05)',
    'box-shadow': '0 0 10px #00f2fe',
    'transition': '0.4s ease'
  });
}, function(){
  $(this).css({
    'transform': 'scale(1)',
    'box-shadow': 'none'
  });
});

// 68. Border Animation on Hover
$('.tbox, .card, .img, .btn').hover(function(){
  $(this).css({
    'border': '2px solid transparent',
    'border-image': 'linear-gradient(45deg, #00f2fe, #cb6ce6) 1',
    'transition': 'border 0.5s ease'
  });
}, function(){
  $(this).css('border', '');
});

// 69. Background Shine Swipe Effect
$('.tbox, .card, .service-box').on('mouseenter', function(){
  $(this).append('<div class="shine"></div>');
  $('.shine').css({
    position: 'absolute',
    top: 0, left: '-75%',
    width: '50%',
    height: '100%',
    background: 'linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05), rgba(255,255,255,0.2))',
    transform: 'skewX(-25deg)',
    animation: 'shine 1s forwards'
  });
  setTimeout(()=>{$('.shine').remove();}, 1000);
});

// 70. Floating Bounce on Scroll Trigger
$('.hero img, .service-box, .portfolio img').css('transition', 'transform 1s ease');
$(window).on('scroll', function(){
  $('.hero img, .service-box, .portfolio img').each(function(){
    if($(window).scrollTop() + window.innerHeight > $(this).offset().top + 50){
      $(this).css('transform', 'translateY(-10px)');
      setTimeout(() => {
        $(this).css('transform', 'translateY(0)');
      }, 500);
    }
  });
});


// For responsive
$(function(){

  function adjustLayout(){
    const w = $(window).width();
    
    // Example: hero h1 font size dynamic adjustment
    if(w > 1200){
      $('.hero-section h1').css({'font-size': '3rem', 'line-height': '1.2'});
    } else if(w > 991){
      $('.hero-section h1').css({'font-size': '2.5rem', 'line-height': '1.3'});
    } else if(w > 767){
      $('.hero-section h1').css({'font-size': '2rem', 'line-height': '1.3'});
    } else if(w > 575){
      $('.hero-section h1').css({'font-size': '1.6rem', 'line-height': '1.3'});
    } else {
      $('.hero-section h1').css({'font-size': '1.3rem', 'line-height': '1.3'});
    }

    // Product width adjustment
    if(w > 991){
      $('.products .product').css('width', '23%');
    } else if(w > 767){
      $('.products .product').css('width', '48%');
    } else {
      $('.products .product').css('width', '100%');
    }
    
    // Show/hide nav & toggle button for menu
    if(w <= 991){
      if($('#navToggle').length === 0){
        let btn = $('<button id="navToggle" aria-label="Toggle Menu" aria-expanded="false" aria-controls="mainNav">☰</button>');
        btn.css({
          position: 'absolute',
          top: '15px',
          right: '15px',
          'font-size': '1.8rem',
          background: 'transparent',
          border: 'none',
          color: '#000',
          cursor: 'pointer',
          'z-index': 9999
        });
        $('header .container').prepend(btn);

        btn.on('click', function(){
          const nav = $('header nav');
          let expanded = btn.attr('aria-expanded') === 'true';
          if(expanded){
            nav.slideUp(250);
            btn.attr('aria-expanded', 'false');
          } else {
            nav.slideDown(250);
            btn.attr('aria-expanded', 'true');
          }
        });
      }
      $('header nav').hide();
      $('#navToggle').show();
    } else {
      $('#navToggle').hide();
      $('header nav').show();
    }
  }

  adjustLayout();
  $(window).resize(adjustLayout);

});
