document.addEventListener("DOMContentLoaded", () => {
  // Theme switcher functionality
  const themeSwitch = document.getElementById("checkbox");
  const body = document.body;

  // Check for saved theme preference or use system preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    themeSwitch.checked = true;
  } else if (currentTheme === "light") {
    body.classList.remove("dark-mode");
    themeSwitch.checked = false;
  } else if (prefersDarkScheme.matches) {
    body.classList.add("dark-mode");
    themeSwitch.checked = true;
    localStorage.setItem("theme", "dark");
  }

  // Listen for toggle changes
  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });

  // Listen for system preference changes
  prefersDarkScheme.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        body.classList.add("dark-mode");
        themeSwitch.checked = true;
      } else {
        body.classList.remove("dark-mode");
        themeSwitch.checked = false;
      }
    }
  });

  // Handle mobile navigation
  //const navbarToggler = document.querySelector(".navbar-toggler")
  //const navbarCollapse = document.querySelector(".navbar-collapse")

  // Close navbar when clicking outside
  //document.addEventListener("click", (event) => {
  //  const isNavbarOpen = navbarCollapse.classList.contains("show")
  //  const clickedInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target)

  // if (isNavbarOpen && !clickedInsideNavbar) {
  //   navbarToggler.click()
  //}
  //})

  // Close navbar when clicking on a nav link (for mobile)
  // const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  // navLinks.forEach((link) => {
  //   link.addEventListener("click", () => {
  //     if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
  navbarToggler.click();
  //}
  //   })
  // })

  // Handle dropdown menus on mobile (touch devices)
  // if ("ontouchstart" in window) {
  //   const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
  //   dropdownToggles.forEach((toggle) => {
  //     toggle.addEventListener("click", function (e) {
  //       if (window.innerWidth < 992) {
  //         e.preventDefault()
  //         e.stopPropagation()

  //         const dropdown = this.nextElementSibling
  //         const isOpen = dropdown.classList.contains("show")

  // Close all other dropdowns
  //         document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
  //           if (menu !== dropdown) {
  //             menu.classList.remove("show")
  //             menu.previousElementSibling.setAttribute("aria-expanded", "false")
  //           }
  //         })

  // Toggle current dropdown
  //         dropdown.classList.toggle("show")
  //         this.setAttribute("aria-expanded", isOpen ? "false" : "true")
  //       }
  //       })
  //     })
  //   }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#" && href !== "#navbarNavDropdown") {
        e.preventDefault();

        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Form validation enhancement
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic form validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("is-invalid");
        } else {
          field.classList.remove("is-invalid");
        }
      });

      // Email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add("is-invalid");
        }
      }

      if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Envoi en cours...";

        // Simulate API call
        setTimeout(() => {
          // Reset form
          contactForm.reset();

          // Show success message
          const formCard = contactForm.closest(".contact-card");
          const successMessage = document.createElement("div");
          successMessage.className = "alert alert-success mt-3";
          successMessage.textContent =
            "Votre message a été envoyé avec succès!";
          formCard.appendChild(successMessage);

          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = originalText;

          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }, 1500);
      }
    });

    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        if (this.hasAttribute("required") && !this.value.trim()) {
          this.classList.add("is-invalid");
        } else {
          this.classList.remove("is-invalid");
        }

        // Email validation on blur
        if (this.type === "email" && this.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(this.value)) {
            this.classList.add("is-invalid");
          }
        }
      });
    });
  }

  // Add responsive behavior for fixed elements
  function adjustFixedElements() {
    const languageSwitch = document.querySelector(".language-switch");

    if (window.innerWidth < 768) {
      languageSwitch.style.padding = "5px 12px";
      languageSwitch.style.fontSize = "0.9rem";
    } else {
      languageSwitch.style.padding = "7px 18px";
      languageSwitch.style.fontSize = "1.1rem";
    }
  }

  // Run on load and resize
  adjustFixedElements();
  window.addEventListener("resize", adjustFixedElements);
});
