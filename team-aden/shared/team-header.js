(() => {
  const header=document.getElementById('aden-team-header');
  if(!header) return;
  const btn=header.querySelector('.team-menu-toggle');
  const nav=header.querySelector('.team-nav');
  if(btn&&nav){
    btn.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open));});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');}));
    window.addEventListener('resize',()=>{if(innerWidth>820){nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');}});
  }
})();

/* =========================
   공용 SCROLL TO TOP
========================= */

const teamScrollTop = document.createElement("button");

teamScrollTop.className = "team-scroll-top";
teamScrollTop.type = "button";
teamScrollTop.innerHTML = `
  <svg
    class="team-scroll-arrow"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M12 19V5M6 11l6-6 6 6"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;
teamScrollTop.setAttribute("aria-label", "맨 위로 이동");

document.body.appendChild(teamScrollTop);


/* 일정 이상 내려가면 버튼 표시 */
function updateScrollTopButton() {

  if (window.scrollY > 300) {
    teamScrollTop.classList.add("show");
  } else {
    teamScrollTop.classList.remove("show");
  }

}

window.addEventListener(
  "scroll",
  updateScrollTopButton,
  { passive: true }
);


/* 버튼 클릭 → 맨 위로 */
teamScrollTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

updateScrollTopButton();