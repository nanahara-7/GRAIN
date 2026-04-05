
// GSAP Animations

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
