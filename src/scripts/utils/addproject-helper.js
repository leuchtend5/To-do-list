import CollectProjectData from '../data/collect-project-data';
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
    const projects = new CollectProjectData();

    this._buttonDisable(confirmButton);

    addButton.addEventListener('click', () => {
      userInput.value = '';
      this._newProjectFormActive(projectForm, overlay);
    });

    cancelButton.addEventListener('click', () => {
      this._newProjectFormOff(projectForm, overlay);
    });

    confirmButton.addEventListener('click', () => {
      if (totalProject < 5) {
        projects.addNewProject(userInput.value);
        console.log(projects.getAllProjects());
        this._addNewProjectFunction({
          container,
          counter,
          value: userInput.value,
        });

        totalProject += 1;
        counter.textContent = `(${totalProject}/5)`;

        this._newProjectFormOff(projectForm, overlay);
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
    overlay.style.zIndex = '11';
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
    newProject.newProjectName = value;
    container.appendChild(newProject);
  },
};

export default AddProjectHelper;
