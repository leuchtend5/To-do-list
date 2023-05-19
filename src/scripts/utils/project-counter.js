import CollectAllProjects from '../data/collect-all-projects';

const ProjectCounter = {
  init() {
    const count = CollectAllProjects.allProjects.length - 1;

    this._updateUI(count);
  },

  _updateUI(count) {
    const projectCounter = document.querySelector('.project-counter');

    projectCounter.textContent = `(${count}/5)`;
  },
};

export default ProjectCounter;
