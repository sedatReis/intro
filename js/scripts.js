document.addEventListener('DOMContentLoaded', () => {
    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Smooth scrolling for anchor links with custom offsets
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Set custom offsets for each section
            let offset = 0;
            if (targetId === 'ueber-uns') {
                offset = 67;
            } else if (targetId === 'leistungen') {
                offset = 75; // Adjust as needed
            } else if (targetId === 'auftraege') {
                offset = 10; // No offset for the carousel
            }

            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });

    // Bootstrap Carousel Initialization with 4-second interval
    const galleryCarouselElement = document.querySelector('#galleryCarousel');
    const galleryCarousel = new bootstrap.Carousel(galleryCarouselElement, {
        interval: 4000, // 4 seconds
        ride: 'carousel', // Start automatically
        wrap: true, // Loop through slides
        pause: false // No pause on hover
    });

    // Debugging to ensure proper timing
    galleryCarouselElement.addEventListener('slide.bs.carousel', () => {
        console.log('Carousel slide at:', new Date().toISOString());
    });

    // Modal functionality for images
    const slidesImages = document.querySelectorAll('.carousel-item img');
    const modalImages = document.getElementById('modalImages');
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));

    slidesImages.forEach((slide) => {
        slide.addEventListener('click', () => {
            modalImages.innerHTML = '';
            const images = JSON.parse(slide.getAttribute('data-images'));
            images.forEach((imageSrc) => {
                const imgElement = document.createElement('img');
                imgElement.src = imageSrc;
                imgElement.alt = "Projekt Bild";
                imgElement.style.width = '100%';
                imgElement.style.marginBottom = '10px';
                modalImages.appendChild(imgElement);
            });
            galleryModal.show();
        });
    });

    // Ensure the modal properly cleans up after closing
    document.getElementById('galleryModal').addEventListener('hidden.bs.modal', () => {
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.style.overflow = ''; // Reset body overflow
        document.body.style.paddingRight = ''; // Reset padding
    });

    // Add fallback to remove lingering backdrop
    document.addEventListener('click', () => {
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
    });

    // Video Mute Button
    const video = document.querySelector('#video');
    const muteButton = document.querySelector('#muteButton');
    const muteIcon = document.querySelector('#muteIcon');

    muteButton.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            muteIcon.classList.remove('bi-volume-mute-fill');
            muteIcon.classList.add('bi-volume-up-fill');
        } else {
            video.muted = true;
            muteIcon.classList.remove('bi-volume-up-fill');
            muteIcon.classList.add('bi-volume-mute-fill');
        }
    });

    video.addEventListener('loadeddata', () => {
        video.play();
    });

    video.addEventListener('timeupdate', () => {
        if (video.currentTime >= video.duration) {
            video.currentTime = 0;
            video.play();
        }
    });
});
