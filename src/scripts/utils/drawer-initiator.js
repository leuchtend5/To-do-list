const DrawerInitiator = {
  init({ button, drawer, projectName }) {
    const overlay = document.querySelector('.overlay');
    const content = document.querySelector('.content');
    let menuToggle = true;

    button.addEventListener('click', (event) => {
      if (menuToggle) {
        this._toggleDrawer(event, drawer);
        overlay.classList.add('active');
        content.classList.add('active');
        menuToggle = !menuToggle;
      } else {
        this._closeDrawer(event, drawer);
        overlay.classList.remove('active');
        content.classList.remove('active');
        menuToggle = !menuToggle;
      }
    });

    this._limitProjectName(projectName);
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.add('active');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
  },

  _limitProjectName(projectName) {
    projectName.forEach((list) => {
      if (list.textContent.length > 20) {
        list.textContent = `${list.textContent.substring(0, 20)}...`;
      }
    });
  },
};

export default DrawerInitiator;
