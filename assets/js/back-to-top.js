const backToTop = document.querySelector("#back-to-top");
const downloadThisGuide = document.querySelector("#download-this-guide");

const scroll =
  window.requestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

function isScrolled() {
  return window.scrollY > 500;
}

function loop() {
  if (isScrolled()) {
    backToTop.classList.add("visible");
    downloadThisGuide.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
    downloadThisGuide.classList.remove("visible");
  }

  scroll(loop);
}

backToTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo(0, 0);
});

loop();
