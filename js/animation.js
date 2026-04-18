
// GSAP Animations
gsap.registerPlugin(ScrollTrigger);


// ローディングアニメーション（初回のみ）
const loader = document.querySelector('.loader');
const loaderLogo = document.querySelector('.loader__logo');

if (loader) {
  const hasLoaded = sessionStorage.getItem('loaderShown');

  if (hasLoaded) {
    // 2回目以降: ローダーを即非表示 → ヘッダーをフェードイン
    loader.style.display = 'none';
    gsap.from('.header', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.2,
    });
  } else {
    // 初回のみ: ローディングアニメーション実行
    sessionStorage.setItem('loaderShown', 'true');

    const tl = gsap.timeline();

    //  ロゴをフェードイン
    tl.to(loaderLogo, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
    //  少し待つ
    .to(loaderLogo, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      delay: 0.4,
    })
    //  背景が上にスライドして消える
    .to(loader, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.style.display = 'none';
      },
    })
    //  ローダー完了後にヘッダーをフェードイン
    .from('.header', {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');
  }
} else {
  // ローダーがないページ: ヘッダーをフェードイン
  gsap.from('.header', {
    y: -20,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.2,
  });
}


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

if (slides.length > 0) {
  // 最初の画像にもズームをかける
  kenBurns(slides[0]);

  // 5秒ごとに切り替え
  setInterval(nextSlide, 5000);
}


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


// newsセクション スクロールアニメーション
const newsHeading = document.querySelector('.news__heading');
const homeNewsItems = document.querySelectorAll('.news__item');

if (newsHeading) {
  // 見出しが先にフェードイン
  gsap.from(newsHeading, {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: newsHeading,
      start: 'top 80%',
    },
  });

  // カードが1枚ずつ時間差で下からフェードイン
  gsap.from(homeNewsItems, {
    y: 32,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: homeNewsItems[0],
      start: 'top 80%',
    },
  });
}


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


// menu-fv スライドショー
const menuFvSlides = document.querySelectorAll('.menu-fv__slide');
let menuFvCurrent = 0;

function menuFvKenBurns(slide) {
  gsap.fromTo(
    slide.querySelector('img'),
    { scale: 1 },
    { scale: 1.06, duration: 6, ease: 'none' }
  );
}

function menuFvNext() {
  const currentSlide = menuFvSlides[menuFvCurrent];
  menuFvCurrent = (menuFvCurrent + 1) % menuFvSlides.length;
  const next = menuFvSlides[menuFvCurrent];

  gsap.to(currentSlide, { opacity: 0, duration: 1.5 });
  gsap.to(next, { opacity: 1, duration: 1.5 });
  menuFvKenBurns(next);
}

if (menuFvSlides.length > 0) {
  menuFvKenBurns(menuFvSlides[0]);
  setInterval(menuFvNext, 5000);
}


// news-fv・news-catalogページ アニメーション
const newsFvLabel = document.querySelector('.news-fv__label');
const newsFvTitle = document.querySelector('.news-fv__title');
const newsCatalogItems = document.querySelectorAll('.news-catalog__list-item');

if (newsFvLabel) {
  // FV：ラベル・タイトルを時間差でフェードイン
  gsap.from([newsFvLabel, newsFvTitle], {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.2,
  });
}

if (newsCatalogItems.length > 0) {
  // 記事カードを1枚ずつ時間差でフェードイン
  newsCatalogItems.forEach((item, i) => {
    gsap.from(item, {
      y: 32,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: i * 0.08,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
    });
  });
}


// news-post FV アニメーション
const postFvLabel = document.querySelector('.post-fv__label');
const postFvEyecatch = document.querySelector('.post-fv__eyecatch');

if (postFvLabel) {
  gsap.from(postFvLabel, {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  });

  gsap.from(postFvEyecatch, {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.3,
  });
}

// news-post 記事本文 アニメーション
const postArticle = document.querySelector('.post-article');

if (postArticle) {
  // 記事カード全体が下からフェードイン
  gsap.from(postArticle, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: postArticle,
      start: 'top 85%',
    },
  });

  // 画像
  const postImg = postArticle.querySelector('.post-article__img');
  if (postImg) {
    gsap.from(postImg, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: postImg,
        start: 'top 85%',
      },
    });
  }

  // 見出し・テキスト・情報ボックスを順に出現
  const postElements = postArticle.querySelectorAll(
    '.post-article__heading, .post-article__text, .post-article__info-box'
  );
  postElements.forEach((el) => {
    gsap.from(el, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      },
    });
  });
}


// contact-fv アニメーション（contact / thanks / 404 共通）
const contactFvLabel = document.querySelector('.contact-fv__label');
const contactFvTitle = document.querySelector('.contact-fv__title');

if (contactFvLabel) {
  gsap.from([contactFvLabel, contactFvTitle], {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.2,
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


//  menu-fv テキストフェードイン
const menuFvLabel = document.querySelector('.menu-fv__label');
const menuFvTitle = document.querySelector('.menu-fv__title');

if (menuFvLabel) {
  gsap.from([menuFvLabel, menuFvTitle], {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.2,
    delay: 0.3,
  });
}


//  メニューカードのスクロールフェードイン
const menuCardItems = document.querySelectorAll('.menu-catalog__grid-item');

if (menuCardItems.length > 0) {
  menuCardItems.forEach((item, i) => {
    gsap.from(item, {
      y: 32,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: i * 0.08,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
    });
  });
}


//  contactセクションのフェードイン
const contactSection = document.querySelector('.contact');

if (contactSection) {
  gsap.from(contactSection, {
    y: 32,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: contactSection,
      start: 'top 80%',
    },
  });
}
