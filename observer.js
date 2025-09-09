// observer.js
document.addEventListener("DOMContentLoaded", () => {
  /* ------------------- */
  /* ANIMACIÓN DE SCROLL */
  /* ------------------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));

  /* ------------------- */
  /* EFECTO MÁQUINA DE ESCRIBIR EN EL HERO */
  /* ------------------- */
  const title = document.querySelector(".hero-content h1");
  if (title) {
    const text = title.textContent;
    title.textContent = "";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  }

  /* ------------------- */
  /* CONTADORES ANIMADOS */
  /* ------------------- */
  const counters = document.querySelectorAll(".counter");
  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const increment = target / 100; // pasos
    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  };

  counters.forEach(counter => {
    observer.observe(counter);
    counter.addEventListener("transitionend", () => animateCounter(counter));
  });

  // Extra: iniciar animación de contadores al ser visibles
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target); // solo una vez
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));
});
