import { LitElement, html } from 'lit';
import { format } from 'date-fns';
import TaskCounter from '../utils/task-counter';
import TaskPriorityColor from '../utils/task-color';
import TaskStorage from '../data/task-storage';
// import ProjectStorage from '../data/project-storage';

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
    TaskPriorityColor(this._currentFlag, this);
    this._completeTask();
  }

  set taskData(data) {
    this._taskId = data.id;
    this._taskName = data.name;
    this._taskDate = data.date;
    this._taskDescription = data.description;
    this._currentFlag = data.priorityFlag;
  }

  _completeTask() {
    const completeBtn = this.querySelector('.fa-circle');

    completeBtn.addEventListener('click', () => {
      // const foundTask = CollectAllTask.findTaskById(this._taskId);
      // foundTask.setTaskStatus(true);

      // save new task status in project storage
      // const foundTask = ProjectStorage.getTaskById(this._taskId);
      // console.log(foundTask);
      TaskStorage.setNewTaskStatus(this._taskId, true);

      this.remove();
      TaskCounter.init();
    });
  }

  _deleteTask() {
    const deleteBtn = this.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', () => {
      // delete task from project instance
      // find project that contain the task ID
      // const foundTask = CollectAllProjects.allProjects.find((project) =>
      //   project.allTasks.some((task) => task.id === this._taskId),
      // );
      // foundTask.deleteTask(this._taskId);

      // delete task from allTask static class
      // CollectAllTask.deleteTask(this._taskId);
      // LocalStorage.saveAllTasks(CollectAllTask.allTasks);
      // LocalStorage.saveAllProjects(CollectAllProjects.allProjects);

      TaskStorage.deleteTask(this._taskId);
      this.remove();
      TaskCounter.init();
    });
  }

  _editTask() {
    const editBtn = this.querySelector('.edit-btn');

    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const editEvent = new CustomEvent('edit-task', {
        bubbles: true,
        composed: true,
        detail: {
          // taskId: this._taskId,
          // taskName: this._taskName,
          // taskDate: this._taskDate,
          // taskDescription: this._taskDescription,
          task: TaskStorage.getTaskById(this._taskId),
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
        <span><i class="fa-sharp fa-regular fa-circle"></i></span>
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
