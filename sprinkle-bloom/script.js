/* =====================================================================
   Sprinkle & Bloom — vanilla JS
   Features: sticky header, scroll-reveal, drifting balloons, parallax,
   3D card tilt, mobile nav, and a friendly form handler.
   No external libraries required.
   ===================================================================== */

(function () {
  "use strict";

  /* ---------- 0. Helpers ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer   = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------------------------------------------------------
     1. Sticky header: add .scrolled once the user scrolls down a bit
     --------------------------------------------------------------- */
  const header = $("#header");
  const onScrollHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------------
     2. Scroll-reveal: use IntersectionObserver to add .visible
        when an element with .reveal enters the viewport.
     --------------------------------------------------------------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // reveal once
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------------------------------------------------------------
     3. Drifting watercolor balloons — every so often one floats up
        the page. Kept rare and faint so it stays a delicate detail.
     --------------------------------------------------------------- */
  const field = $("#particleField");
  const BALLOONS = [
    "images/balloon-pink.png",
    "images/balloon-coral.png",
    "images/balloon-red.png",
  ];

  function spawnBalloon() {
    const b = document.createElement("img");
    b.className = "balloon-particle";
    b.src = BALLOONS[Math.floor(Math.random() * BALLOONS.length)];
    b.alt = "";
    b.style.left = 5 + Math.random() * 90 + "vw";
    b.style.width = (30 + Math.random() * 22).toFixed(0) + "px";
    b.style.animationDuration = (24 + Math.random() * 14).toFixed(2) + "s";
    field.appendChild(b);
    // remove after it finishes rising so the DOM stays tidy
    b.addEventListener("animationend", () => b.remove());
  }

  if (field && !reducedMotion) {
    setTimeout(spawnBalloon, 5000);
    setInterval(spawnBalloon, 22000);
  }

  /* ---------------------------------------------------------------
     5. Mobile navigation toggle
     --------------------------------------------------------------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  // close menu after clicking a link
  $$("#navLinks a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------------------------------------------------------------
     6. Footer year (avoids hard-coding)
     --------------------------------------------------------------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------
     7. Order form — friendly client-side handling (no backend).
        Replace with a real endpoint / fetch() when ready.
     --------------------------------------------------------------- */
  const form = $("#orderForm");
  const note = $("#formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        note.style.color = "#B0716F";
        note.textContent = "Please fill in all the fields before sending.";
        form.reportValidity();
        return;
      }
      const name = $("#name").value.trim().split(" ")[0] || "friend";
      note.style.color = "#7A8B6F";
      note.textContent = `Thank you, ${name} — we'll be in touch to whisk up your dream cake.`;
      form.reset();
    });
  }

  /* ---------------------------------------------------------------
     8. Hero title reveal — split the h1 into words that rise in
        one after another (skipped under prefers-reduced-motion).
     --------------------------------------------------------------- */
  const splitTarget = $("[data-split]");
  if (splitTarget && !reducedMotion) {
    let wordIndex = 0;
    const splitNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((piece) => {
          if (!piece) return;
          if (/^\s+$/.test(piece)) {
            frag.appendChild(document.createTextNode(piece));
          } else {
            const w = document.createElement("span");
            w.className = "title-word";
            w.textContent = piece;
            w.style.animationDelay = (wordIndex++ * 0.09).toFixed(2) + "s";
            frag.appendChild(w);
          }
        });
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(splitNode);
      }
    };
    Array.from(splitTarget.childNodes).forEach(splitNode);
  }

  /* ---------------------------------------------------------------
     9. Parallax — decorative elements drift with the mouse
        (data-depth: higher = moves more) and with scrolling
        (data-speed: negative = floats upward as you scroll).
        Offsets are written to --px/--py custom properties, which
        the sway/floaty keyframes read, so both effects compose.
     --------------------------------------------------------------- */
  const parallaxEls = $$("[data-depth], [data-speed]");
  if (parallaxEls.length && !reducedMotion) {
    let targetX = 0, targetY = 0, curMX = 0, curMY = 0;
    if (finePointer) {
      window.addEventListener("mousemove", (e) => {
        targetX = e.clientX / window.innerWidth - 0.5;   // -0.5 .. 0.5
        targetY = e.clientY / window.innerHeight - 0.5;
      }, { passive: true });
    }

    const parallaxFrame = () => {
      // ease the mouse position for a dreamy, floaty feel
      curMX += (targetX - curMX) * 0.06;
      curMY += (targetY - curMY) * 0.06;
      const vhMid = window.innerHeight / 2;

      parallaxEls.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0");
        const speed = parseFloat(el.dataset.speed || "0");
        let px = 0, py = 0;
        if (depth) {
          px += curMX * depth;
          py += curMY * depth;
        }
        if (speed) {
          const r = el.getBoundingClientRect();
          py += (r.top + r.height / 2 - vhMid) * speed;
        }
        el.style.setProperty("--px", px.toFixed(2) + "px");
        el.style.setProperty("--py", py.toFixed(2) + "px");
      });
      requestAnimationFrame(parallaxFrame);
    };
    parallaxFrame();
  }

  /* ---------------------------------------------------------------
     10. 3D tilt on the cake cards — the polaroid tips toward the
         cursor like a card being picked up (mouse-only).
     --------------------------------------------------------------- */
  if (finePointer && !reducedMotion) {
    $$(".treat-card, .slice-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -7; // deg
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
        card.style.transform =
          `translateY(-8px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = ""; // hand control back to the stylesheet
      });
    });
  }
})();
