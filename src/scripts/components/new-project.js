import { LitElement, html } from 'lit';
import CollectAllProjects from '../data/collect-all-projects';
import CollectAllTask from '../data/collect-all-tasks';
import ProjectCounter from '../utils/project-counter';

class NewProject extends LitElement {
  constructor() {
    super();
  }

  // DISABLE SHADOW DOM
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this._editProject();
    this._deleteProject();
  }

  set projectData(data) {
    this._oldProjectName = data.projectName;
    this._newProjectName = data.projectName;
    this._projectId = data.id;
  }

  get getProjectName() {
    return this._oldProjectName;
  }

  _limitProjectName() {
    if (this._newProjectName.length > 13) {
      this._newProjectName = `${this._newProjectName.substring(0, 13)}...`;
      return this._newProjectName;
    }
    return this._newProjectName;
  }

  _editProject() {
    const editBtn = this.querySelector('.edit-btn');

    editBtn.addEventListener('click', () => {
      console.log(CollectAllProjects.allProjects);
    });
  }

  _deleteProject() {
    const deleteBtn = this.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', () => {
      // also delete project's task in CollectAllTask Class
      const taskInProject = CollectAllProjects.findProjectById(this._projectId).allTasks;
      taskInProject.forEach((task) => CollectAllTask.deleteTask(task.id));

      CollectAllProjects.deleteProject(this._projectId);

      this.remove();
      ProjectCounter.init();
    });
  }

  render() {
    return html`
      <a href="#/project/${this._projectId}">
        <div class="group-name">
          <span>⏺</span>
          <p class="project-name">${this._limitProjectName()}</p>
        </div>
        <span class="total-tasks"></span>
        <div class="edit-project">
          <button class="edit-btn">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </a>
    `;
  }
}

customElements.define('new-project', NewProject);
