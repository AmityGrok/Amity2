// Gallery and lightbox functionality

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            openLightbox(img.src, this.dataset.caption || '');
        });
    });
}

function openLightbox(src, caption = '') {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImage');
    const captionDiv = document.getElementById('lightboxCaption');
    
    img.src = src;
    captionDiv.textContent = caption;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('show');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.classList.remove('show');
}

document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});

document.querySelector('.close')?.addEventListener('click', closeLightbox);

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initGallery);
