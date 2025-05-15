// Handle mobile navigation
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

// Close navbar when clicking outside
document.addEventListener("click", (event) => {
  const isNavbarOpen = navbarCollapse.classList.contains("show");
  const clickedInsideNavbar =
    navbarCollapse.contains(event.target) ||
    navbarToggler.contains(event.target);

  if (isNavbarOpen && !clickedInsideNavbar) {
    navbarToggler.click();
  }
});

// Close navbar when clicking on a nav link (for mobile)
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});

// Handle dropdown menus on mobile (touch devices)
if ("ontouchstart" in window) {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();

        const dropdown = this.nextElementSibling;
        const isOpen = dropdown.classList.contains("show");

        // Close all other dropdowns
        document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
          if (menu !== dropdown) {
            menu.classList.remove("show");
            menu.previousElementSibling.setAttribute("aria-expanded", "false");
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle("show");
        this.setAttribute("aria-expanded", isOpen ? "false" : "true");
      }
    });
  });
}
