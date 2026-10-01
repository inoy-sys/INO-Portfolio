/* =========================================================
   01. Mobile Navigation
   ========================================================= */
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "메뉴 닫기" : "메뉴 열기"
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "메뉴 열기");
    });
  });
}

/* =========================================================
   02. Reset Navigation When Returning To Desktop
   ========================================================= */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mainNav && menuButton) {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");
  }
});

/* =========================================================
   03. Close Mobile Navigation With ESC
   ========================================================= */
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    mainNav &&
    menuButton &&
    mainNav.classList.contains("open")
  ) {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");
  }
});

/* =========================================================
   04. VISIT - Leaflet Store Map
   ========================================================= */
const visitMapElement = document.getElementById("visit-map");

if (visitMapElement && typeof L !== "undefined") {
  const storePosition = [35.172452639308, 129.1311359262];

  const visitMap = L.map("visit-map", {
    scrollWheelZoom: false
  }).setView(storePosition, 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(visitMap);

  const marker = L.marker(storePosition).addTo(visitMap);

  marker.bindPopup(`
    <strong>ADEN Boulangerie Centum SH Valley</strong><br>
    부산광역시 해운대구 센텀동로 35<br>
    센텀SH밸리 1층 101-1호
  `).openPopup();

  setTimeout(() => visitMap.invalidateSize(), 150);
}
