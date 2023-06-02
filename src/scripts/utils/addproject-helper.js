import CreateNewProject from '../data/create-new-project';
// import CollectAllProjects from '../data/collect-all-projects';
import ProjectCounter from './project-counter';
import ProjectStorage from '../data/project-storage';
import '../components/new-project';
import TaskCounter from './task-counter';

const AddProjectHelper = {
  init({ addButton, container, projectForm, overlay, confirmButton, cancelButton, userInput }) {
    this._buttonDisable(confirmButton);

    const formTitle = document.querySelector('.add-project-form p');
    const saveProjectBtn = document.querySelector('.save-project-btn');

    // create a let variable to save the result from "event listener"
    let selectedProject;

    addButton.addEventListener('click', () => {
      userInput.value = '';

      // to delay the autofocus
      // so the autofocus will active after element inserted to DOM
      setTimeout(() => {
        userInput.focus();
      }, 0);

      this._newProjectFormActive(projectForm, overlay);
      formTitle.textContent = 'Add New Project';
      saveProjectBtn.style.display = 'none';
      confirmButton.style.display = 'block';
    });

    // removing inbox project
    // and iterate other project into our web
    const projectList = ProjectStorage.getAllProjects();
    projectList.splice(0, 1);
    projectList.forEach((project) => {
      this._addNewProjectFunction({
        container,
        value: project,
      });
    });
    // ProjectStorage.getAllProjects().forEach((project) => {
    //   this._addNewProjectFunction({
    //     container,
    //     value: project,
    //   });
    // });

    cancelButton.addEventListener('click', () => {
      this._newProjectFormOff(projectForm, overlay);
    });

    confirmButton.addEventListener('click', () => {
      if (ProjectStorage.getAllProjects().length < 6) {
        const project = new CreateNewProject(userInput.value);
        ProjectStorage.addNewProject(project);
        // CollectAllProjects.addNewProject(project);
        // LocalStorage.saveAllProjects(CollectAllProjects.allProjects);
        this._addNewProjectFunction({
          container,
          value: ProjectStorage.getProjectById(project.id),
        });
        // this._addNewProjectFunction({
        //   container,
        //   value: LocalStorage.getProject(project.id),
        // });

        ProjectCounter.init();

        // back to default UI
        this._newProjectFormOff(projectForm, overlay);
        this._buttonDisable(confirmButton);
      }
    });

    userInput.addEventListener('input', () => {
      if (userInput.value !== '') {
        this._buttonEnable(confirmButton);
        this._buttonEnable(saveProjectBtn);
      } else {
        this._buttonDisable(confirmButton);
        this._buttonDisable(saveProjectBtn);
      }
    });

    container.addEventListener('edit-project', (e) => {
      this._newProjectFormActive(projectForm, overlay);

      formTitle.textContent = 'Change Project Name';

      saveProjectBtn.style.display = 'block';
      confirmButton.style.display = 'none';

      userInput.value = e.detail.project.projectName;

      // saving the data to variable that I created
      selectedProject = e;
    });

    saveProjectBtn.addEventListener('click', () => {
      // const foundProject = CollectAllProjects.findProjectById(selectedProject.detail.projectId);
      // foundProject.setProjectName(userInput.value);
      // LocalStorage.saveAllProjects(CollectAllProjects.allProjects);

      // const foundProject = ProjectStorage.getProjectById(selectedProject.detail.project.id);
      ProjectStorage.saveNewProjectName(selectedProject.detail.project.id, userInput.value);

      this._newProjectFormOff(projectForm, overlay);
      this._buttonDisable(saveProjectBtn);

      this._updateProjectNameFunction({
        projectElement: selectedProject.target,
        value: ProjectStorage.getProjectById(selectedProject.detail.project.id),
        container,
      });
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

  _updateProjectNameFunction({ projectElement, value, container }) {
    const title = document.querySelector('.menu-title');
    const newProject = document.createElement('new-project');
    newProject.projectData = value;
    title.textContent = value.projectName;
    container.replaceChild(newProject, projectElement);
    TaskCounter.init();
  },
};

export default AddProjectHelper;
