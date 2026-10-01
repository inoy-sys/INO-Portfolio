/* =========================================================
   ADEN FINAL UI PROJECT - Shared JavaScript
   ========================================================= */

// ---------- 1. Mobile navigation ----------
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// ---------- 2. Scroll-to-top button ----------
const toTopButton = document.querySelector('.to-top');

if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------- 3. Generic tab/button active states ----------
document.querySelectorAll('[data-tab-group]').forEach((group) => {
  const buttons = group.querySelectorAll('[data-tab]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });
});

// ---------- 4. News category filtering ----------
const newsFilter = document.querySelector('[data-news-filter]');
const newsCards = document.querySelectorAll('[data-news-card]');

if (newsFilter && newsCards.length) {
  const buttons = newsFilter.querySelectorAll('[data-news-category]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.newsCategory;

      buttons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      newsCards.forEach((card) => {
        const show = category === 'all' || card.dataset.category === category;
        card.hidden = !show;
      });
    });
  });
}

// ---------- 5. Newsletter form demo behavior ----------
const newsletterForm = document.querySelector('.newsletter__form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');

    if (input && input.value.trim()) {
      alert('구독 신청 UI 동작 예시입니다. 실제 전송 기능은 백엔드 연결 후 사용할 수 있습니다.');
      input.value = '';
    }
  });
}
\n\n// ---------- 6. MENU product image modal ----------
const productImageModal = document.querySelector('#productImageModal');

if (productImageModal) {
  const modalImage = productImageModal.querySelector('.product-image-modal__image');
  const modalCaption = productImageModal.querySelector('.product-image-modal__caption');
  const closeButton = productImageModal.querySelector('.product-image-modal__close');
  const backdrop = productImageModal.querySelector('.product-image-modal__backdrop');
  let lastTrigger = null;

  const closeProductModal = () => {
    productImageModal.classList.remove('is-open');
    productImageModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    modalImage.src = '';
    if (lastTrigger) lastTrigger.focus();
  };

  const openProductModal = (trigger) => {
    const card = trigger.closest('.product-card, .season-grid article');
    const sourceImage = card?.querySelector('img');
    if (!sourceImage) return;

    const title = card.querySelector('h3')?.textContent.trim() || sourceImage.alt || '메뉴 이미지';
    lastTrigger = trigger;
    modalImage.src = sourceImage.currentSrc || sourceImage.src;
    modalImage.alt = title;
    modalCaption.textContent = title;
    productImageModal.classList.add('is-open');
    productImageModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton.focus();
  };

  document.querySelectorAll('.product-card .pc-body > i, .season-grid article > i').forEach((trigger) => {
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-label', '메뉴 이미지 크게 보기');
    trigger.addEventListener('click', () => openProductModal(trigger));
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProductModal(trigger);
      }
    });
  });

  closeButton.addEventListener('click', closeProductModal);
  backdrop.addEventListener('click', closeProductModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && productImageModal.classList.contains('is-open')) {
      closeProductModal();
    }
  });
}
