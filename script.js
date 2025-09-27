      // Theme toggle functionality
      const themeToggle = document.getElementById("themeToggle");
      const body = document.body;

      themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme");

        // Update icon
        if (body.classList.contains("light-theme")) {
          themeToggle.textContent = "🌙";
        } else {
          themeToggle.textContent = "🌓";
        }

        // Save preference (Note: localStorage not available in Claude artifacts)
        // localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href");
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }

          // Update active nav link
          document
            .querySelectorAll(".nav-link")
            .forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        });
      });

      // Scroll reveal animation
      const revealElements = document.querySelectorAll(".reveal");
      const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;

          if (elementTop < triggerBottom) {
            element.classList.add("active");
          }
        });
      };

      window.addEventListener("scroll", revealOnScroll);
      revealOnScroll(); // Initial check

      // Animate skill bars when skills section is visible
      const skillBars = document.querySelectorAll(".skill-progress");
      let skillsAnimated = false;

      const animateSkills = () => {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById("skills");
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;

        if (sectionTop < triggerBottom) {
          skillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
          });
          skillsAnimated = true;
        }
      };

      window.addEventListener("scroll", animateSkills);

      // Navbar background on scroll
      const navbar = document.querySelector(".navbar");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          navbar.style.background = "rgba(15, 23, 42, 0.95)";
          navbar.style.backdropFilter = "blur(20px)";
        } else {
          navbar.style.background = "rgba(255, 255, 255, 0.1)";
          navbar.style.backdropFilter = "blur(20px)";
        }
      });

      // Contact form handling
      const contactForm = document.getElementById("contactForm");
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const name = contactForm.querySelector('input[name="name"]').value;

        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          submitButton.textContent = "Message Sent!";
          submitButton.style.background =
            "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";

          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = "";
            contactForm.reset();
          }, 2000);

          // Show custom notification
          showNotification(
            `Thanks, ${name}! Your message has been sent successfully.`
          );
        }, 1500);
      });

      // Custom notification function
      function showNotification(message) {
        const notification = document.createElement("div");
        notification.textContent = message;
        notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                max-width: 300px;
                font-weight: 500;
            `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
          notification.style.transform = "translateX(0)";
        }, 100);

        // Animate out
        setTimeout(() => {
          notification.style.transform = "translateX(400px)";
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 300);
        }, 4000);
      }

      // Parallax effect for hero section
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        const hero = document.querySelector(".hero");
        if (hero && scrolled < window.innerHeight) {
          hero.style.transform = `translateY(${rate}px)`;
        }
      });

      // Add typing animation to hero title
      const heroTitle = document.querySelector(".hero-title");
      const text = heroTitle.textContent;

      function typeWriter(element, text, speed = 100) {
        element.textContent = "";
        let i = 0;
        element.style.borderRight = "3px solid #6366f1";

        function type() {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          } else {
            // Remove cursor after typing
            setTimeout(() => {
              element.style.borderRight = "none";
            }, 1000);
          }
        }
        type();
      }

      // Start typing animation after page load
      window.addEventListener("load", () => {
        setTimeout(() => {
          typeWriter(heroTitle, text, 150);
        }, 500);
      });

      // Add floating animation to project cards
      const projectCards = document.querySelectorAll(".project-card");
      projectCards.forEach((card, index) => {
        card.addEventListener("mouseenter", () => {
          card.style.transform =
            "translateY(-15px) rotateX(5deg) rotateY(5deg)";
          card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
        });
      });

      // Add magnetic effect to buttons
      const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
      buttons.forEach((button) => {
        button.addEventListener("mousemove", (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener("mouseleave", () => {
          button.style.transform = "";
        });
      });

      // Add active section highlighting in navbar
      window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-link");

        let current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 150;
          const sectionHeight = section.offsetHeight;

          if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
          ) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      });

      // Add smooth entrance animations for cards
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(
              ".skill-card, .project-card, .service-card"
            );
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Initialize card animations
      document.addEventListener("DOMContentLoaded", () => {
        const cardSections = document.querySelectorAll(
          "#skills, #projects, #services"
        );
        cardSections.forEach((section) => {
          const cards = section.querySelectorAll(
            ".skill-card, .project-card, .service-card"
          );
          cards.forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          });
          observer.observe(section);
        });
      });