/* ============================================================
   Royce · Portfolio — interactions
   ============================================================ */

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar background on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu toggle
const burger = document.getElementById("burger");
const links = document.querySelector(".nav__links");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
});
// Close menu when a link is clicked
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

// Scroll-reveal with IntersectionObserver
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Safety net: if anything is still hidden after load (e.g. observer
// quirks), reveal it so content is never stuck invisible.
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("in");
    });
  }, 600);
});

// Spotlight effect that follows the cursor on project cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// Footer visitor count from GoatCounter (only shows if the count loads)
fetch("https://royce-ptr.goatcounter.com/counter/TOTAL.json")
  .then((r) => (r.ok ? r.json() : Promise.reject()))
  .then((d) => {
    const count = d.count_unique || d.count;
    if (!count) return;
    document.getElementById("visit-count").textContent = count;
    document.getElementById("visits").hidden = false;
  })
  .catch(() => {
    /* counter not enabled yet or offline — leave the badge hidden */
  });
