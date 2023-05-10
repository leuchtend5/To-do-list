import CreateNewProject from '../data/create-new-project';
import CollectAllProjects from '../data/collect-all-projects';
import '../components/new-project';

const AddProjectHelper = {
  init({
    addButton,
    container,
    counter,
    projectForm,
    overlay,
    confirmButton,
    cancelButton,
    userInput,
  }) {
    let totalProject = 0;

    this._buttonDisable(confirmButton);

    addButton.addEventListener('click', () => {
      userInput.value = '';

      // to delay the autofocus
      // so the autofocus will active after element inserted to DOM
      setTimeout(() => {
        userInput.focus();
      }, 0);

      this._newProjectFormActive(projectForm, overlay);
    });

    cancelButton.addEventListener('click', () => {
      this._newProjectFormOff(projectForm, overlay);
    });

    confirmButton.addEventListener('click', () => {
      if (totalProject < 5) {
        const project = new CreateNewProject(userInput.value);
        CollectAllProjects.addNewProject(project);
        // localStorage.setItem('projects', JSON.stringify(CollectAllProjects.allProjects));

        this._addNewProjectFunction({
          container,
          counter,
          value: project,
        });

        totalProject += 1;
        counter.textContent = `(${totalProject}/5)`;

        // back to default UI
        this._newProjectFormOff(projectForm, overlay);
        this._buttonDisable(confirmButton);
      }
    });

    userInput.addEventListener('input', () => {
      if (userInput.value !== '') {
        this._buttonEnable(confirmButton);
      } else {
        this._buttonDisable(confirmButton);
      }
    });
  },

  _newProjectFormActive(projectForm, overlay) {
    projectForm.classList.add('active');
    overlay.classList.add('active');
    overlay.style.zIndex = '24';
  },

  _newProjectFormOff(projectForm, overlay) {
    projectForm.classList.remove('active');
    overlay.classList.remove('active');
    overlay.style.zIndex = '3';
  },

  _buttonDisable(button) {
    button.disabled = true;
    button.classList.add('disable');
  },

  _buttonEnable(button) {
    button.disabled = false;
    button.classList.remove('disable');
  },

  _addNewProjectFunction({ container, value }) {
    const newProject = document.createElement('new-project');
    newProject.projectData = value;
    container.appendChild(newProject);
  },
};

export default AddProjectHelper;
