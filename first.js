

function fullScreen(event) {
    if (!event.target.hasAttribute('data-fullscreen')) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

window.addEventListener('click', fullScreen);
window.addEventListener( 'hashchange', fullScreen , false);