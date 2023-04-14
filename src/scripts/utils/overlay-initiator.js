import mediaQuery from './watch-media';

const OverlayInitiator = {
  drawer(button, overlay) {
    let menuToggle = false;

    button.addEventListener('click', () => {
      menuToggle = !menuToggle;
      if (mediaQuery.matches && menuToggle) {
        overlay.classList.add('active');
      } else {
        overlay.classList.remove('active');
      }
    });

    mediaQuery.addEventListener('change', () => {
      if (mediaQuery.matches && menuToggle) {
        overlay.classList.add('active');
      } else {
        overlay.classList.remove('active');
      }
    });
  },
};

export default OverlayInitiator;
