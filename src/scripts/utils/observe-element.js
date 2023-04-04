const ObserveElement = {
  observeHeaderHeight(element) {
    document.documentElement.style.setProperty('--top-header', `${element.offsetHeight}px`);
  },

  observeTitleHeight(element) {
    document.documentElement.style.setProperty('--top-title', `${element.offsetHeight}px`);
  },

  observeTitleWidth(element) {
    document.documentElement.style.setProperty('--width-title', `${element.offsetWidth}px`);
  },
};

export default ObserveElement;
