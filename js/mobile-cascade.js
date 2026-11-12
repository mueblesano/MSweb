(() => {
  const mobile = matchMedia('(max-width: 768px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const containers = '.cards, .gal, .render-gallery';
  let intersectionObserver;
  let mutationObservers = [];

  function prepareItems(container) {
    [...container.children].forEach((item, index) => {
      if (item.classList.contains('cascada-item')) return;
      item.classList.add('cascada-item');
      item.style.setProperty('--cascada-index', index);
      item.style.setProperty(
        '--cascada-offset',
        `${12 + Math.min(index, 3) * 14}px`
      );
      item.style.setProperty(
        '--cascada-delay',
        `${Math.min(index, 4) * 90}ms`
      );
      if (reducedMotion.matches || !intersectionObserver) {
        item.classList.add('cascada-visible');
      } else {
        intersectionObserver.observe(item);
      }
    });
  }

  function clearCascade() {
    intersectionObserver?.disconnect();
    mutationObservers.forEach(observer => observer.disconnect());
    mutationObservers = [];
    document.querySelectorAll('.cascada-list').forEach(container => {
      container.classList.remove('cascada-list');
      [...container.children].forEach(item => {
        item.classList.remove('cascada-item', 'cascada-visible');
        item.style.removeProperty('--cascada-index');
        item.style.removeProperty('--cascada-offset');
        item.style.removeProperty('--cascada-delay');
      });
    });
  }

  function applyCascade() {
    clearCascade();
    if (!mobile.matches) return;

    intersectionObserver = reducedMotion.matches
      ? null
      : new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('cascada-visible');
            intersectionObserver.unobserve(entry.target);
          });
        }, { threshold: 0.12 });

    document.querySelectorAll(containers).forEach(container => {
      container.classList.add('cascada-list');
      prepareItems(container);
      if (container.matches('.gal')) {
        const observer = new MutationObserver(() => prepareItems(container));
        observer.observe(container, { childList: true });
        mutationObservers.push(observer);
      }
    });
  }

  mobile.addEventListener('change', applyCascade);
  reducedMotion.addEventListener('change', applyCascade);
  applyCascade();
})();
