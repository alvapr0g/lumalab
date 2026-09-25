(() => {
  const panel = document.getElementById('milestone-photo');
  if (!panel) return;
  const photo = panel.querySelector('img');
  const empty = panel.querySelector('.luma-photo__empty');
  const caption = panel.querySelector('.luma-photo__caption');
  const close = panel.querySelector('.luma-photo__close');
  const buttons = [...document.querySelectorAll('.luma-timeline__number')];
  let active = null;

  function position() {
    if (!active || !panel.matches(':popover-open')) return;
    const rect = active.getBoundingClientRect();
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const margin = 22;
    const left = Math.max(margin, Math.min(innerWidth - width - margin, rect.left + rect.width / 2 - width / 2));
    const below = rect.bottom + 22;
    const top = below + height <= innerHeight - margin ? below : Math.max(90, rect.top - height - 22);
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }
  function reset() {
    buttons.forEach(button => button.setAttribute('aria-expanded', 'false'));
    active = null;
  }
  buttons.forEach(button => {
    const title = button.closest('li').querySelector('h3').textContent;
    button.setAttribute('aria-label', `Ver foto: ${title}`);
    button.addEventListener('click', () => {
      if (active === button && panel.matches(':popover-open')) {
        panel.hidePopover();
        reset();
        return;
      }
      reset();
      active = button;
      button.setAttribute('aria-expanded', 'true');
      caption.textContent = title;
      photo.hidden = !button.dataset.photo;
      empty.hidden = !!button.dataset.photo;
      empty.textContent = 'Foto próximamente';
      if (button.dataset.photo) {
        photo.src = button.dataset.photo;
        photo.alt = button.dataset.photoAlt || title;
      } else {
        photo.removeAttribute('src');
        photo.alt = '';
      }
      if (!panel.matches(':popover-open')) panel.showPopover();
      position();
    });
  });
  panel.addEventListener('toggle', () => {
    if (!panel.matches(':popover-open')) reset();
  });
  close.addEventListener('click', () => {
    const trigger = active;
    panel.hidePopover();
    reset();
    trigger?.focus({preventScroll: true});
  });
  photo.addEventListener('load', position);
  photo.addEventListener('error', () => {
    photo.hidden = true;
    empty.hidden = false;
    empty.textContent = 'No se pudo cargar la foto.';
    position();
  });
  window.addEventListener('resize', position);
  window.addEventListener('scroll', () => {
    if (panel.matches(':popover-open')) panel.hidePopover();
  }, {passive: true});
})();
