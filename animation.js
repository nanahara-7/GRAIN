
// GSAP Animations
gsap.registerPlugin(ScrollTrigger);


// メニュースライダー
const menuTrack = document.querySelector('.menu__track');
if (menuTrack) {
  let xPos = 0;
  let halfWidth = menuTrack.scrollWidth / 2;
  const speed = 30; // 1秒あたりのpx（60Hz・120Hz共通）

  window.addEventListener('resize', () => {
    halfWidth = menuTrack.scrollWidth / 2;
  });

  gsap.ticker.add((time, deltaTime) => {
    xPos -= speed * (deltaTime / 1000);
    if (xPos <= -halfWidth) {
      xPos += halfWidth;
    }
    gsap.set(menuTrack, { x: Math.round(xPos) });
  });

  gsap.ticker.lagSmoothing(0);
}


const slides = document.querySelectorAll('.hero__slide');
let current = 0;

function kenBurns(slide) {

  gsap.fromTo(
    slide.querySelector('img'),
    { scale: 1 },
    { scale: 1.1, duration: 6, ease: 'none' }
  );
}

function nextSlide() {
  const currentSlide = slides[current];
  current = (current + 1) % slides.length;
  const next = slides[current];

  // 現在のスライドをフェードアウト
  gsap.to(currentSlide, { opacity: 0, duration: 1.5 });

  // 次のスライドをフェードイン＋ズーム開始
  gsap.to(next, { opacity: 1, duration: 1.5 });
  kenBurns(next);
}

// 最初の画像にもズームをかける
kenBurns(slides[0]);

// 5秒ごとに切り替え
setInterval(nextSlide, 5000);


// featureセクション カウントアップアニメーション
const featureNums = document.querySelectorAll('.feature__item-num-text');

featureNums.forEach((el) => {
  const target = parseInt(el.textContent, 10);
  const numEl = el.closest('.feature__item-num');

  // 下からフェードイン
  gsap.from(numEl, {
    y: 24,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: numEl,
      start: 'top 85%',
    },
  });

  if (target === 0) {
    // 0はバウンスで表示
    gsap.from(el, {
      scale: 1.4,
      duration: 0.6,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: numEl,
        start: 'top 85%',
      },
    });
    return;
  }

  // カウントアップ（加速しながら目標値へ）
  const counter = { val: 0 };
  gsap.to(counter, {
    val: target,
    duration: 1.8,
    ease: 'power2.in',
    onUpdate: () => {
      el.textContent = Math.ceil(counter.val);
    },
    scrollTrigger: {
      trigger: numEl,
      start: 'top 85%',
    },
  });
});


// aboutセクション スクロールアニメーション
const aboutLabel = document.querySelector('.about__label');
const aboutTitle = document.querySelector('.about__title');
const aboutDesc = document.querySelector('.about__desc');
const aboutImg = document.querySelector('.about__img');

if (aboutLabel) {
  // テキストの行ごと時間差フェードイン（下から）
  gsap.from([aboutLabel, aboutTitle, aboutDesc], {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: aboutLabel,
      start: 'top 80%',
    },
  });

  // 画像は右からスライドしながらフェードイン
  gsap.from(aboutImg, {
    x: 60,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: aboutImg,
      start: 'top 80%',
    },
  });
}


// storyセクション スクロールアニメーション
const storyItems = document.querySelectorAll('.story__item');

storyItems.forEach((item) => {
  const card = item.querySelector('.story__card');
  const img = item.querySelector('.story__img');
  const isReverse = item.classList.contains('story__item--reverse');

  // カードの方向（reverseなら右から、通常は左から）
  const cardX = isReverse ? 60 : -60;
  // 画像の方向（reverseなら左から、通常は右から）
  const imgX = isReverse ? -60 : 60;

  gsap.from(card, {
    x: cardX,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
    },
  });

  gsap.from(img, {
    x: imgX,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    delay: 0.15,
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
    },
  });
});
