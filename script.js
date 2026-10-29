const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDWFBW-1Pr_ynI5FG6JO_X8TpUYMT89OpuxufqCPBFQR39zJcYikz4yn42ARMdltyH/exec";

const galleries = {
  engagement: [
    ["images/engagement-proposal.jpg", "The moment we said yes"],
    ["images/engagement-portrait.jpg", "A little look of forever"],
    ["images/engagement-ring.jpg", "One little promise"],
    ["images/engagement-family.jpg", "Our favourite people"],
    ["images/engagement-family-two.jpg", "Together with everyone we love"],
    ["images/engagement-candid.jpg", "A quiet little moment"],
    ["images/engagement-cake.jpg", "Cake, laughter & us"]
  ],
  wedding: [], reception: []
};

const photoGrid = document.querySelector("#photo-grid");
function showGallery(key) {
  const photos = galleries[key];
  if (!photos.length) {
    if (key === "reception") {
      photoGrid.innerHTML = '<div class="no-photos reception-note"><strong>The reception album is saving its sparkle ✨</strong>Our favourite moments are on the way. Check back after the celebrations!</div>';
      return;
    }
    const names = { wedding: "Wedding", reception: "Reception" };
    photoGrid.innerHTML = `<div class="no-photos"><strong>${names[key]} photos are on their way</strong>Add your album image URLs in <code>script.js</code> when you’re ready.</div>`;
    return;
  }
  photoGrid.innerHTML = photos.map(([src, caption]) => `<div class="photo-card"><img src="${src}" alt="${caption}" loading="lazy"><span>${caption}</span></div>`).join("");
}
showGallery("engagement");
document.querySelectorAll(".gallery-tab").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".gallery-tab").forEach(tab => tab.classList.remove("active"));
  button.classList.add("active"); showGallery(button.dataset.gallery);
}));

const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const open = document.querySelector(".nav-links").classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false");
}));

// Each invitation uses a private token in ?g=TOKEN. The server records its first
// open once; repeat opens and refreshes for the same token do not add rows.
const guestToken = new URLSearchParams(location.search).get("g");
if (SCRIPT_URL && guestToken && /^[a-zA-Z0-9_-]{8,80}$/.test(guestToken)) {
  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type: "visit", token: guestToken, page: location.pathname, referrer: document.referrer || "direct" })
  }).catch(() => {});
}
