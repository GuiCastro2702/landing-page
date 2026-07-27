document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR: scroll effect ─── */
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ─── HAMBURGER MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const hamSpans  = hamburger.querySelectorAll('span');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    if (isOpen) {
      hamSpans[0].style.transform = 'translateY(7px) rotate(45deg)';
      hamSpans[1].style.opacity   = '0';
      hamSpans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      hamSpans[0].style.transform = '';
      hamSpans[1].style.opacity   = '';
      hamSpans[2].style.transform = '';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamSpans[0].style.transform = '';
      hamSpans[1].style.opacity   = '';
      hamSpans[2].style.transform = '';
    });
  });


  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 10;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ─── INTERSECTION OBSERVER ─── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  const counterEls = document.querySelectorAll('.stat-num[data-target]');

  const animateCounter = (el) => {
    const target  = +el.getAttribute('data-target');
    const duration = 1800;
    const step     = Math.ceil(target / (duration / 16));
    let current    = 0;

    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = current + (target >= 100 ? '+' : '');
      if (current < target) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counterEls.forEach(el => counterObserver.observe(el));


  /* ─── PHONE MASK ─── */
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
      }
      e.target.value = v;
    });
  }


  const form = document.getElementById('contatoForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome      = document.getElementById('nome').value.trim();
      const telefone  = document.getElementById('telefone').value.trim();
      const email     = document.getElementById('email').value.trim();
      const servico   = document.getElementById('servico').value;
      const mensagem  = document.getElementById('mensagem').value.trim();

      if (!nome || !email) {
        alert('Preencha nome e email');
        return;
      }

      const texto = `Olá, meu nome é ${nome}
Telefone: ${telefone}
Email: ${email}
Serviço: ${servico}
Mensagem: ${mensagem}`;

      const numero = "5511950554265";

      const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

      window.open(url, '_blank');

      // feedback visual
      form.style.display = 'none';
      formSuccess.classList.add('show');
    });
  }

});