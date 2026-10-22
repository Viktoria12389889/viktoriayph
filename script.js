// ===== НАСТРОЙКА ВАШИХ ФОТО =====
// Чтобы добавить новую серию, скопируйте блок и поменяйте название (например, shoot6)
// Первое фото в списке автоматически становится обложкой в сетке.
const galleries = {
  car: [
    "images/portfolio/5390966418376956638.jpg",
    "images/portfolio/5390966418376956637.jpg",
    "images/portfolio/5390966418376956639.jpg",
    "images/portfolio/5390966418376956640.jpg",
    "images/portfolio/5390966418376956641.jpg",
    "images/portfolio/5390966418376956642.jpg",
    "images/portfolio/5390966418376956644.jpg",
    "images/portfolio/5390966418376956645.jpg",
    "images/portfolio/5390966418376956647.jpg",
    "images/portfolio/5390966418376956648.jpg"
  ],
  shoot2: [
    "images/portfolio/5319262351687098302.jpg",
    "images/portfolio/5319262351687098299.jpg",
    "images/portfolio/5319262351687098300.jpg",
    "images/portfolio/5319262351687098301.jpg",
    "images/portfolio/5319262351687098303.jpg",
    "images/portfolio/5319262351687098304.jpg"
  ],
  shoot3: [
    "images/portfolio/5319262351687098217.jpg",
    "images/portfolio/5319262351687098218.jpg",
    "images/portfolio/5319262351687098219.jpg",
    "images/portfolio/5319262351687098220.jpg",
    "images/portfolio/5319262351687098222.jpg",
    "images/portfolio/5319262351687098223.jpg",
    "images/portfolio/5319262351687098224.jpg",
    "images/portfolio/5319262351687098226.jpg",
    "images/portfolio/5319262351687098227.jpg"
  ],
  shoot4: [
    "images/portfolio/work4-1.jpg",
    "images/portfolio/work4-2.jpg",
    "images/portfolio/work4-3.jpg",
    "images/portfolio/work4-4.jpg",
    "images/portfolio/work4-5.jpg"
  ],
  shoot5: [
    "images/portfolio/work5-1.jpg",
    "images/portfolio/work5-2.jpg",
    "images/portfolio/work5-3.jpg",
    "images/portfolio/work5-4.jpg",
    "images/portfolio/work5-5.jpg"
  ]
};

// ===== ОТРИСОВКА СЕТКИ =====
function renderGalleryGrid() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  let html = '';
  const ids = Object.keys(galleries);

  ids.forEach((id) => {
    const photos = galleries[id];
    if (photos.length === 0) return;

    const coverPhoto = photos[0]; // Берем первую фотку как обложку
    const count = photos.length;  // Считаем количество фото

    html += `
      <div class="gallery-item" onclick="openGallery('${id}')">
        <img src="${coverPhoto}" alt="Фотосессия">
        <span class="gallery-count">${count} фото</span>
      </div>
    `;
  });

  grid.innerHTML = html;
}

// ===== ЛАЙТБОКС =====
let currentGallery = [];
let currentIndex = 0;
let isReviewMode = false;

function openGallery(galleryId) {
  const gallery = galleries[galleryId];
  if (!gallery || gallery.length === 0) return;

  isReviewMode = false;
  currentGallery = gallery;
  currentIndex = 0;

  document.getElementById('lightbox-img').src = currentGallery[currentIndex];
  document.getElementById('lightbox').classList.add('active');
  document.querySelector('.lightbox-prev').style.display = 'block';
  document.querySelector('.lightbox-next').style.display = 'block';
  updateCounter();
}

function openLightboxForReview(src) {
  isReviewMode = true;
  currentGallery = [];
  currentIndex = 0;

  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
  document.querySelector('.lightbox-prev').style.display = 'none';
  document.querySelector('.lightbox-next').style.display = 'none';
  document.getElementById('lightbox-counter').textContent = '';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

function changeImage(direction) {
  if (isReviewMode || currentGallery.length === 0) return;

  currentIndex += direction;
  if (currentIndex >= currentGallery.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = currentGallery.length - 1;

  document.getElementById('lightbox-img').src = currentGallery[currentIndex];
  updateCounter();
}

function updateCounter() {
  const counter = document.getElementById('lightbox-counter');
  counter.textContent = (isReviewMode || currentGallery.length === 0)
    ? ''
    : (currentIndex + 1) + ' / ' + currentGallery.length;
}

// ===== ОТЗЫВЫ =====
function scrollReviews(direction) {
  const track = document.getElementById('reviewsTrack');
  if (track) track.scrollBy({ left: direction * 320, behavior: 'smooth' });
}

// ===== КЛАВИАТУРА И КЛИКИ =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') changeImage(1);
  if (e.key === 'ArrowLeft') changeImage(-1);
});

const lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
  lightboxEl.addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
  });
}

window.addEventListener('load', renderGalleryGrid);