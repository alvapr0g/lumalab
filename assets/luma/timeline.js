(() => {
  const panel = document.getElementById('milestone-photo');
  if (!panel) return;
  const photo = panel.querySelector('img');
  const empty = panel.querySelector('.luma-photo__empty');
  const caption = panel.querySelector('.luma-photo__caption');
  const close = panel.querySelector('.luma-photo__close');
  const buttons = [...document.querySelectorAll('.luma-timeline__number')];
  let active = null;
  let pinned = false;
  let leaveTimer;
  const hover = matchMedia("(hover: hover) and (pointer: fine)");

  function position() {
    if (!active || !panel.matches(':popover-open')) return;
    const rect = active.getBoundingClientRect();
    const ratio = active.dataset.photoWidth / active.dataset.photoHeight || 4 / 3;
    panel.style.width = `${Math.min(320, innerWidth - 44, Math.max(150, (innerHeight - 220) * ratio + 16))}px`;
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
    pinned = false;
    clearTimeout(leaveTimer);
  }
  buttons.forEach(button => {
    const title = button.closest('li').querySelector('h3').textContent;
    button.setAttribute('aria-label', `Ver foto: ${title}`);
    function open() {
      clearTimeout(leaveTimer);
      if (active === button && panel.matches(':popover-open')) return;
      reset();
      active = button;
      button.setAttribute('aria-expanded', 'true');
      caption.textContent = title;
      photo.hidden = !button.dataset.photo;
      empty.hidden = !!button.dataset.photo;
      empty.textContent = 'Foto próximamente';
      if (button.dataset.photo) {
        photo.width = Number(button.dataset.photoWidth) || 1280;
        photo.height = Number(button.dataset.photoHeight) || 960;
        photo.src = button.dataset.photo;
        photo.alt = button.dataset.photoAlt || title;
      } else {
        photo.removeAttribute('src');
        photo.alt = '';
      }
      if (!panel.matches(':popover-open')) panel.showPopover();
      position();
    }
    button.addEventListener('pointerenter', event => {
      if (hover.matches && event.pointerType !== 'touch') open();
    });
    button.addEventListener('pointerleave', () => {
      if (hover.matches) scheduleClose();
    });
    button.addEventListener('click', () => {
      if (active === button && pinned && panel.matches(':popover-open')) {
        panel.hidePopover();
        reset();
      } else {
        open();
        pinned = true;
      }
    });
  });
  function scheduleClose() {
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => {
      if (!pinned && panel.matches(':popover-open')) panel.hidePopover();
    }, 220);
  }
  panel.addEventListener('pointerenter', () => clearTimeout(leaveTimer));
  panel.addEventListener('pointerleave', () => { if (hover.matches) scheduleClose(); });
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
