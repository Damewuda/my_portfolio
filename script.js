// Execute all code when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
      hamburger.textContent = hamburger.classList.contains("active")
        ? "✕"
        : "☰";
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.textContent = "☰";
      });
    });
  }

  // Active link highlighting
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  function highlightNav() {
    let scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === "#" + sectionId) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav);

  // Initial call to highlight the correct nav item
  highlightNav();

  // Contact form submission
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple form validation
      const name = this.querySelector(
        'input[placeholder="Your Name"]'
      ).value.trim();
      const email = this.querySelector(
        'input[placeholder="Your Email"]'
      ).value.trim();
      const message = this.querySelector("textarea").value.trim();

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields");
        return;
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Here you would typically send data to a server
      alert("Thank you for your message! I will get back to you soon.");

      // Reset form
      this.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed navbar
          behavior: "smooth",
        });
      }
    });
  });
});
