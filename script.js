gsap.registerPlugin(ScrollTrigger);

const DEG = Math.PI / 180;
const PERSPECTIVE = 1600;
const ITEM_COUNT = 40; // matches WORKS.length below -- raise this (and add more WORKS entries) any time to grow the archive; the pool below fills/repeats automatically either way.
const TURNS = 1;
const TILT = 58;
const ROT_Y = 86;
const RING_SCALE = 0.88;
const PARALLAX = 4;
const HOVER_OUT = 16, HOVER_Z = 12, HOVER_SCALE = 1.02, HOVER_DURATION = 0.32;
const MOBILE_MQ = "(max-width: 768px)";
const MOBILE_SELECTED_OUT = 8, MOBILE_SELECTED_Z = 2, MOBILE_SELECTED_SCALE = 1.005;
const MOBILE_TRANSITION = 0.25, MOBILE_FOCUS_ANGLE = -35, MOBILE_DRAG_SPEED = 0.35;

// Each entry pairs a real file with its own correct title/category so a
// card's label always matches what's actually playing on it, regardless of
// where the shuffle places it in the ring.
const WORKS = [
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/atakule-commercial-film.mp4", title: "Atakule", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/beypazar-maden-suyu-animation.mp4", title: "Beypazarı Maden Suyu", category: "Animation" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/beypazar-maden-suyu-animation-2.mp4", title: "Beypazarı Maden Suyu", category: "Animation" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/divan-cukurhan-social-media.mp4", title: "Divan Çukurhan", category: "Social Media" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/jw-marriott-ankara-commercial-film.mp4", title: "JW Marriott Ankara", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/jw-marriott-ankara-social-media.mp4", title: "JW Marriott Ankara", category: "Social Media" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/kuzu-effect-3d-animation.mp4", title: "Kuzu Effect", category: "3D Animation" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/luigis-social-media.mp4", title: "Luigis", category: "Social Media" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/luigis-social-media-2.mp4", title: "Luigis", category: "Social Media" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-cgi.mp4", title: "MAD Parfumeur", category: "CGI" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-commercial-film.mp4", title: "MAD Parfumeur", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-commercial-film-2.mp4", title: "MAD Parfumeur", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/matmazel-commercial-film.mp4", title: "Matmazel", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mineral-showreel.mp4", title: "Mineral", category: "Showreel" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/shelton-commercial-film.mp4", title: "Shelton", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/tc-cumhurbaskanlg-public-service-ad.mp4", title: "TC Cumhurbaşkanlığı", category: "Public Service Ad" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/tc-saglk-bakanlg-public-service-ad.mp4", title: "TC Sağlık Bakanlığı", category: "Public Service Ad" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/tff-x-mad-commercial-film.mp4", title: "TFF x MAD", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/volo-commercial-film.mp4", title: "Volo", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/yuksel-proje-commercial-film.mp4", title: "YÜKSEL PROJE", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-01.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-02.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-03.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-04.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-05.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-06.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-07.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-08.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-09.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-10.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-11.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-12.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-13.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-14.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-15.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mad-parfumeur-ai-film-16.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/esat-hal-commercial-film.mp4", title: "Esat Hal", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/liv-hospital-commercial-film.mp4", title: "LIV Hospital", category: "Commercial Film" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/liv-hospital-social-media.mp4", title: "LIV Hospital", category: "Social Media" },
  { src: "https://pub-70cab74e854d442d896f007d74ec86aa.r2.dev/public/mahall-bomonti-commercial-film.mp4", title: "Mahall Bomonti", category: "Commercial Film" },
];

const CATEGORIES = [
  { name: "AI Films" },
  { name: "CGI" },
  { name: "Commercial Films" },
  { name: "Social Media Productions" },
  { name: "Public Service Ads" },
  { name: "3D Animation" },
  { name: "Animation" },
];

const INC = 360 / ITEM_COUNT;
let radius = 470, yOffset = 0, ringRot = 0, introOffset = 0, introPlaying = false;
const items = [];
let activeCard = null;
const isMobile = window.matchMedia(MOBILE_MQ).matches;
let mobileSelectedCard = null, mobileCurrentRotation = 0, mobileTargetRotation = 0;

const scene = document.querySelector(".scene");
const gallery = document.getElementById("gallery");
const center = document.getElementById("center");
const previewImgWrap = document.getElementById("previewImg");
const previewCat = document.getElementById("previewCat");
const previewTitle = document.getElementById("previewTitle");
const labelsWrap = document.getElementById("labels");
const mpImgWrap = document.getElementById("mpImg");
const mpCat = document.getElementById("mpCat");
const mpTitle = document.getElementById("mpTitle");
const mobilePreview = document.getElementById("mobilePreview");
const ringHitbox = document.getElementById("ringHitbox");

function computeGeometry() {
  const vw = window.innerWidth, vh = window.innerHeight;
  if (isMobile) { radius = vw * 0.74; }
  else { radius = RING_SCALE * Math.max(300, Math.min(vw * 0.32, vh * 0.55)); }
  const localY = radius * Math.cos(TILT * DEG);
  const depthZ = radius * Math.sin(TILT * DEG);
  yOffset = localY * (PERSPECTIVE / (PERSPECTIVE - depthZ));
  if (isMobile) {
    const pr = mobilePreview.getBoundingClientRect();
    const archiveTop = (pr.bottom > 0 ? pr.bottom : vh * 0.46) + 26;
    const ringCenterX = vw * 0.98;
    gsap.set(gallery, { x: ringCenterX - vw / 2, y: archiveTop - vh / 2 });
    if (ringHitbox) ringHitbox.style.top = Math.round(archiveTop - 12) + "px";
  } else {
    gsap.set(gallery, { x: 0, y: -yOffset });
  }
}

function angleOf(card) { return card.index * INC - 90 + ringRot + introOffset; }
function depthOpacity(rotZdeg) { const back = Math.cos(rotZdeg * DEG); return 1 - (back + 1) * 0.25; }

function updateRing() {
  for (const card of items) {
    const rotZ = angleOf(card); card.depth = depthOpacity(rotZ);
    gsap.set(card.el, { rotationZ: rotZ }); gsap.set(card.cardEl, { opacity: card.depth });
  }
}

function buildGallery() {
  const pool = [];
  while (pool.length < ITEM_COUNT) pool.push(...WORKS);
  for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
  const frag = document.createDocumentFragment();
  for (let i = 0; i < ITEM_COUNT; i++) {
    const el = document.createElement("div"); el.className = "item";
    const cardEl = document.createElement("div"); cardEl.className = "item-card";
    // work carries both the media (src/type) and its label (title/category)
    // as one unit, so asset and project are just two views of the same
    // object -- whichever card a work lands on, hover text and video stay
    // in sync.
    const work = pool[i];
    // Ring cards are lazy: no src assigned yet. With 150 cards sharing only
    // ~12 real files, eagerly assigning src to all of them floods the
    // browser's per-host connection limit and the hovered card's own request
    // can sit queued behind 100+ others, so play() never gets data. The src
    // is assigned on first hover instead (see ensureVideoSource()).
    const media = createMedia(work, { lazy: true });
    cardEl.appendChild(media); el.appendChild(cardEl); frag.appendChild(el);
    const card = { el, cardEl, media, index: i, project: work, asset: work, hovered: false, depth: 1 };
    el._card = card; items.push(card);
  }
  gallery.appendChild(frag);
}

function createMedia(asset, opts) {
  opts = opts || {};
  const v = document.createElement("video");
  v.muted = true; v.defaultMuted = true; v.loop = true;
  v.playsInline = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");
  v.preload = opts.lazy ? "none" : "auto";
  v.addEventListener("error", () => {
    const err = v.error;
    console.error("[video error]", asset.src, err && err.code, err && err.message);
  });
  if (!opts.lazy) {
    v.src = asset.src;
    if (opts.autoplay) { v.autoplay = true; attemptPlay(v); }
  }
  return v;
}

// Chrome can abort a video-only autoplay play() call ("paused to save
// power") when it briefly judges the tab/element non-visible, and fast
// mouse movement across many ring cards can also interleave play()/pause()
// calls. Both surface as a rejected promise; retry once shortly after
// rather than silently giving up, since the element is genuinely on screen.
function attemptPlay(videoEl) {
  const p = videoEl.play();
  if (!p || !p.catch) return;
  p.catch((e) => {
    console.error("[video play() rejected]", videoEl.currentSrc || videoEl.src, e);
    setTimeout(() => { if (videoEl.isConnected) videoEl.play().catch(() => {}); }, 200);
  });
}

function ensureVideoSource(card) {
  if (!card.media.src) {
    card.media.preload = "auto";
    card.media.src = card.asset.src;
    card.media.load();
  }
}

function setupItems() {
  for (const card of items) {
    gsap.set(card.el, { xPercent: -50, yPercent: -50, transformOrigin: `50% ${radius}px`, rotationZ: angleOf(card) });
    gsap.set(card.cardEl, { rotationY: ROT_Y, x: 0, y: 0, z: 0, scale: 1, opacity: card.depth });
  }
}

let pendingHitCard, pendingHitTimer;
const HOVER_SETTLE_MS = 70;
function onPointerMove(e) {
  if (isMobile) return;
  const target = document.elementFromPoint(e.clientX, e.clientY);
  const hit = target && target.closest(".item");
  const card = hit ? hit._card : null;
  if (card === activeCard || card === pendingHitCard) return;
  // Debounce by time, not by a single frame. The ring is 150 thin,
  // overlapping 3D-rotated slivers, so elementFromPoint can return a
  // DIFFERENT element on consecutive calls at the very same pixel (real
  // hit-test ambiguity where hitboxes overlap, not just pointer jitter) --
  // a one-frame recheck still gets fooled. Only commit once `card` is the
  // most recent result for a short settle window; every new candidate
  // restarts the timer. Without this, every flicker tears down and
  // rebuilds the preview <video> from scratch, so it never gets past its
  // first few bytes.
  pendingHitCard = card;
  clearTimeout(pendingHitTimer);
  pendingHitTimer = setTimeout(() => {
    if (pendingHitCard === card) setActive(card);
  }, HOVER_SETTLE_MS);
}
function setActive(card) {
  if (card === activeCard) return;
  const prev = activeCard; activeCard = card;
  if (prev) restoreCard(prev);
  if (card) { pullOut(card); setPreview(card); } else { center.classList.remove("show-project"); }
}

function pullOut(card, opts) {
  const out = opts ? opts.out : HOVER_OUT, fwd = opts ? opts.z : HOVER_Z;
  const scl = opts ? opts.scale : HOVER_SCALE, dur = opts ? opts.duration : HOVER_DURATION;
  card.cardEl.classList.add("is-active");
  const Cx = window.innerWidth / 2, Cy = window.innerHeight / 2;
  const rect = card.el.getBoundingClientRect();
  const px = rect.left + rect.width / 2, py = rect.top + rect.height / 2;
  const len = Math.hypot(px - Cx, py - Cy) || 1;
  const dxs = ((px - Cx) / len) * out, dys = ((py - Cy) / len) * out;
  const T = TILT * DEG;
  const gx = dxs, gy = dys * Math.cos(T) + fwd * Math.sin(T), gz = -dys * Math.sin(T) + fwd * Math.cos(T);
  const phi = angleOf(card) * DEG, cosP = Math.cos(phi), sinP = Math.sin(phi);
  gsap.to(card.cardEl, { x: gx * cosP + gy * sinP, y: -gx * sinP + gy * cosP, z: gz,
    scale: scl, duration: dur, ease: "power3.out", overwrite: true });
  ensureVideoSource(card);
  attemptPlay(card.media);
}
function restoreCard(card, duration) {
  card.cardEl.classList.remove("is-active");
  gsap.to(card.cardEl, { x: 0, y: 0, z: 0, scale: 1, duration: duration || HOVER_DURATION, ease: "power2.out", overwrite: true });
  card.media.pause();
  // Only seek back to 0 once the video actually has data. Resetting
  // currentTime on a still-loading element (readyState 0) interrupts its
  // in-flight fetch -- Firefox reports this as "aborted by the user agent"
  // -- so fast mouse movement across many cards was cancelling every
  // video's download before it ever finished.
  if (card.media.readyState > 0) card.media.currentTime = 0;
}
function setPreview(card) {
  previewImgWrap.innerHTML = "";
  const media = createMedia(card.asset, { autoplay: true });
  previewImgWrap.appendChild(media);
  previewCat.textContent = card.project.category; previewTitle.textContent = card.project.title;
  center.classList.add("show-project");
  gsap.fromTo(media, { opacity: 0.35 }, { opacity: 1, duration: 0.5 });
}

const MOBILE_OPTS = { out: MOBILE_SELECTED_OUT, z: MOBILE_SELECTED_Z, scale: MOBILE_SELECTED_SCALE, duration: MOBILE_TRANSITION };
function nearestMobileCard() {
  let idx = Math.round((MOBILE_FOCUS_ANGLE + 90 - ringRot) / INC);
  idx = ((idx % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT; return items[idx];
}
function updateMobileSelection() {
  if (introPlaying) return;
  const card = nearestMobileCard();
  if (card === mobileSelectedCard) return;
  if (mobileSelectedCard) restoreCard(mobileSelectedCard, MOBILE_TRANSITION);
  mobileSelectedCard = card; pullOut(card, MOBILE_OPTS); updateMobilePreview(card);
}
function updateMobilePreview(card) {
  mpCat.textContent = card.project.category; mpTitle.textContent = card.project.title;
  mpImgWrap.innerHTML = "";
  const media = createMedia(card.asset, { autoplay: true });
  mpImgWrap.appendChild(media);
  gsap.fromTo(media, { opacity: 0.3 }, { opacity: 1, duration: MOBILE_TRANSITION, overwrite: true });
}

let mobileDragging = false, mobileVelocity = 0;
function mobileTick() {
  if (!mobileDragging) { mobileTargetRotation += mobileVelocity; mobileVelocity *= 0.92; if (Math.abs(mobileVelocity) < 0.01) mobileVelocity = 0; }
  mobileCurrentRotation += (mobileTargetRotation - mobileCurrentRotation) * 0.16;
  ringRot = mobileCurrentRotation; updateRing(); updateMobileSelection();
  requestAnimationFrame(mobileTick);
}
function initMobile() {
  mobileCurrentRotation = mobileTargetRotation = ringRot;
  let lastX = 0, lastY = 0;
  ringHitbox.addEventListener("pointerdown", (e) => {
    mobileDragging = true; mobileVelocity = 0; lastX = e.clientX; lastY = e.clientY;
    try { ringHitbox.setPointerCapture(e.pointerId); } catch (_) {}
  });
  ringHitbox.addEventListener("pointermove", (e) => {
    if (!mobileDragging) return; e.preventDefault();
    const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    const delta = dx * MOBILE_DRAG_SPEED + dy * 0.12; mobileTargetRotation += delta; mobileVelocity = delta;
  });
  const endDrag = (e) => { if (!mobileDragging) return; mobileDragging = false;
    try { if (ringHitbox.hasPointerCapture(e.pointerId)) ringHitbox.releasePointerCapture(e.pointerId); } catch (_) {} };
  ringHitbox.addEventListener("pointerup", endDrag);
  ringHitbox.addEventListener("pointercancel", endDrag);
  ringHitbox.addEventListener("wheel", (e) => { e.preventDefault(); mobileTargetRotation += e.deltaY * 0.18; }, { passive: false });
  updateMobileSelection();
  requestAnimationFrame(mobileTick);
}

function initParallax() {
  window.addEventListener("mousemove", (e) => {
    const px = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const py = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    gsap.to(gallery, { rotationX: TILT + py * PARALLAX, rotationY: -px * PARALLAX, duration: 1, ease: "power2.out", overwrite: "auto" });
  });
}

function initCursor() {
  if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;
  const cursor = document.getElementById("cursor");
  gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 });
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });
  window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });   // <-- dot FOLLOWS the mouse
  document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
  document.addEventListener("mouseenter", () => cursor.classList.remove("is-hidden"));
  const setScale = (s) => gsap.to(cursor, { scale: s, duration: 0.3, ease: "power3.out", overwrite: "auto" });
  scene.addEventListener("pointerenter", () => setScale(1.25));
  scene.addEventListener("pointerleave", () => setScale(1));
  document.querySelectorAll(".nav a, .corner a").forEach((el) => {
    el.addEventListener("pointerenter", () => setScale(0.6));
    el.addEventListener("pointerleave", () => setScale(1));
  });
}

function initScroll() {
  ScrollTrigger.create({ trigger: "body", start: "top top", end: "bottom bottom", scrub: 1.4,
    onUpdate: (self) => { ringRot = self.progress * 360 * TURNS; updateRing(); } });
}

function buildLabels() {
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const lrx = radius + 245, lry = radius * Math.cos(TILT * DEG) + 160, n = CATEGORIES.length;
  labelsWrap.innerHTML = "";
  CATEGORIES.forEach((cat, i) => {
    const angle = -90 + (360 / n) * i, rad = angle * DEG;
    const x = cx + Math.cos(rad) * lrx, y = cy + Math.sin(rad) * lry;
    const el = document.createElement("div"); el.className = "label";
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    el.innerHTML = `<span class="ul">${cat.name}</span>`;
    labelsWrap.appendChild(el);
  });
}

function initLoader() {
  const overlay = document.getElementById("loadingScreen");
  if (!overlay) return;
  const minLoad = new Promise((res) => setTimeout(res, 1400));
  // Every card is video, and these are large real client masters -- waiting
  // on any of them to load here would block the reveal on a full-file
  // download. The loader is just the minimum splash time; videos stream in
  // lazily once the ring is on screen (see ensureVideoSource()).
  minLoad.then(async () => {
    introOffset = 0; computeGeometry(); updateRing();
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    document.body.classList.add("page-ready");
    overlay.classList.add("is-hidden");
    revealUI();
    runIntro();
    gsap.timeline({ onComplete: () => overlay.remove() })
      .to(".loading-inner", { opacity: 0, y: -6, duration: 0.4, ease: "power2.in" })
      .to(overlay, { opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.1");
  });
}

function runIntro() {
  introPlaying = true; introOffset = -360; updateRing();
  gsap.to({ v: -360 }, { v: 0, duration: 1.6, ease: "power3.out",
    onUpdate() { introOffset = this.targets()[0].v; updateRing(); },
    onComplete() { introOffset = 0; introPlaying = false; updateRing(); } });
}

function revealUI() {
  const slideUi = [document.querySelector(".site-header"), ...document.querySelectorAll(".corner")];
  if (isMobile && mobilePreview) slideUi.push(mobilePreview);
  gsap.fromTo(slideUi.filter(Boolean), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 });
  if (!isMobile) {
    gsap.fromTo(center, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power3.out" });
    gsap.fromTo(".label", { opacity: 0 }, { opacity: 0.85, duration: 0.8, ease: "power2.out", stagger: 0.012, delay: 0.15 });
  }
}

function onResize() {
  computeGeometry(); setupItems(); updateRing();
  if (!isMobile) { buildLabels(); ScrollTrigger.refresh(); }
}

function init() {
  initLoader();
  computeGeometry();
  buildGallery();      // <-- runs for BOTH desktop AND mobile
  setupItems();
  updateRing();
  gsap.set(gallery, { rotationX: TILT });
  if (isMobile) {
    initMobile();
  } else {
    buildLabels(); initParallax(); initScroll(); initCursor();
    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerleave", () => { clearTimeout(pendingHitTimer); pendingHitCard = null; setActive(null); });
  }
  requestAnimationFrame(onResize);
  setTimeout(onResize, 300);
  window.addEventListener("load", onResize);
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(onResize, 150); });
  window.matchMedia(MOBILE_MQ).addEventListener("change", () => location.reload());
}

window.addEventListener("DOMContentLoaded", init);
