// Lazy loading function
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img[data-src]');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.onload = () => image.classList.add('loaded');
                observer.unobserve(image);
            }
        });
    }, options);

    images.forEach(image => {
        imageObserver.observe(image);
    });
});
