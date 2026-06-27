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

// ---- Tabbed sections ----
// Each <section class="tab-panel"> is shown one at a time. Any in-page
// link (#about, #build, ...) or the logo swaps the active panel instead
// of scrolling, giving a tabbed single-page experience.
const panels = Array.from(document.querySelectorAll(".tab-panel"));
const tabLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

function showTab(id) {
  const panel = document.getElementById(id);
  if (!panel || !panel.classList.contains("tab-panel")) return false;
  panels.forEach((p) => p.classList.toggle("is-active", p === panel));
  // Highlight the matching nav link
  document.querySelectorAll(".nav__links a").forEach((a) => {
    const on = a.getAttribute("href") === "#" + id;
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  // Content inside a hidden panel never triggered the reveal observer,
  // so reveal it now that the panel is visible.
  panel.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  window.scrollTo({ top: 0, behavior: "auto" });
  return true;
}

tabLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target && target.classList.contains("tab-panel")) {
      e.preventDefault();
      history.replaceState(null, "", "#" + id);
      showTab(id);
    }
  });
});

// Open the tab named in the URL hash on load, otherwise the hero.
if (!showTab(location.hash.slice(1))) showTab("hero");

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
