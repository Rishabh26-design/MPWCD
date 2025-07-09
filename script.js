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
            thumbnail: "https://i.ytimg.com/vi/7wtfhZwyrcc/maxresdefault.jpg",
            src: "https://www.youtube.com/live/oZi4zQ9dWiU?si=qaggLm21rwmHe-Ly",
            embedUrl: "https://www.youtube.com/embed/oZi4zQ9dWiU?si=9faOd2X3jAHIbxL0"
        },
        {
            thumbnail: "asset/Gallary/I.jpeg",
            src: "https://www.youtube.com/live/oZi4zQ9dWiU?si=qaggLm21rwmHe-Ly",
            embedUrl: "https://www.youtube.com/embed/oZi4zQ9dWiU?si=9faOd2X3jAHIbxL0"
        },
        {
            thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg",
            src: "https://www.youtube.com/live/oZi4zQ9dWiU?si=qaggLm21rwmHe-Ly",
            embedUrl: "https://www.youtube.com/embed/oZi4zQ9dWiU?si=9faOd2X3jAHIbxL0"
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
        openModal(galleryType === 'all' ? item.type : galleryType, index);
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

    if (type === 'all') {
        // For "All" gallery, we need to determine if the clicked item is image or video
        const clickedItem = combinedItems[index];
        currentMediaType = clickedItem.type;
        currentItems = currentMediaType === 'image' ?
            galleryData.images.slice(0, 6) :  // Use limited images for "All" tab
            galleryData.videos.slice(0, 2);  // Use limited videos for "All" tab

        // Find the index in the limited array
        if (currentMediaType === 'image') {
            currentIndex = galleryData.images.indexOf(clickedItem.src);
        } else {
            currentIndex = galleryData.videos.findIndex(v => v.thumbnail === clickedItem.thumbnail);
        }
    } else {
        // For specific tabs, use all items
        currentItems = type === 'image' ? galleryData.images : galleryData.videos;
    }

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
        iframe.src = currentItems[currentIndex].src;
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
        iframe.src = iframe.src; // Reset src to stop video
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