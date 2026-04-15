// ページトップボタン
const pageTopBtn = document.querySelector('.page-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    pageTopBtn.classList.add('is-visible');
  } else {
    pageTopBtn.classList.remove('is-visible');
  }
});

pageTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


const hamburger = document.querySelector('.header__hamburger');
const drawer = document.querySelector('.drawer');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.drawer__close');

function openDrawer() {
  drawer.classList.add('is-open');
  overlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeDrawer() {
  drawer.classList.remove('is-open');
  overlay.classList.remove('is-active');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', openDrawer);
closeBtn.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

// ==========================================================================
// カテゴリーフィルター（news.html）

const newsTabs = document.querySelectorAll('.news-catalog__tab');
const newsItems = document.querySelectorAll('.news-catalog__list-item');

if (newsTabs.length > 0) {
  newsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      newsTabs.forEach(t => {
        t.classList.remove('news-catalog__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('news-catalog__tab--active');
      tab.setAttribute('aria-selected', 'true');

      const selected = tab.dataset.category;
      const showItems = [];
      const hideItems = [];

      newsItems.forEach(item => {
        if (selected === 'all' || item.dataset.category === selected) {
          showItems.push(item);
        } else {
          hideItems.push(item);
        }
      });

      if (hideItems.length > 0) {
        gsap.to(hideItems, {
          opacity: 0,
          y: 12,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            hideItems.forEach(item => {
              item.style.display = 'none';
              gsap.set(item, { opacity: 0, y: 12 });
            });
            showItems.forEach(item => {
              item.style.display = '';
              gsap.to(item, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
            });
          },
        });
      } else {
        showItems.forEach(item => {
          item.style.display = '';
          gsap.to(item, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        });
      }
    });
  });
}

// ==========================================================================
// カテゴリーフィルター＋ページネーション（menu.html）

const tabs = document.querySelectorAll('.menu-catalog__tab');
const gridItems = document.querySelectorAll('.menu-catalog__grid-item');
const menuPaginationNav = document.querySelector('.menu-catalog__pagination');
const menuPaginationList = document.querySelector('.menu-catalog__pagination-list');

const MENU_ITEMS_PER_PAGE = 6;
let menuCurrentCategory = 'all';
let menuCurrentPage = 1;

if (tabs.length > 0) {

  function getFilteredMenuItems() {
    return [...gridItems].filter(item =>
      menuCurrentCategory === 'all' || item.dataset.category === menuCurrentCategory
    );
  }

  function renderMenuPage() {
    const filtered = getFilteredMenuItems();
    const totalPages = Math.ceil(filtered.length / MENU_ITEMS_PER_PAGE);
    const start = (menuCurrentPage - 1) * MENU_ITEMS_PER_PAGE;
    const end = start + MENU_ITEMS_PER_PAGE;

    // 全アイテムの表示/非表示
    gridItems.forEach(item => {
      const indexInFiltered = filtered.indexOf(item);
      const shouldShow = indexInFiltered >= start && indexInFiltered < end;
      if (shouldShow) {
        item.style.display = '';
        gsap.to(item, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      } else {
        item.style.display = 'none';
        gsap.set(item, { opacity: 0, y: 0 });
      }
    });

    // ページネーションボタン更新
    if (menuPaginationList) {
      menuPaginationList.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'menu-catalog__pagination-btn' + (i === menuCurrentPage ? ' menu-catalog__pagination-btn--active' : '');
        if (i === menuCurrentPage) a.setAttribute('aria-current', 'page');
        a.setAttribute('aria-label', `${i}ページ目`);
        a.textContent = i;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          menuCurrentPage = i;
          renderMenuPage();
          document.querySelector('.menu-catalog__grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        li.appendChild(a);
        menuPaginationList.appendChild(li);
      }
    }

    // 1ページ以下なら非表示
    if (menuPaginationNav) {
      menuPaginationNav.style.display = totalPages <= 1 ? 'none' : '';
    }
  }

  // タブクリック時：カテゴリー切り替え＋ページリセット
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('menu-catalog__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('menu-catalog__tab--active');
      tab.setAttribute('aria-selected', 'true');

      menuCurrentCategory = tab.dataset.category;
      menuCurrentPage = 1;
      renderMenuPage();
    });
  });

  // 初期表示
  renderMenuPage();
}


// ==========================================================================
// メニューモーダル（スライドイン）
// ==========================================================================
const menuCards = document.querySelectorAll('.menu-card[data-modal-img]');
const menuModal = document.querySelector('.menu-modal');
const menuModalOverlay = document.querySelector('.menu-modal-overlay');
const menuModalClose = document.querySelector('.menu-modal__close');

if (menuCards.length > 0 && menuModal) {
  function openMenuModal(card) {
    // データ注入
    menuModal.querySelector('.menu-modal__img img').src = card.dataset.modalImg;
    menuModal.querySelector('.menu-modal__img img').alt = card.dataset.modalAlt;
    menuModal.querySelector('.menu-modal__category').textContent = card.dataset.modalCategory;
    menuModal.querySelector('.menu-modal__name').textContent = card.dataset.modalName;
    menuModal.querySelector('.menu-modal__desc').textContent = card.dataset.modalDesc;
    menuModal.querySelector('.menu-modal__price').textContent = card.dataset.modalPrice;

    // オーバーレイ表示
    menuModalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    menuModal.setAttribute('aria-hidden', 'false');

    // GSAPでスライドイン
    gsap.fromTo(menuModal,
      { x: '100%' },
      { x: '0%', duration: 0.5, ease: 'power3.out' }
    );
  }

  function closeMenuModal() {
    gsap.to(menuModal, {
      x: '100%',
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        menuModalOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
        menuModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // カードクリックでモーダルを開く
  menuCards.forEach(card => {
    card.addEventListener('click', () => openMenuModal(card));
    card.style.cursor = 'pointer';
  });

  // 閉じるボタン・オーバーレイクリックで閉じる
  menuModalClose.addEventListener('click', closeMenuModal);
  menuModalOverlay.addEventListener('click', closeMenuModal);

  // ESCキーでも閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenuModal();
  });
}
