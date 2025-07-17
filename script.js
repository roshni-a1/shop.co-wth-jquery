document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     HERO + HEADER
  ------------------------------------------------*/
  // 1. Fade in hero text on load
  const heroH2 = document.querySelector('.hero h2');
  heroH2.style.opacity = 0;
  setTimeout(() => { heroH2.style.opacity = 1; heroH2.style.transition = 'opacity 1s'; }, 300);

  // 2. Sticky header effect on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // 3. Change hero background color slowly
  let colors = ['#fff', '#f9f9f9', '#f1f1f1', '#fff'];
  let colorIndex = 0;
  setInterval(() => {
    document.querySelector('.hero').style.background = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
  }, 5000);

  /* -----------------------------------------------
     NAVIGATION
  ------------------------------------------------*/
  // 4. Smooth scroll to sections
  document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target && target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 5. Highlight active nav link on scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 60;
    document.querySelectorAll('header nav a').forEach(link => {
      let section = document.querySelector(link.getAttribute('href'));
      if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  /* -----------------------------------------------
     BACK TO TOP & DARK MODE
  ------------------------------------------------*/
  // 6. Back to top button
  const topBtn = document.createElement('button');
  topBtn.id = 'backToTop';
  topBtn.textContent = '↑';
  topBtn.style.position = 'fixed';
  topBtn.style.bottom = '20px';
  topBtn.style.right = '20px';
  topBtn.style.display = 'none';
  topBtn.style.padding = '8px 12px';
  topBtn.style.fontSize = '16px';
  topBtn.style.background = '#000';
  topBtn.style.color = '#fff';
  topBtn.style.border = 'none';
  topBtn.style.borderRadius = '4px';
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  // 7. Dark mode toggle
  const darkBtn = document.createElement('button');
  darkBtn.textContent = '🌙';
  darkBtn.id = 'darkModeToggle';
  darkBtn.style.position = 'fixed';
  darkBtn.style.top = '20px';
  darkBtn.style.right = '20px';
  darkBtn.style.background = 'none';
  darkBtn.style.border = 'none';
  darkBtn.style.fontSize = '20px';
  darkBtn.style.cursor = 'pointer';
  document.body.appendChild(darkBtn);
  darkBtn.addEventListener('click', () => document.body.classList.toggle('dark-mode'));

  /* -----------------------------------------------
     PRODUCTS
  ------------------------------------------------*/
  // 8. Hover glow on product
  document.querySelectorAll('.product').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.boxShadow = '0 0 10px #cb6ce6');
    card.addEventListener('mouseleave', () => card.style.boxShadow = '');
  });

  // 9. Click product to view details modal
  const modal = document.createElement('div');
  modal.id = 'productModal';
  modal.style.position = 'fixed';
  modal.style.top = '0'; modal.style.left = '0';
  modal.style.width = '100%'; modal.style.height = '100%';
  modal.style.background = 'rgba(0,0,0,0.8)';
  modal.style.display = 'none'; modal.style.justifyContent = 'center'; modal.style.alignItems = 'center';
  modal.style.color = '#fff'; modal.style.fontSize = '20px';
  modal.style.zIndex = '9999';
  document.body.appendChild(modal);
  document.querySelectorAll('.product').forEach(card => {
    card.addEventListener('click', () => {
      modal.innerHTML = `<div style="background:#222;padding:20px;border-radius:8px">${card.innerHTML}<br><button id="closeModal" style="margin-top:10px">Close</button></div>`;
      modal.style.display = 'flex';
      document.getElementById('closeModal').addEventListener('click', () => modal.style.display = 'none');
    });
  });

  // 10. Random price animation on new arrivals
  document.querySelectorAll('#new .product span').forEach(span => {
    let price = parseInt(span.textContent.replace('$',''));
    setInterval(() => {
      span.textContent = `$${price + (Math.floor(Math.random()*3)-1)}`;
    }, 5000);
  });

  /* -----------------------------------------------
     SLIDERS & ANIMATIONS
  ------------------------------------------------*/
  // 11. Testimonials slider auto
  let tIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  setInterval(() => {
    testimonials.forEach(t => t.style.display = 'none');
    testimonials[tIndex].style.display = 'block';
    tIndex = (tIndex+1)%testimonials.length;
  }, 3000);

  // 12. Fade in sections on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    observer.observe(section);
  });

  // 13. Scroll progress bar
  const progress = document.createElement('div');
  progress.style.position = 'fixed'; progress.style.top = '0'; progress.style.left = '0';
  progress.style.height = '4px'; progress.style.background = '#cb6ce6';
  progress.style.width = '0%'; progress.style.zIndex = '999';
  document.body.appendChild(progress);
  window.addEventListener('scroll', () => {
    let scroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight))*100;
    progress.style.width = scroll+'%';
  });

  /* -----------------------------------------------
     COUNTERS & DETAILS
  ------------------------------------------------*/
  // 14. Animated counter for happy customers
  let counterDone = false;
  window.addEventListener('scroll', () => {
    if(!counterDone && window.scrollY > 200){
      let count = 0;
      const p = document.querySelector('.hero p');
      const interval = setInterval(() => {
        count+=500; p.textContent = `200+ Brands | 2,000+ Products | ${count}+ Happy Customers`;
        if(count >= 30000) clearInterval(interval);
      }, 20);
      counterDone = true;
    }
  });

  // 15. Auto-update footer year
  const footer = document.querySelector('footer p');
  footer.textContent = `© ${new Date().getFullYear()} Shop.co`;

  // ... (Add many more like hover, highlight, show/hide, alerts etc.)

  // 16-50+ Quick effects:
  document.querySelectorAll('.style').forEach((el,i)=>{
    // 16. Click to alert style
    el.addEventListener('click',()=>alert(`You clicked on ${el.querySelector('p').textContent} style!`));
    // 17. Hover rotate image
    el.addEventListener('mouseenter',()=>el.querySelector('img').style.transform='rotate(5deg)');
    el.addEventListener('mouseleave',()=>el.querySelector('img').style.transform='rotate(0)');
    // 18. Shadow
    el.addEventListener('mouseenter',()=>el.style.boxShadow='0 0 10px #000');
    el.addEventListener('mouseleave',()=>el.style.boxShadow='');
  });

  // 19. Subscribe button alert
  document.querySelector('#subscribe button').addEventListener('click',()=>{
    alert('Thank you for subscribing!');
  });

  // 20. Input focus effect
  const email = document.querySelector('#subscribe input');
  email.addEventListener('focus',()=>email.style.borderColor='#cb6ce6');
  email.addEventListener('blur',()=>email.style.borderColor='#ccc');

  // 21. Resize detect
  window.addEventListener('resize',()=>console.log('Resized!'));

  // 22. Keypress detect
  document.addEventListener('keypress',e=>console.log(`Key pressed: ${e.key}`));

  // 23. Scroll bottom detect
  window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
      console.log('Reached bottom!');
    }
  });

  // 24. Product click highlight
  document.querySelectorAll('.product').forEach(card=>{
    card.addEventListener('click',()=>card.style.background='#eee');
  });

  // 25. Double click hero text
  heroH2.addEventListener('dblclick',()=>heroH2.style.color='#cb6ce6');


});



/* ------------------------------------------------
   THE LAST 25+ VANILLA JS SCRIPTS
-------------------------------------------------*/

// 26. Animate CTA banner text color on hover
const cta = document.querySelector('.cta-banner h3');
cta.addEventListener('mouseenter', () => cta.style.color = '#cb6ce6');
cta.addEventListener('mouseleave', () => cta.style.color = '#000');

// 27. CTA button pulse effect
const ctaBtn = document.querySelector('.cta-banner .shop-btn');
setInterval(() => {
  ctaBtn.style.transform = 'scale(1.05)';
  setTimeout(() => ctaBtn.style.transform = 'scale(1)', 500);
}, 2000);

// 28. Hero "Shop Now" button bounce on load
const heroBtn = document.querySelector('.hero .shop-btn');
setTimeout(() => heroBtn.style.transform = 'translateY(-5px)', 500);
setTimeout(() => heroBtn.style.transform = 'translateY(0)', 1000);

// 29. Hero brand names color change on interval
const brands = document.querySelectorAll('.brands span');
let brandIndex = 0;
setInterval(() => {
  brands.forEach((b,i) => b.style.color = i===brandIndex ? '#cb6ce6' : '#000');
  brandIndex = (brandIndex+1) % brands.length;
}, 1500);

// 30. Auto-scroll to top after 5 min idle
let idleTimer;
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
function resetTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => window.scrollTo({top:0,behavior:'smooth'}), 300000);
}

// 31. Animate footer links on hover
document.querySelectorAll('footer a').forEach(link => {
  link.addEventListener('mouseenter', () => link.style.color='#cb6ce6');
  link.addEventListener('mouseleave', () => link.style.color='#fff');
});

// 32. Testimonials fade on hover
document.querySelectorAll('.testimonial').forEach(t => {
  t.addEventListener('mouseenter',()=>t.style.opacity=0.7);
  t.addEventListener('mouseleave',()=>t.style.opacity=1);
});

// 33. Random testimonial highlight
setInterval(() => {
  const t = document.querySelectorAll('.testimonial');
  const rand = Math.floor(Math.random()*t.length);
  t.forEach((el,i)=>el.style.border = i===rand ? '2px solid #cb6ce6' : 'none');
},4000);

// 34. Easter egg: press 'S' shows secret
document.addEventListener('keydown',e=>{
  if(e.key==='s'||e.key==='S') alert('Secret Sale: Use code SAVE10!');
});

// 35. Click anywhere to get fun message every 10 clicks
let clickCount=0;
document.addEventListener('click',()=>{
  clickCount++;
  if(clickCount%10===0) alert(`You clicked ${clickCount} times! Thanks!`);
});

// 36. Footer copyright color change on scroll bottom
window.addEventListener('scroll',()=>{
  if(window.innerHeight+window.scrollY>=document.body.offsetHeight){
    document.querySelector('.copyright').style.color='#cb6ce6';
  } else {
    document.querySelector('.copyright').style.color='#fff';
  }
});

// 37. Hover effect on "Follow Us" social text
document.querySelectorAll('footer span').forEach(span=>{
  span.addEventListener('mouseenter',()=>span.style.textDecoration='underline');
  span.addEventListener('mouseleave',()=>span.style.textDecoration='none');
});

// 38. Randomly highlight products
setInterval(()=>{
  document.querySelectorAll('.product').forEach((p,i)=>{
    p.style.border=i===Math.floor(Math.random()*4)?'2px solid #cb6ce6':'none';
  });
},4000);

// 39. Click product image enlarge
document.querySelectorAll('.product img').forEach(img=>{
  img.addEventListener('click',()=>{
    img.style.transform='scale(1.2)';
    setTimeout(()=>img.style.transform='scale(1)',500);
  });
});

// 40. Auto highlight nav on hover
document.querySelectorAll('header nav a').forEach(link=>{
  link.addEventListener('mouseenter',()=>link.style.textDecoration='underline');
  link.addEventListener('mouseleave',()=>link.style.textDecoration='none');
});

// 41. Scroll detect: add class to body
window.addEventListener('scroll',()=>{
  if(window.scrollY>100) document.body.classList.add('scrolled-down');
  else document.body.classList.remove('scrolled-down');
});

// 42. On resize change hero text color
window.addEventListener('resize',()=>{
  heroH2.style.color = window.innerWidth<600 ? '#cb6ce6' : '#000';
});

// 43. Change subscribe placeholder text on focus
email.addEventListener('focus',()=>email.placeholder='We never spam!');
email.addEventListener('blur',()=>email.placeholder='Enter your email');

// 44. Animate dress style images on load
document.querySelectorAll('.style img').forEach((img,i)=>{
  setTimeout(()=>img.style.opacity=1, i*300);
});

// 45. Show random alert on load
setTimeout(()=>{if(Math.random()>0.5)alert('Free Shipping on orders over $50!');},2000);

// 46. Click CTA banner shows thank you
ctaBtn.addEventListener('click',()=>alert('Thank you for shopping!'));

// 47. Auto hide CTA banner after 20s
setTimeout(()=>document.querySelector('.cta-banner').style.display='none',20000);

// 48. Add border to new arrivals on hover
document.querySelectorAll('#new .product').forEach(p=>{
  p.addEventListener('mouseenter',()=>p.style.border='2px solid #cb6ce6');
  p.addEventListener('mouseleave',()=>p.style.border='none');
});

// 49. Press '?' shows help
document.addEventListener('keydown',e=>{
  if(e.key==='?')alert('Need help? Contact support@shop.co');
});

// 50. Hover on hero button changes background
heroBtn.addEventListener('mouseenter',()=>heroBtn.style.background='#cb6ce6');
heroBtn.addEventListener('mouseleave',()=>heroBtn.style.background='');

// 51. Add fade effect on section load
document.querySelectorAll('section').forEach(sec=>{
  sec.style.transition='opacity 1s';
});


// 1. Button Click Alert
document.getElementById('shopBtn').addEventListener('click', function () {
    alert("Redirecting to shop...");
});

// 2. Hover Star Rotate
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
        star.style.transform = 'rotate(180deg)';
        star.style.transition = 'transform 0.5s ease';
    });
    star.addEventListener('mouseleave', () => {
        star.style.transform = 'rotate(0deg)';
    });
});

// 3. Text Animate on Load
window.addEventListener('load', () => {
    document.querySelector('h1').style.opacity = '1';
    document.querySelector('h1').style.transform = 'translateY(0)';
});

// 4. Stats Counter (dummy effect)
const stats = document.querySelectorAll('.stats div strong');
stats.forEach(stat => {
    let count = 0;
    const target = parseInt(stat.innerText.replace(/\D/g, ''));
    const interval = setInterval(() => {
        count += Math.ceil(target / 50);
        if (count >= target) {
            stat.innerText = target + '+';
            clearInterval(interval);
        } else {
            stat.innerText = count + '+';
        }
    }, 30);
});

// 5. Button Scale Effect
document.getElementById('shopBtn').addEventListener('mouseover', () => {
    document.getElementById('shopBtn').style.transform = 'scale(1.1)';
});
document.getElementById('shopBtn').addEventListener('mouseout', () => {
    document.getElementById('shopBtn').style.transform = 'scale(1)';
});


// Discount Text Small Blinking Effect
const topBar = document.querySelector('.top-bar p a');

setInterval(() => {
    topBar.style.color = topBar.style.color === 'red' ? '#1d1d1d' : 'red';
}, 1000);


// Premium Auto Scrolling Brand Slider with Pause on Hover
const slider = document.getElementById('brandSlider');
let speed = 1; // pixels per frame (change speed here)
let position = 0;
let isPaused = false;

// Clone slides to create infinite loop
slider.innerHTML += slider.innerHTML; 

function animateSlider() {
    if (!isPaused) {
        position -= speed;
        if (Math.abs(position) >= slider.scrollWidth / 2) {
            position = 0;
        }
        slider.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(animateSlider);
}

animateSlider();

// Pause on hover
slider.addEventListener('mouseenter', () => isPaused = true);
slider.addEventListener('mouseleave', () => isPaused = false);
