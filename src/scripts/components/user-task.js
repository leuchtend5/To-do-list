import { LitElement, html } from 'lit';
import CollectAllProjects from '../data/collect-all-projects';

class UserTask extends LitElement {
  constructor() {
    super();
  }

  // DISABLE SHADOW DOM
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this._deleteTask();
    this._dateUI();
  }

  set taskData(data) {
    this._taskId = data.id;
    this._taskName = data.name;
    this._taskDate = data.date;
    this._taskDescription = data.description;
  }

  _deleteTask() {
    this.querySelector('.delete-btn').addEventListener('click', () => {
      // find project that contain the target ID
      const findProject = CollectAllProjects.allProjects.find((project) =>
        project.allTasks.some((task) => task.id === this._taskId),
      );
      findProject.deleteTask(this._taskId);
      this.remove();
    });
  }

  _dateUI() {
    const userTaskDueDate = this.querySelector('.task-due-date');
    const taskDateContainer = this.querySelector('.task-date');

    if (userTaskDueDate.textContent === '') {
      taskDateContainer.style.display = 'none';
    } else {
      taskDateContainer.style.display = 'flex';
    }
  }

  render() {
    return html`
      <div class="task-wrapper">
        <span>⏺</span>
        <div>
          <p>${this._taskName}</p>
          <p class="task-desc">${this._taskDescription}</p>
          <div class="task-date">
            <i class="fa-regular fa-calendar"></i>
            <p class="task-due-date">${this._taskDate}</p>
          </div>
          <div class="edit-panel">
            <button class="edit-btn">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete-btn">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('user-task', UserTask);
