document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Add a scroll-to-top button
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.innerHTML = '<i class="lni lni-arrow-up"></i>';
    scrollTopBtn.className = "scroll-to-top";
    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll(".service-card, .testimonial-card");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Dark mode toggle
    const darkModeToggleButton = document.getElementById("dark-mode-toggle-button");
    const docElement = document.documentElement;
    const navbar = document.querySelector('.navbar');

    const enableDarkMode = () => {
        docElement.classList.add("dark-mode");
        if (navbar) {
            navbar.classList.remove("navbar-light");
            navbar.classList.add("navbar-dark");
        }
        localStorage.setItem("darkMode", "enabled");
        if (darkModeToggleButton) {
            darkModeToggleButton.textContent = "Light Mode";
        }
    };

    const disableDarkMode = () => {
        docElement.classList.remove("dark-mode");
        if (navbar) {
            navbar.classList.remove("navbar-dark");
            navbar.classList.add("navbar-light");
        }
        localStorage.setItem("darkMode", "disabled");
        if (darkModeToggleButton) {
            darkModeToggleButton.textContent = "Dark Mode";
        }
    };

    // Set initial button text
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    if (darkModeToggleButton) {
        darkModeToggleButton.addEventListener("click", () => {
            if (localStorage.getItem("darkMode") === "enabled") {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    // Listen for changes in system preference
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            // If the user has not made a choice, follow the system preference
            if (!localStorage.getItem('darkMode')) {
                if (e.matches) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            }
        });
    }

});