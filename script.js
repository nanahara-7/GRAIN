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
// カテゴリーフィルター（menu.html）

const tabs = document.querySelectorAll('.menu-catalog__tab');
const gridItems = document.querySelectorAll('.menu-catalog__grid-item');

if (tabs.length > 0) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // アクティブタブの切り替え
      tabs.forEach(t => {
        t.classList.remove('menu-catalog__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('menu-catalog__tab--active');
      tab.setAttribute('aria-selected', 'true');

      const selected = tab.dataset.category;
      const showItems = [];
      const hideItems = [];

      gridItems.forEach(item => {
        if (selected === 'all' || item.dataset.category === selected) {
          showItems.push(item);
        } else {
          hideItems.push(item);
        }
      });

      // 非該当カードをフェードアウト → 非表示 → 該当カードをフェードイン
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
