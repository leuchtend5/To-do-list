import { LitElement, html } from 'lit';
import ProjectCounter from '../utils/project-counter';
import ProjectStorage from '../data/project-storage';
import TaskStorage from '../data/task-storage';

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

    // close the task input box when user click a project (this)
    this.addEventListener('click', () => {
      const taskInputBox = document.querySelector('task-input');
      const addTask = document.querySelector('add-task');
      if (taskInputBox) {
        taskInputBox.remove();
        addTask.style.display = 'flex';
      }

      const userTask = document.querySelectorAll('user-task');
      userTask.forEach((task) => {
        task.style.display = 'block';
      });
    });
  }

  set projectData(data) {
    this._oldProjectName = data.projectName;
    this._newProjectName = data.projectName;
    this._projectId = data.id;
  }

  get projectName() {
    return this._oldProjectName;
  }

  get projectId() {
    return this._projectId;
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
      const userTask = document.querySelectorAll('user-task');
      userTask.forEach((task) => {
        task.style.display = 'block';
      });

      const editEvent = new CustomEvent('edit-project', {
        bubbles: true,
        composed: true,
        detail: {
          project: ProjectStorage.getProjectById(this._projectId),
        },
      });

      this.dispatchEvent(editEvent);
    });
  }

  _deleteProject() {
    const deleteBtn = this.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', () => {
      TaskStorage.getAllTasks().forEach((task) => {
        if (task.projectId === this._projectId) {
          TaskStorage.deleteTask(task.id);
        }
      });

      ProjectStorage.deleteProject(this._projectId);

      this.remove();
      ProjectCounter.init();
      location.reload();
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
