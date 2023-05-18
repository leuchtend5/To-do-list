import { LitElement, html } from 'lit';
import { format } from 'date-fns';
import CollectAllProjects from '../data/collect-all-projects';
import CollectAllTask from '../data/collect-all-tasks';
import TaskCounter from '../utils/task-counter';
// import './task-input-box';

class UserTask extends LitElement {
  constructor() {
    super();
  }

  // disable shadow DOM
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this._editTask();
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
    const deleteBtn = this.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', () => {
      // delete task from project instance
      // find project that contain the task ID
      const findTask = CollectAllProjects.allProjects.find((project) =>
        project.allTasks.some((task) => task.id === this._taskId),
      );
      findTask.deleteTask(this._taskId);

      // delete task from allTask static class
      CollectAllTask.deleteTask(this._taskId);

      this.remove();
      TaskCounter.init();
    });
  }

  _editTask() {
    const editBtn = this.querySelector('.edit-btn');

    editBtn.addEventListener('click', () => {
      const editEvent = new CustomEvent('edit-task', {
        bubbles: true,
        composed: true,
        detail: {
          taskId: this._taskId,
          taskName: this._taskName,
          taskDate: this._taskDate,
          taskDescription: this._taskDescription,
        },
      });
      this.dispatchEvent(editEvent);
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

  _formattedDate() {
    if (this._taskDate !== '') {
      const newDate = this._taskDate.replace(/-/g, ', ');
      const newFormatDate = format(new Date(newDate), 'dd MMMM yyyy');
      return newFormatDate;
    }
    return this._taskDate;
  }

  render() {
    return html`
      <div class="task-wrapper">
        <span>⏺</span>
        <div>
          <p class="task-input-name">${this._taskName}</p>
          <p class="task-desc">${this._taskDescription}</p>
          <div class="task-date">
            <i class="fa-regular fa-calendar"></i>
            <p class="task-due-date">${this._formattedDate()}</p>
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
