
const backToTop = document.querySelector('#back-to-top');

const scroll = window.requestAnimationFrame ||
function(callback){ window.setTimeout(callback, 1000/60)};

function isScrolled() {
  return window.scrollY > 200;
}

function loop() {

  if (isScrolled()) {
    console.log('is scrolled');
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  scroll(loop);
}

loop();