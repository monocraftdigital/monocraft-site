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
// Mobile is a flat, horizontally-draggable strip (not the circular ring --
// see layoutMobileStrip()), so its sizing is linear pixels, not angles.
// Keep MOBILE_CARD_W/H in sync with .item's mobile override in styles.css.
const MOBILE_CARD_W = 132, MOBILE_CARD_H = 96, MOBILE_CARD_GAP = 14;
const MOBILE_STEP = MOBILE_CARD_W + MOBILE_CARD_GAP;
// The strip's visible window is exactly two cards wide (see .gallery's
// mobile width in styles.css, kept in sync with this) -- not the full
// viewport -- so exactly two whole cards ever show, centered under the big
// preview above, with the arrow hints sitting in open background on
// either side rather than crowding a peeked-at third card.
const MOBILE_VISIBLE_W = MOBILE_CARD_W * 2 + MOBILE_CARD_GAP;
const MOBILE_SELECTED_SCALE = 1.14;
const MOBILE_TRANSITION = 0.25, MOBILE_DRAG_SPEED = 1;

// Each entry pairs a real file with its own correct title/category so a
// card's label always matches what's actually playing on it, regardless of
// where the shuffle places it in the ring.
const WORKS = [
  { src: "https://videos.monocraftdigital.com/public/atakule-commercial-film.mp4", title: "Atakule", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/beypazar-maden-suyu-animation.mp4", title: "Beypazarı Maden Suyu", category: "Animation" },
  { src: "https://videos.monocraftdigital.com/public/beypazar-maden-suyu-animation-2.mp4", title: "Beypazarı Maden Suyu", category: "Animation" },
  { src: "https://videos.monocraftdigital.com/public/divan-cukurhan-social-media.mp4", title: "Divan Çukurhan", category: "Social Media" },
  { src: "https://videos.monocraftdigital.com/public/jw-marriott-ankara-commercial-film.mp4", title: "JW Marriott Ankara", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/jw-marriott-ankara-social-media.mp4", title: "JW Marriott Ankara", category: "Social Media" },
  { src: "https://videos.monocraftdigital.com/public/kuzu-effect-3d-animation.mp4", title: "Kuzu Effect", category: "Animation" },
  { src: "https://videos.monocraftdigital.com/public/luigis-social-media.mp4", title: "Luigis", category: "Social Media" },
  { src: "https://videos.monocraftdigital.com/public/luigis-social-media-2.mp4", title: "Luigis", category: "Social Media" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-cgi.mp4", title: "MAD Parfumeur", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-commercial-film.mp4", title: "MAD Parfumeur", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-commercial-film-2.mp4", title: "MAD Parfumeur", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/matmazel-commercial-film.mp4", title: "Matmazel", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/mineral-showreel.mp4", title: "Mineral", category: "Showreel" },
  { src: "https://videos.monocraftdigital.com/public/shelton-commercial-film.mp4", title: "Shelton", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/tc-cumhurbaskanlg-public-service-ad.mp4", title: "TC Cumhurbaşkanlığı", category: "Public Service Ad" },
  { src: "https://videos.monocraftdigital.com/public/tc-saglk-bakanlg-public-service-ad.mp4", title: "TC Sağlık Bakanlığı", category: "Public Service Ad" },
  { src: "https://videos.monocraftdigital.com/public/tff-x-mad-commercial-film.mp4", title: "TFF x MAD", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/volo-commercial-film.mp4", title: "Volo", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/yuksel-proje-commercial-film.mp4", title: "YÜKSEL PROJE", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-01.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-02.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-03.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-04.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-05.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-06.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-07.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-08.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-09.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-10.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-11.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-12.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-13.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-14.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-15.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/mad-parfumeur-ai-film-16.mp4", title: "MAD Parfumeur", category: "AI Film" },
  { src: "https://videos.monocraftdigital.com/public/esat-hal-commercial-film.mp4", title: "Esat Hal", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/liv-hospital-commercial-film.mp4", title: "LIV Hospital", category: "Commercial Film" },
  { src: "https://videos.monocraftdigital.com/public/liv-hospital-social-media.mp4", title: "LIV Hospital", category: "Social Media" },
  { src: "https://videos.monocraftdigital.com/public/mahall-bomonti-commercial-film.mp4", title: "Mahall Bomonti", category: "Commercial Film" },
];

const CATEGORIES = [
  { name: "AI Films" },
  { name: "Commercial Films" },
  { name: "Social Media Productions" },
  { name: "Public Service Ads" },
  { name: "Animation" },
];
// The marquee/ring labels use plural, expanded display names, but each
// WORKS entry's own `category` is the shorter singular form actually stored
// on the card -- this is the map between the two so a label tap can filter
// against real card data.
const CATEGORY_MATCH = {
  "AI Films": "AI Film",
  "Commercial Films": "Commercial Film",
  "Social Media Productions": "Social Media",
  "Public Service Ads": "Public Service Ad",
  "Animation": "Animation",
};

const INC = 360 / ITEM_COUNT;
let radius = 470, yOffset = 0, ringRot = 0, introOffset = 0, introPlaying = false;
const items = [];
let activeCard = null;
// Clicking a ring card "pins" it: the center preview locks to that card and
// stops following hover entirely, so there's no longer any path by which
// moving the cursor toward the sound button can make the video change or
// disappear. Click the pinned card again to release it back to normal
// hover-follows-preview browsing.
let pinnedCard = null;
const isMobile = window.matchMedia(MOBILE_MQ).matches;
let mobileSelectedCard = null, mobileCurrentScrollX = 0, mobileTargetScrollX = 0;
let mobileFilter = null; // null = show all; else one of CATEGORIES[].name

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
const previewSoundBtn = document.getElementById("previewSound");
const mpSoundBtn = document.getElementById("mpSound");
let activePreviewMedia = null, activeMobilePreviewMedia = null;

// The center preview is the one deliberate, single-project view (as opposed
// to the 40 muted ring cards, where unmuted audio would overlap into noise
// as the cursor crosses them) -- sound only turns on via an explicit click,
// which is also what keeps browsers' autoplay-with-sound restrictions from
// silently blocking playback (hover alone doesn't count as a user gesture).
function setPreviewSoundState(unmuted) {
  if (!previewSoundBtn) return;
  previewSoundBtn.classList.toggle("is-unmuted", unmuted);
  previewSoundBtn.setAttribute("aria-pressed", unmuted ? "true" : "false");
}
function setMobileSoundState(unmuted) {
  if (!mpSoundBtn) return;
  mpSoundBtn.classList.toggle("is-unmuted", unmuted);
  mpSoundBtn.setAttribute("aria-pressed", unmuted ? "true" : "false");
}
if (previewSoundBtn) {
  previewSoundBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!activePreviewMedia) return;
    activePreviewMedia.muted = !activePreviewMedia.muted;
    setPreviewSoundState(!activePreviewMedia.muted);
  });
}
if (mpSoundBtn) {
  mpSoundBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!activeMobilePreviewMedia) return;
    activeMobilePreviewMedia.muted = !activeMobilePreviewMedia.muted;
    setMobileSoundState(!activeMobilePreviewMedia.muted);
  });
}

// Desktop-only: the circular ring's geometry. Mobile lays cards out in a
// flat horizontal strip instead (see layoutMobileStrip()) -- entirely
// different math, so it doesn't share this function.
function computeGeometry() {
  if (isMobile) return;
  const vw = window.innerWidth, vh = window.innerHeight;
  radius = RING_SCALE * Math.max(300, Math.min(vw * 0.32, vh * 0.55));
  // The center preview box was sized purely off viewport width (min(820px,
  // 64vw) in CSS), independent of the ring's own size -- the ring's radius
  // depends on BOTH vw and vh, so on narrower/shorter desktop windows the
  // box ends up disproportionately larger than the ring, swallowing most of
  // it visually and leaving too few cards actually reachable outside the
  // box. Tie the box's width to the ring's actual computed radius instead,
  // so the ratio between them stays consistent across window sizes.
  document.documentElement.style.setProperty("--ring-radius", radius + "px");
  const localY = radius * Math.cos(TILT * DEG);
  const depthZ = radius * Math.sin(TILT * DEG);
  yOffset = localY * (PERSPECTIVE / (PERSPECTIVE - depthZ));
  gsap.set(gallery, { x: 0, y: -yOffset });
}

// When a category is tapped in the marquee, only its cards take part in the
// strip -- the rest are parked off-screen (still in the DOM, just moved out
// of view) rather than rebuilt, so nothing about their video elements needs
// to be torn down. mobileFilter is the display name (CATEGORIES[].name);
// CATEGORY_MATCH maps it to the shorter string actually stored per-card.
function mobileVisibleItems() {
  if (!mobileFilter) return items;
  const match = CATEGORY_MATCH[mobileFilter];
  return items.filter((c) => c.project.category === match);
}

// Mobile: cards sit in index order along a single horizontal line, centered
// vertically in the strip's viewport. mobileCurrentScrollX is "how far
// scrolled" in pixels (0 = first visible card flush left); dragging moves
// it, inertia carries it, and it's clamped so you can't drag past the
// first/last visible card.
// Tracks which cards were actually playing as of the last layout pass, so
// ensureVideoSource()/attemptPlay() only fire once per card on the frame it
// BECOMES visible -- not on literally every frame forever (mobileTick()
// calls layoutMobileStrip() continuously, ~60/sec, even at rest). Calling
// .play() every single frame on cards that are already loading/playing was
// wasteful and, worse, could keep re-interrupting a video's own startup.
let mobilePlayingCards = new Set();
function layoutMobileStrip() {
  if (!isMobile) return;
  const rect = gallery.getBoundingClientRect();
  const stripH = rect.height || MOBILE_CARD_H + 88;
  const centerY = (stripH - MOBILE_CARD_H) / 2;
  const visible = mobileVisibleItems();
  const visibleSet = new Set(visible);
  visible.forEach((card, i) => {
    gsap.set(card.el, { x: i * MOBILE_STEP - mobileCurrentScrollX, y: centerY, rotationZ: 0 });
    gsap.set(card.cardEl, { rotationY: 0, opacity: 1 });
    // Only the SELECTED card gets the scale/shadow treatment (see
    // mobileHighlight), but the window only ever shows two cards at once --
    // both should actually be playing, not just the highlighted one, or the
    // second card just sits there showing its static poster forever.
    if (!mobilePlayingCards.has(card)) { ensureVideoSource(card); attemptPlay(card.media); }
  });
  for (const card of items) {
    if (!visibleSet.has(card)) {
      gsap.set(card.el, { x: -9999, y: -9999 });
      if (mobilePlayingCards.has(card) && card.media.src) card.media.pause();
    }
  }
  mobilePlayingCards = visibleSet;
}
// How far the strip can scroll: from "first visible card flush at the
// window's left edge" to "last visible card flush at the window's right
// edge" -- depends on the window's actual width and how many cards are
// currently visible (filtered or not), so it's computed fresh.
function mobileScrollMax() {
  const stripW = gallery.getBoundingClientRect().width || MOBILE_VISIBLE_W;
  const count = mobileVisibleItems().length;
  return Math.max(0, (count - 1) * MOBILE_STEP + MOBILE_CARD_W - stripW);
}

function angleOf(card) { return card.index * INC - 90 + ringRot + introOffset; }
function depthOpacity(rotZdeg) { const back = Math.cos(rotZdeg * DEG); return 1 - (back + 1) * 0.25; }

function updateRing() {
  if (isMobile) return;
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

// Ring cards stay lazy (no src) until hover, so at rest they'd show nothing.
// The poster is a small local JPEG frame grabbed from each video (public/
// posters/<slug>.jpg, same slug as the video filename) -- it costs one small
// image instead of the full video, and is replaced by real video the moment
// ensureVideoSource() assigns src on hover.
function posterFor(asset) {
  const filename = asset.src.split("/").pop();
  const slug = filename.replace(/\.mp4$/i, "");
  return `public/posters/${slug}.jpg`;
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
  if (opts.lazy) v.poster = posterFor(asset);
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
  if (isMobile) return;
  for (const card of items) {
    gsap.set(card.el, { xPercent: -50, yPercent: -50, transformOrigin: `50% ${radius}px`, rotationZ: angleOf(card) });
    gsap.set(card.cardEl, { rotationY: ROT_Y, x: 0, y: 0, z: 0, scale: 1, opacity: card.depth });
  }
}

let pendingHitCard, pendingHitTimer;
const HOVER_SETTLE_MS = 70;
// document.elementFromPoint() forces a synchronous layout/hit-test pass --
// on a page with 40 constantly 3D-transformed cards that's genuinely
// expensive, and a raw "mousemove" listener can fire many dozens of times
// per second during real, continuous mouse movement (as opposed to the
// discrete jumps used while testing this), which was saturating the main
// thread enough to starve video network/decode callbacks -- videos would
// simply never finish loading during active mouse movement in real usage,
// even though the exact same interaction tested as discrete steps always
// worked. Coalesce to at most one hit-test per animation frame (still up to
// ~60/sec, plenty responsive) instead of one per raw event.
let lastPointerX = null, lastPointerY = null, pointerRafQueued = false;
function processPointer() {
  pointerRafQueued = false;
  if (lastPointerX === null) return;
  applyParallax(lastPointerX, lastPointerY);
  // Freezing the WHOLE preview box while a project is active (an earlier
  // version of this) was wrong: the box is a big 16:9 rectangle sitting over
  // most of the ring's top arc, so most cards' hitboxes fall inside its
  // bounds -- freezing that whole area meant switching between projects
  // stopped working almost everywhere, not just near the sound button. The
  // sound button is the one actual pointer-events:auto spot inside the
  // otherwise pass-through box; only bail out for that (deliberately
  // enlarged) hit zone.
  const target = document.elementFromPoint(lastPointerX, lastPointerY);
  if (target && target.closest(".sound-toggle")) return;
  const hit = target && target.closest(".item");
  let card = hit ? hit._card : null;
  if (pinnedCard && previewImgWrap) {
    // Clicking a card pins it (see onRingClick) -- an explicit, deliberate
    // signal that's worth trusting completely, unlike a hover that merely
    // happens to pass over a card. Every card whose hitbox falls inside the
    // preview box's screen rect is visually hidden behind the (opaque)
    // preview anyway, so the user can't be intentionally aiming for one --
    // safe to protect the WHOLE box once pinned, not just a guessed corner.
    // A genuinely different, VISIBLE card outside the box still switches
    // normally below (and releases the pin -- see setActive).
    const r = previewImgWrap.getBoundingClientRect();
    const insideBox = lastPointerX >= r.left && lastPointerX <= r.right && lastPointerY >= r.top && lastPointerY <= r.bottom;
    if (insideBox) card = pinnedCard;
  } else if (activeCard && previewImgWrap) {
    // Unpinned (no click yet this session): lighter, best-effort protection
    // for casual hover-only use -- just the "hit nothing" case and a corner
    // near the button, not the whole box (that broke general ring-browsing
    // when nothing has been pinned -- see the git history on this block).
    const r = previewImgWrap.getBoundingClientRect();
    const insideBox = lastPointerX >= r.left && lastPointerX <= r.right && lastPointerY >= r.top && lastPointerY <= r.bottom;
    const CORNER = 130;
    const inCorner = insideBox && lastPointerX >= r.right - CORNER && lastPointerY >= r.bottom - CORNER;
    if (inCorner || (card === null && insideBox)) card = activeCard;
  }
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
function onPointerMove(e) {
  if (isMobile) return;
  lastPointerX = e.clientX; lastPointerY = e.clientY;
  if (!pointerRafQueued) { pointerRafQueued = true; requestAnimationFrame(processPointer); }
}
function setActive(card) {
  if (card === activeCard) return;
  const prev = activeCard; activeCard = card;
  if (prev) restoreCard(prev);
  // Reaching here with a card other than the pinned one only happens via a
  // genuinely different, visible ring card (processPointer already forces
  // pinned-card protection for anything inside the preview box) -- that's
  // the user deliberately browsing away, so the old pin is released rather
  // than fighting the switch they're asking for.
  if (pinnedCard && card && card !== pinnedCard) pinnedCard = null;
  if (card) { pullOut(card); setPreview(card); } else if (!pinnedCard) { clearPreview(); center.classList.remove("show-project"); }
}

// A click on a ring card pins it -- see the pinnedCard comment above and
// the protection logic in processPointer(). Clicking the already-pinned
// card again releases it (does nothing else; it's already showing).
function onRingClick(e) {
  if (isMobile) return;
  const target = document.elementFromPoint(e.clientX, e.clientY);
  if (target && target.closest(".sound-toggle")) return; // let the button's own click handler run
  const hit = target && target.closest(".item");
  const card = hit ? hit._card : null;
  if (!card) return;
  if (pinnedCard === card) { pinnedCard = null; return; }
  pinnedCard = card;
  if (card !== activeCard) setActive(card);
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
// Removing a <video> from the DOM does NOT stop an in-flight fetch or
// decode -- the element keeps loading in the background unless explicitly
// paused and its src cleared first. The preview video gets torn down and
// recreated on every single hover switch, so without this, browsing across
// many cards leaves a trail of orphaned videos still competing for network/
// decode resources, which can eventually starve out newer requests (most
// videos silently never rendering a frame).
function stopMedia(v) {
  if (!v) return;
  v.pause();
  v.removeAttribute("src");
  v.load();
}
function setPreview(card) {
  const oldVideo = previewImgWrap.querySelector("video");
  if (oldVideo) { stopMedia(oldVideo); oldVideo.remove(); }
  const media = createMedia(card.asset, { autoplay: true });
  previewImgWrap.prepend(media);
  previewCat.textContent = card.project.category; previewTitle.textContent = card.project.title;
  center.classList.add("show-project");
  gsap.fromTo(media, { opacity: 0.35 }, { opacity: 1, duration: 0.5 });
  activePreviewMedia = media;
  setPreviewSoundState(false);
}
// Opacity-fading the center box out (see the .show-project CSS toggle above)
// doesn't stop playback -- without this the previous project's audio would
// keep playing, inaudible-but-invisible, after the cursor leaves the ring.
function clearPreview() {
  const oldVideo = previewImgWrap.querySelector("video");
  if (oldVideo) { stopMedia(oldVideo); oldVideo.remove(); }
  activePreviewMedia = null;
  setPreviewSoundState(false);
}

// "Selected" is whichever of the two visible cards is nearest the window's
// own center -- with exactly two cards filling it, that's a dead-even tie
// at rest (both equidistant), and Math.round's up-on-.5 behavior always
// resolves it to the right-hand one. Nothing hinges on index 0 specifically
// being the initial highlight.
function nearestMobileCard() {
  const visible = mobileVisibleItems();
  if (!visible.length) return null;
  const stripW = gallery.getBoundingClientRect().width || MOBILE_VISIBLE_W;
  const idx = Math.round((mobileCurrentScrollX - MOBILE_CARD_W / 2 + stripW / 2) / MOBILE_STEP);
  return visible[Math.max(0, Math.min(visible.length - 1, idx))];
}
// Flat cards don't get the desktop pullOut()'s 3D translate (that math is
// built entirely around the ring's circular geometry) -- selection here is
// just "grow slightly + play", the same idea, simpler shape.
function mobileHighlight(card) {
  card.cardEl.classList.add("is-active");
  gsap.to(card.cardEl, { scale: MOBILE_SELECTED_SCALE, duration: MOBILE_TRANSITION, ease: "power2.out", overwrite: true });
  ensureVideoSource(card);
  attemptPlay(card.media);
}
function mobileUnhighlight(card) {
  card.cardEl.classList.remove("is-active");
  gsap.to(card.cardEl, { scale: 1, duration: MOBILE_TRANSITION, ease: "power2.out", overwrite: true });
  card.media.pause();
  if (card.media.readyState > 0) card.media.currentTime = 0;
}
function updateMobileSelection() {
  const card = nearestMobileCard();
  if (card === mobileSelectedCard) return;
  if (mobileSelectedCard) mobileUnhighlight(mobileSelectedCard);
  mobileSelectedCard = card;
  if (card) { mobileHighlight(card); updateMobilePreview(card); }
}
function updateMobilePreview(card) {
  mpCat.textContent = card.project.category; mpTitle.textContent = card.project.title;
  const oldVideo = mpImgWrap.querySelector("video");
  if (oldVideo) { stopMedia(oldVideo); oldVideo.remove(); }
  const media = createMedia(card.asset, { autoplay: true });
  mpImgWrap.prepend(media);
  gsap.fromTo(media, { opacity: 0.3 }, { opacity: 1, duration: MOBILE_TRANSITION, overwrite: true });
  activeMobilePreviewMedia = media;
  setMobileSoundState(false);
}

let mobileDragging = false, mobileVelocity = 0;
function mobileTick() {
  if (!mobileDragging) {
    mobileTargetScrollX += mobileVelocity;
    mobileVelocity *= 0.92;
    if (Math.abs(mobileVelocity) < 0.02) mobileVelocity = 0;
  }
  mobileTargetScrollX = Math.max(0, Math.min(mobileScrollMax(), mobileTargetScrollX));
  mobileCurrentScrollX += (mobileTargetScrollX - mobileCurrentScrollX) * 0.18;
  layoutMobileStrip(); updateMobileSelection();
  requestAnimationFrame(mobileTick);
}
function initMobile() {
  mobileCurrentScrollX = mobileTargetScrollX = 0;
  // The strip lives in a normally-scrolling page now (not a fixed
  // full-screen layer), so a vertical drag on it needs to fall through to
  // the page's own scroll instead of being eaten by the carousel.
  // touch-action:pan-y (see .mobile-ring-hitbox) lets the browser handle
  // vertical panning by default; this only steals the gesture for the
  // strip once it's clearly horizontal (past a small threshold), and
  // otherwise never calls preventDefault, so a vertical swipe scrolls the
  // page exactly like it would anywhere else.
  let startX = 0, startY = 0, lastX = 0, dragAxis = null;
  const AXIS_THRESHOLD = 6;
  ringHitbox.addEventListener("pointerdown", (e) => {
    mobileDragging = true; mobileVelocity = 0; dragAxis = null;
    startX = lastX = e.clientX; startY = e.clientY;
  });
  ringHitbox.addEventListener("pointermove", (e) => {
    if (!mobileDragging) return;
    if (dragAxis === null) {
      const totalX = e.clientX - startX, totalY = e.clientY - startY;
      if (Math.abs(totalX) > AXIS_THRESHOLD || Math.abs(totalY) > AXIS_THRESHOLD) {
        dragAxis = Math.abs(totalX) > Math.abs(totalY) ? "x" : "y";
        if (dragAxis === "x") { try { ringHitbox.setPointerCapture(e.pointerId); } catch (_) {} }
        else { mobileDragging = false; return; }
      }
    }
    if (dragAxis !== "x") return;
    e.preventDefault();
    const dx = e.clientX - lastX; lastX = e.clientX;
    mobileTargetScrollX = Math.max(0, Math.min(mobileScrollMax(), mobileTargetScrollX - dx * MOBILE_DRAG_SPEED));
    mobileVelocity = -dx * MOBILE_DRAG_SPEED;
  });
  const endDrag = (e) => { if (!mobileDragging) return; mobileDragging = false; dragAxis = null;
    try { if (ringHitbox.hasPointerCapture(e.pointerId)) ringHitbox.releasePointerCapture(e.pointerId); } catch (_) {} };
  ringHitbox.addEventListener("pointerup", endDrag);
  ringHitbox.addEventListener("pointercancel", endDrag);
  ringHitbox.addEventListener("wheel", (e) => {
    e.preventDefault();
    mobileTargetScrollX = Math.max(0, Math.min(mobileScrollMax(), mobileTargetScrollX + (e.deltaX || e.deltaY) * 0.6));
  }, { passive: false });
  setMobileFilter("AI Films"); // default view on first load, per request
  requestAnimationFrame(mobileTick);
}

// Folded into the same per-frame callback as processPointer() (see
// onPointerMove) rather than its own raw "mousemove" listener -- two
// separate listeners each reacting to every single mouse-move event was
// exactly the kind of redundant per-pixel work that was starving video
// loading during real (continuous, high-frequency) mouse movement.
function applyParallax(x, y) {
  const px = (x - window.innerWidth / 2) / (window.innerWidth / 2);
  const py = (y - window.innerHeight / 2) / (window.innerHeight / 2);
  gsap.to(gallery, { rotationX: TILT + py * PARALLAX, rotationY: -px * PARALLAX, duration: 1, ease: "power2.out", overwrite: "auto" });
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

// Mobile's flat strip has no room for labels floating around a ring, so the
// same category list runs instead as a continuously auto-scrolling ribbon
// between the strip and the footer. Two copies of the text back to back,
// animated -50% (see .mm-track in styles.css), is the standard seamless-
// marquee trick: the moment the first copy scrolls fully out of view, the
// second is sitting exactly where the first started.
function buildMobileMarquee() {
  const track = document.getElementById("mmTrack");
  if (!track) return;
  const half = CATEGORIES.map((c) => `<button type="button" class="mm-item" data-cat="${c.name}">${c.name}</button>`)
    .join('<span class="mm-sep"> • </span>') + '<span class="mm-sep"> • </span>';
  track.innerHTML = half + half; // two copies back to back for the seamless loop (see @keyframes mm-scroll)
  track.addEventListener("click", (e) => {
    const btn = e.target.closest(".mm-item");
    if (!btn) return;
    setMobileFilter(mobileFilter === btn.dataset.cat ? null : btn.dataset.cat);
  });
}

// Tapping a category in the marquee narrows the strip to just that
// category's cards (tapping the same one again clears it back to all) --
// the strip's own layout/scroll-bounds/selection logic all read from
// mobileVisibleItems(), so this only needs to update the filter and reset
// scroll position; layoutMobileStrip() handles parking the rest off-screen.
function setMobileFilter(cat) {
  mobileFilter = cat;
  document.querySelectorAll(".mm-item").forEach((el) => el.classList.toggle("is-active", el.dataset.cat === cat));
  if (mobileSelectedCard) { mobileUnhighlight(mobileSelectedCard); mobileSelectedCard = null; }
  mobileCurrentScrollX = mobileTargetScrollX = 0;
  layoutMobileStrip();
  updateMobileSelection();
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
    introOffset = 0; computeGeometry(); updateRing(); layoutMobileStrip();
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
  // The circular spin-in doesn't mean anything for a flat strip -- just
  // fade the cards in where layoutMobileStrip() already put them.
  if (isMobile) {
    gsap.fromTo(items.map((c) => c.cardEl), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.012 });
    return;
  }
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
  if (isMobile) { layoutMobileStrip(); return; }
  computeGeometry(); setupItems(); updateRing(); buildLabels(); ScrollTrigger.refresh();
}

function init() {
  initLoader();
  buildGallery();      // <-- runs for BOTH desktop AND mobile
  if (isMobile) {
    buildMobileMarquee();
    initMobile();
  } else {
    computeGeometry();
    setupItems();
    updateRing();
    gsap.set(gallery, { rotationX: TILT });
    buildLabels(); initScroll(); initCursor();
    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerleave", () => { clearTimeout(pendingHitTimer); pendingHitCard = null; setActive(null); });
    scene.addEventListener("click", onRingClick);
  }
  requestAnimationFrame(onResize);
  setTimeout(onResize, 300);
  window.addEventListener("load", onResize);
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(onResize, 150); });
  window.matchMedia(MOBILE_MQ).addEventListener("change", () => location.reload());
}

window.addEventListener("DOMContentLoaded", init);
