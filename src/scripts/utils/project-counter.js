import ProjectStorage from '../data/project-storage';

const ProjectCounter = {
  init() {
    const count = ProjectStorage.getAllProjects().length - 1;

    this._updateUI(count);
  },

  _updateUI(count) {
    const projectCounter = document.querySelector('.project-counter');

    projectCounter.textContent = `(${count}/5)`;
  },
};

export default ProjectCounter;
