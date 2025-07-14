document.addEventListener('DOMContentLoaded', function () {
    // Scheme Filter Functionality
    const schemeFilters = document.querySelectorAll('.scheme-filter');
    const schemeRows = document.querySelectorAll('#schemesTable tbody tr');

    schemeFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Remove active class from all buttons
            schemeFilters.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            schemeRows.forEach(row => {
                if (filterValue === 'all' || row.getAttribute('data-category') === filterValue) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Scheme Search Functionality
    const schemeSearch = document.getElementById('schemeSearch');
    schemeSearch.addEventListener('keyup', function () {
        const searchValue = this.value.toLowerCase();

        schemeRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            if (rowText.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });


    // Toggle language
    document.getElementById('langToggle').addEventListener('click', function () {
        const isHindiActive = document.body.classList.toggle('hindi-active');
        this.textContent = isHindiActive ? 'English' : 'हिंदी';
        localStorage.setItem('dashboardLanguage', isHindiActive ? 'hi' : 'en');
        updateChartLabels(isHindiActive);
    });



});

// Show/hide the button based on scroll position
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

// Smooth scroll to top when clicked
document.getElementById('backToTopBtn').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Check if localStorage has a count value
if (localStorage.getItem('count')) {
    // If yes, increment it
    let count = parseInt(localStorage.getItem('count')) + 1;
    localStorage.setItem('count', count);
    document.getElementById('count').textContent = count;
} else {
    // If no, initialize with 1
    localStorage.setItem('count', 1);
    document.getElementById('count').textContent = 1;
}

// owl Slider Initialization

$(document).ready(function () {
    $(".logo-slider").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000, // 3 seconds between transitions
        autoplaySpeed: 1000, // 1 second transition animation
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    });

    // Add animation class during transition
    $('.logo-slider').on('changed.owl.carousel', function (event) {
        $('.owl-item').removeClass('animated');
        $('.owl-item.active').addClass('animated');
    });
});


// Mobile dropdown fix
document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
        const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

// Sample data for the galleries
const galleryData = {
    images: [
        "asset/Gallary/A.jpeg",
        "asset/Gallary/B.jpeg",
        "asset/Gallary/C.jpeg",
        "asset/Gallary/D.jpeg",
        "asset/Gallary/E.jpeg",
        "asset/Gallary/F.jpeg",
        "asset/Gallary/G.jpeg",
        "asset/Gallary/H.jpeg"
    ],
    videos: [
        {
            thumbnail: "asset/Gallary/Thumbnail_1.jpg",
            src: "https://www.youtube.com/embed/1zXkktw5t4I?si=3P-mcQtLvpxPrXYJ"
        },
        {
            thumbnail: "asset/Gallary/Thumbnail_3.jpg",
            src: "https://www.youtube.com/embed/uT823FOKokg?si=W6HgS5ypZmZdnS1y"
        },
        {
            thumbnail: "asset/Gallary/Thumbnail_2.jpg",
            src: "https://www.youtube.com/embed/AKNUUMAthiA?si=9kWZXQkNCvp_q7Cw"
        }
    ]
};

// DOM elements
const tabButtons = document.querySelectorAll('.tab-btn');
const galleryContainers = document.querySelectorAll('.gallery-container');
const allGallery = document.getElementById('allGallery');
const imageGallery = document.getElementById('imageGallery');
const videoGallery = document.getElementById('videoGallery');
const modal = document.getElementById('mediaModal');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const previewContainer = document.getElementById('previewContainer');
const preview = document.getElementById('preview');

// State variables
let currentMediaType = 'all';
let currentIndex = 0;
let currentItems = [];
let combinedItems = [];

// Initialize galleries
function initGalleries() {
    // Create limited items for "All" gallery (6 images + 2 videos)
    const limitedImages = galleryData.images.slice(0, 6);
    const limitedVideos = galleryData.videos.slice(0, 2);

    combinedItems = [
        ...limitedImages.map(img => ({ type: 'image', src: img })),
        ...limitedVideos.map(vid => ({ type: 'video', ...vid }))
    ];

    // Create all media gallery with limited items
    combinedItems.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index, 'all');
        allGallery.appendChild(galleryItem);
    });

    // Create full image gallery
    galleryData.images.forEach((imgSrc, index) => {
        const galleryItem = createGalleryItem(
            { type: 'image', src: imgSrc },
            index,
            'image'
        );
        imageGallery.appendChild(galleryItem);
    });

    // Create full video gallery
    galleryData.videos.forEach((video, index) => {
        const galleryItem = createGalleryItem(
            { type: 'video', ...video },
            index,
            'video'
        );
        videoGallery.appendChild(galleryItem);
    });
}

// Create a gallery item
function createGalleryItem(item, index, galleryType) {
    const galleryItem = document.createElement('div');
    galleryItem.className = `gallery-item ${item.type === 'video' ? 'video-item' : ''}`;

    const img = document.createElement('img');
    img.src = item.type === 'image' ? item.src : item.thumbnail;
    img.alt = `${item.type} ${index + 1}`;

    galleryItem.appendChild(img);

    if (item.type === 'video') {
        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        galleryItem.appendChild(playIcon);
    }

    // Add click event
    galleryItem.addEventListener('click', () => {
        if (galleryType === 'all') {
            if (item.type === 'video') {
                // Find the video in the original array
                const videoIndex = galleryData.videos.findIndex(v => v.src === item.src);
                openModal('video', videoIndex);
            } else {
                // Find the image in the original array
                const imgIndex = galleryData.images.indexOf(item.src);
                openModal('image', imgIndex);
            }
        } else {
            openModal(item.type, index);
        }
    });

    return galleryItem;
}

// Tab switching functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show corresponding gallery
        const tabId = button.getAttribute('data-tab');
        galleryContainers.forEach(container => {
            container.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    });
});

// Open modal with specific media
function openModal(type, index) {
    currentMediaType = type;
    currentIndex = index;
    currentItems = type === 'image' ? galleryData.images : galleryData.videos;

    modal.style.display = 'flex';
    updateModalContent();
    createPreviewItems();
}

// Create preview items
function createPreviewItems() {
    preview.innerHTML = '';

    currentItems.forEach((item, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = `preview-item ${index === currentIndex ? 'active' : ''}`;

        const img = document.createElement('img');
        img.src = currentMediaType === 'image' ? item : item.thumbnail;
        img.alt = `${currentMediaType} preview ${index + 1}`;

        previewItem.appendChild(img);
        preview.appendChild(previewItem);

        // Add click event to preview items
        previewItem.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = index;
            updateModalContent();
            updatePreviewActiveState();
        });
    });

    previewContainer.style.display = 'flex';
}

// Update active state of preview items
function updatePreviewActiveState() {
    const previewItems = document.querySelectorAll('.preview-item');
    previewItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Update modal content based on current media
function updateModalContent() {
    modalContent.innerHTML = '';

    if (currentMediaType === 'image') {
        const img = document.createElement('img');
        img.src = currentItems[currentIndex];
        modalContent.appendChild(img);
    } else {
        const iframe = document.createElement('iframe');
        iframe.src = currentItems[currentIndex].src + '?autoplay=1';
        iframe.width = '800';
        iframe.height = '450';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        modalContent.appendChild(iframe);
    }
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    previewContainer.style.display = 'none';

    // Pause any playing videos when closing
    const iframe = modalContent.querySelector('iframe');
    if (iframe) {
        iframe.src = '';
    }
}

// Navigate to previous item
function prevItem() {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    updateModalContent();
    updatePreviewActiveState();
}

// Navigate to next item
function nextItem() {
    currentIndex = (currentIndex + 1) % currentItems.length;
    updateModalContent();
    updatePreviewActiveState();
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', prevItem);
nextBtn.addEventListener('click', nextItem);

// Close modal when clicking outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'ArrowRight') nextItem();
    }
});

// Initialize galleries when page loads
window.addEventListener('DOMContentLoaded', initGalleries);



document.addEventListener('DOMContentLoaded', function () {
    // Filter functionality
    const filters = document.querySelectorAll('.tender-filter');
    const tenderItems = document.querySelectorAll('.scroll-item');

    filters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            tenderItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            // Reset auto-scroll position when filtering
            resetAutoScroll();
        });
    });

    // Search functionality
    const searchInput = document.getElementById('tenderSearch');
    const searchButton = document.querySelector('#tenderSearch + button');

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();

        tenderItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Reset auto-scroll position when searching
        resetAutoScroll();
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Auto-scroll functionality
    const scrollContainer = document.getElementById('tendersContainer');
    const scrollContent = document.getElementById('scrollContent');
    let scrollPosition = 0;
    let scrollInterval;
    let isManualScrolling = false;
    let scrollTimeout;
    const scrollSpeed = 1; // pixels per interval
    const scrollDelay = 50; // milliseconds between intervals
    const resumeDelay = 3000; // milliseconds before resuming auto-scroll after manual interaction

    function startAutoScroll() {
        const containerHeight = scrollContainer.clientHeight;
        const contentHeight = scrollContent.scrollHeight;

        // Only start scrolling if content is taller than container
        if (contentHeight > containerHeight) {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                if (!isManualScrolling) {
                    scrollPosition += scrollSpeed;

                    // Check if we've scrolled to the bottom
                    if (scrollPosition >= contentHeight - containerHeight) {
                        // Reset to top smoothly
                        scrollPosition = 0;
                        scrollContent.style.transition = 'transform 1s ease-out';
                        scrollContent.style.transform = `translateY(-${scrollPosition}px)`;

                        // After resetting, remove transition for smooth continuous scrolling
                        setTimeout(() => {
                            scrollContent.style.transition = 'none';
                        }, 1000);
                    } else {
                        // Normal scrolling
                        scrollContent.style.transform = `translateY(-${scrollPosition}px)`;
                    }
                }
            }, scrollDelay);
        }
    }

    function resetAutoScroll() {
        // Stop current scrolling
        clearInterval(scrollInterval);

        // Reset position
        scrollPosition = 0;
        scrollContent.style.transition = 'transform 0.5s ease-out';
        scrollContent.style.transform = 'translateY(0)';

        // Force reflow to ensure transition works
        void scrollContent.offsetHeight;


        // After reset, start scrolling again
        setTimeout(() => {
            scrollContent.style.transition = 'transform 0.5s ease-out';
            startAutoScroll();
        }, 500);
    }

    // Pause on hover
    scrollContainer.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
        scrollContent.style.transition = 'transform 0.2s ease-out';
    });

    // Resume when mouse leaves
    scrollContainer.addEventListener('mouseleave', () => {
        startAutoScroll();
    });

    // Mouse wheel scrolling
    scrollContainer.addEventListener('wheel', (e) => {
        e.preventDefault();

        const containerHeight = scrollContainer.clientHeight;
        const contentHeight = scrollContent.scrollHeight;
        const maxScroll = contentHeight - containerHeight;

        // Calculate new scroll position
        scrollPosition += e.deltaY * 0.5; // Reduce scroll speed for better control

        // Constrain scroll position
        scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));

        // Apply the scroll
        scrollContent.style.transform = `translateY(-${scrollPosition}px)`;

        // Set manual scrolling state
        isManualScrolling = true;
        scrollContent.style.transition = 'transform 0.1s ease-out';

        // Clear any pending timeout
        clearTimeout(scrollTimeout);

        // Set timeout to resume auto-scrolling
        scrollTimeout = setTimeout(() => {
            isManualScrolling = false;
            startAutoScroll();
        }, resumeDelay);
    });

    // Touch support for mobile devices
    let touchStartY = 0;
    let touchMoveY = 0;

    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        isManualScrolling = true;
        clearInterval(scrollInterval);
        scrollContent.style.transition = 'transform 0.1s ease-out';
    });

    scrollContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        touchMoveY = e.touches[0].clientY;
        const deltaY = touchStartY - touchMoveY;

        const containerHeight = scrollContainer.clientHeight;
        const contentHeight = scrollContent.scrollHeight;
        const maxScroll = contentHeight - containerHeight;

        // Calculate new scroll position
        scrollPosition = deltaY;

        // Constrain scroll position
        scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));

        // Apply the scroll
        scrollContent.style.transform = `translateY(-${scrollPosition}px)`;

        // Clear any pending timeout
        clearTimeout(scrollTimeout);
    });

    scrollContainer.addEventListener('touchend', () => {
        // Set timeout to resume auto-scrolling
        scrollTimeout = setTimeout(() => {
            isManualScrolling = false;
            startAutoScroll();
        }, resumeDelay);
    });

    // Initialize auto-scroll
    startAutoScroll();
});


// Page load transition
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.body.classList.add('loaded');
    }, 100);

    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('.section-fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});


// Function to format date and time in "DD Month YYYY, HH:MM:SS" format
function formatDateTime(date) {
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: true
    };
    return date.toLocaleDateString('en-IN', options);
}

// Function to update time every second
function updateDateTime() {
    // Get either stored date or current date
    const storedDate = localStorage.getItem('lastUpdated');
    const lastUpdated = storedDate ? new Date(storedDate) : new Date();

    // Format and display
    document.getElementById('update-date-time').textContent = formatDateTime(lastUpdated);
}

document.addEventListener('DOMContentLoaded', function () {
    // Set initial last updated time (you can modify this to fetch from server)
    const lastUpdated = new Date();
    localStorage.setItem('lastUpdated', lastUpdated.toString());

    // Initialize display
    updateDateTime();

    // Update time every second (optional)
    setInterval(updateDateTime, 1000);

    // Visitor counter
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    document.getElementById('count').textContent = visitorCount.toLocaleString('en-IN');
});

// For actual content updates, you would call this when content changes:
/*
function contentUpdated() {
    const updateTime = new Date();
    localStorage.setItem('lastUpdated', updateTime.toString());
    document.getElementById('update-date-time').textContent = formatDateTime(updateTime);
    
    // In a real implementation, you would also send this to your server
    // fetch('/api/update-timestamp', { method: 'POST' });
}
*/
