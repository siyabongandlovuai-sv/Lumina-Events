/* js/script.js
   Functionality:
   - Simple mobile nav toggle (supports multiple nav toggles on different pages)
   - Carousel (auto-play + manual controls + dots)
   - Footer year fill
   - Basic contact form validation + submit stub
*/

document.addEventListener('DOMContentLoaded', function () {
  // set year in footers
  const year = new Date().getFullYear();
  ['year','year-2','year-3','year-4'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  // mobile nav toggles: support multiple toggle buttons
  document.querySelectorAll('.nav-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      // each toggle is paired with a nearby .nav-list (same nav)
      const nav = btn.closest('.nav');
      if(!nav) return;
      const list = nav.querySelector('.nav-list');
      if(list) list.classList.toggle('show');
    });
  });

  // Carousel behavior (for #work-carousel)
  (function initCarousel() {
    const carousel = document.getElementById('work-carousel');
    if(!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevBtn = carousel.querySelector('[data-action="prev"]');
    const nextBtn = carousel.querySelector('[data-action="next"]');
    const dotsWrap = document.getElementById('carousel-dots');

    let index = 0;
    const total = items.length;

    // create dots
    const dots = [];
    for(let i=0;i<total;i++){
      const b = document.createElement('button');
      b.setAttribute('aria-label','Go to slide '+(i+1));
      if(i===0) b.classList.add('active');
      dotsWrap.appendChild(b);
      b.addEventListener('click', ()=> { goTo(i); resetAuto(); });
      dots.push(b);
    }

    function update(){
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d,i)=> d.classList.toggle('active', i===index));
    }
    function prev(){ index = (index -1 + total) % total; update(); }
    function next(){ index = (index +1) % total; update(); }
    function goTo(i){ index = ((i % total) + total) % total; update(); }

    prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
    nextBtn && nextBtn.addEventListener('click', () => { next(); resetAuto(); });

    // autoplay
    let auto = setInterval(next, 4500);
    function resetAuto(){ clearInterval(auto); auto = setInterval(next, 4500); }

    // pause on hover for accessibility
    carousel.addEventListener('mouseenter', ()=> clearInterval(auto));
    carousel.addEventListener('mouseleave', ()=> auto = setInterval(next, 4500));
  })();

  // contact form handling (no backend in this demo)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const msg = document.getElementById('form-msg');
      // simple validation
      const formData = new FormData(form);
      const name = (formData.get('name')||'').trim();
      const email = (formData.get('email')||'').trim();
      const message = (formData.get('message')||'').trim();

      if(!name || !email || !message){
        msg.textContent = 'Please fill out your name, email and a short message.';
        return;
      }

      // Simulate success (replace this with fetch to your API endpoint)
      msg.textContent = 'Sending...';
      setTimeout(()=>{
        msg.textContent = 'Thank you — we received your message. We will be in touch within 2 business days.';
        form.reset();
      }, 900);
    });
  }

});
