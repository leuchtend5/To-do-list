const DrawerInitiator = {
  init({ button, drawer }) {
    const content = document.querySelector('.content');
    let menuToggle = true;

    button.addEventListener('click', () => {
      if (menuToggle) {
        this._toggleDrawer(drawer);
        content.classList.add('active');
        menuToggle = !menuToggle;
      } else {
        this._closeDrawer(drawer);
        content.classList.remove('active');
        menuToggle = !menuToggle;
      }
    });
  },

  _toggleDrawer(drawer) {
    drawer.classList.add('active');
  },

  _closeDrawer(drawer) {
    drawer.classList.remove('active');
  },
};

export default DrawerInitiator;
