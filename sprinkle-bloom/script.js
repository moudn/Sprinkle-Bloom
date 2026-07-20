/* =====================================================================
   Sprinkle & Bloom 🧁 — vanilla JS
   Features: sticky header, scroll-reveal, floating particles,
   custom cursor, mobile nav, and a friendly form handler.
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
     3. Floating background particles (hearts / sprinkles / stars)
        Spawn randomly and let CSS @keyframes "rise" carry them up.
     --------------------------------------------------------------- */
  const field = $("#particleField");
  const GLYPHS = ["✨", "💖", "🧁", "🌸", "⭐", "🍬", "💕"];
  const BALLOONS = [
    "images/balloon-pink.png",
    "images/balloon-coral.png",
    "images/balloon-red.png",
  ];
  // kept low on purpose to avoid visual clutter over the content
  const PARTICLES = 8;

  function spawnParticle() {
    const p = document.createElement("span");
    p.className = "particle";
    p.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    // random horizontal start, size, and speed
    p.style.left = Math.random() * 100 + "vw";
    p.style.fontSize = (0.8 + Math.random() * 1.2).toFixed(2) + "rem";
    const duration = (14 + Math.random() * 12).toFixed(2);
    p.style.animationDuration = duration + "s";
    field.appendChild(p);
    // remove after it finishes rising so the DOM stays tidy
    p.addEventListener("animationend", () => p.remove());
  }

  // every so often a little watercolor balloon drifts up the page
  function spawnBalloon() {
    const b = document.createElement("img");
    b.className = "particle balloon-particle";
    b.src = BALLOONS[Math.floor(Math.random() * BALLOONS.length)];
    b.alt = "";
    b.style.left = 5 + Math.random() * 90 + "vw";
    b.style.width = (34 + Math.random() * 26).toFixed(0) + "px";
    b.style.animationDuration = (20 + Math.random() * 14).toFixed(2) + "s";
    field.appendChild(b);
    b.addEventListener("animationend", () => b.remove());
  }

  if (!reducedMotion) {
    // initial batch (staggered so they don't all appear at once)
    for (let i = 0; i < PARTICLES; i++) {
      setTimeout(spawnParticle, Math.random() * 12000);
    }
    // slow, gentle trickle
    setInterval(spawnParticle, 2800);
    setTimeout(spawnBalloon, 4000);
    setInterval(spawnBalloon, 18000);
  }

  /* ---------------------------------------------------------------
     4. Custom cupcake cursor (only on devices with a fine pointer /
        hover capability, i.e. real mice — not touch screens).
     --------------------------------------------------------------- */
  const cursor = $("#cursor");
  if (finePointer) {
    cursor.style.display = "block";
    document.body.style.cursor = "none"; // hide native cursor

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // smooth follow via requestAnimationFrame
    const follow = () => {
      curX += (mouseX - curX) * 0.3;
      curY += (mouseY - curY) * 0.3;
      cursor.style.transform =
        `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      requestAnimationFrame(follow);
    };
    follow();

    // fade in once the pointer actually moves, and fade out when it
    // leaves the window (prevents a stuck cupcake in the corner)
    window.addEventListener("mousemove", () => { cursor.style.opacity = "1"; });
    document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });

    // grow cursor over interactive elements for feedback
    $$("a, button, input, textarea, .polaroid, .step, .cake-card").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("active"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
    });
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
        note.style.color = "#d36b8a";
        note.textContent = "Oops! Please fill in all the fields 🍓";
        form.reportValidity();
        return;
      }
      const name = $("#name").value.trim().split(" ")[0] || "friend";
      note.style.color = "#4a8a4a";
      note.textContent = `Yum! Thanks ${name} — we'll whisk up your dream cake soon 🧁💕`;
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
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -14; // deg
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
        card.style.transform =
          `translateY(-12px) scale(1.04) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = ""; // hand control back to the stylesheet
      });
    });
  }
})();
