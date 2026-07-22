document.addEventListener('DOMContentLoaded', function () {

  /* Navigation: scroll shadow + mobile menu */
  const nav = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 40 || nav.dataset.solid === 'true') {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }
  updateNav();
  window.addEventListener('scroll', updateNav);

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  /* Scroll reveal */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* Lightbox gallery */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', function () {
        const img = this.querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* Contact / registration form fake-submit */
  document.querySelectorAll('form[data-fake-submit]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Merci pour votre message ! Nous vous contacterons très prochainement.');
      form.reset();
    });
  });

  /* Countdown to the tournament start */
  document.querySelectorAll('.countdown').forEach(box => {
    const target = new Date(box.dataset.target).getTime();
    const dEl = box.querySelector('.cd-days .num');
    const hEl = box.querySelector('.cd-hours .num');
    const mEl = box.querySelector('.cd-min .num');
    const sEl = box.querySelector('.cd-sec .num');

    function tick() {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        [dEl, hEl, mEl, sEl].forEach(el => { if (el) el.textContent = '00'; });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  });

});
