let cursorDot = document.querySelector(".cursor-dot");
let cursorOutline = document.querySelector(".cursor-outline");

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
function moveCursor(e) {
  let posX = e.clientX;
  let posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" }
  );
}

if (!isTouchDevice()) {
  window.addEventListener("mousemove", moveCursor);
} else {
  cursorDot.style.display = "none";
  cursorOutline.style.display = "none";
  document.body.style.cursor = "auto";
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 900) {
    document.querySelector(".hero-screen").classList.add("assemble");
  } else {
    document.querySelector(".hero-screen").classList.remove("assemble");
  }
});





window.addEventListener("scroll", () => {
  if (window.scrollY > 900) {
    document.querySelector(".hero-screen").classList.add("assemble");
  } else {
    document.querySelector(".hero-screen").classList.remove("assemble");
  }
});