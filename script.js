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
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// Smooth scroll to top when clicked
document.getElementById('backToTopBtn').addEventListener('click', function(e) {
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
