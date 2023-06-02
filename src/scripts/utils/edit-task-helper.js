import { format } from 'date-fns';
import '../components/task-input-box';
// import CollectAllProjects from '../data/collect-all-projects';
import TaskCounter from './task-counter';
import TaskPriorityColor from './task-color';
import TaskStorage from '../data/task-storage';
// import ProjectStorage from '../data/project-storage';
// import LocalStorage from './local-storage';

const EditTaskHelper = {
  async init({ container, data }) {
    // this._findSelectedTask(data);
    this._selectedTask = data.target;

    // create input dialog box when user click edit-btn
    const taskInputBox = document.createElement('task-input');
    taskInputBox.taskContainer = container;
    this._selectedTask.insertAdjacentElement('afterend', taskInputBox);

    // hide the task and show the dialog box
    this._selectedTask.style.display = 'none';

    await customElements.whenDefined('task-input');

    const name = document.querySelector('#task-name');
    const date = document.querySelector('#due-date');
    const description = document.querySelector('#description');
    const currentPriority = document.querySelector('.current-flag > p');
    const addBtn = document.querySelector('.add-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const saveBtn = document.querySelector('.save-btn');
    const { id } = data.detail.task;

    addBtn.style.display = 'none';
    saveBtn.style.display = 'block';

    // const foundProject = CollectAllProjects.findProjectByName(title);
    // const foundProject = ProjectStorage.getProjectByName(title);
    // const foundTask = foundProject.findTask(taskId);

    this._existedData({
      name,
      date,
      description,
      currentPriority,
      data: data.detail.task,
    });

    this._cancelFunction(cancelBtn);
    this._saveTask({
      saveBtn,
      id,
      name,
      date,
      description,
      currentPriority,
    });
  },

  // _findSelectedTask(data) {
  //   const allTasks = document.querySelectorAll('user-task');
  //   const newArray = Array.from(allTasks);
  //   const index = newArray.findIndex((task) => task._taskId === data.detail.taskId);
  //   this._selectedTask = allTasks[index];

  //   allTasks.forEach((task) => {
  //     task.style.display = 'block';
  //   });
  // },

  _cancelFunction(button) {
    button.addEventListener('click', () => {
      this._selectedTask.style.display = 'block';
    });
  },

  _existedData({ name, date, description, currentPriority, data }) {
    name.value = data.name;
    date.value = data.date;
    description.value = data.description;
    currentPriority.innerHTML = data.priorityFlag;
  },

  _saveTask({ saveBtn, id, name, date, description, currentPriority }) {
    saveBtn.addEventListener('click', () => {
      TaskStorage.setNewTaskName(id, name.value);
      TaskStorage.setNewTaskDate(id, date.value);
      TaskStorage.setNewTaskDescription(id, description.value);
      TaskStorage.setNewTaskPriorityFlag(id, currentPriority.innerHTML);

      this._updateTaskUI({
        name,
        date,
        description,
        currentPriority,
      });
    });
  },

  _updateTaskUI({ name, date, description, currentPriority }) {
    const nameElement = this._selectedTask.querySelector('.task-input-name');
    const dateElement = this._selectedTask.querySelector('.task-due-date');
    const descriptionElement = this._selectedTask.querySelector('.task-desc');
    const dateContainer = this._selectedTask.querySelector('.task-date');

    nameElement.textContent = name.value;
    descriptionElement.textContent = description.value;

    if (date.value === '') {
      dateContainer.style.display = 'none';
    } else {
      dateContainer.style.display = 'flex';
      dateElement.textContent = this._formattedDate(date);
    }

    TaskPriorityColor(currentPriority.innerHTML, this._selectedTask);

    this._selectedTask.style.display = 'block';

    TaskCounter.init();
    this._removeTaskInputBox();
  },

  _formattedDate(date) {
    if (date.value !== '') {
      const newDate = date.value.replace(/-/g, ', ');
      const newFormatDate = format(new Date(newDate), 'dd MMMM yyyy');
      return newFormatDate;
    }
    return date.value;
  },

  _removeTaskInputBox() {
    const existingTaskInput = document.querySelector('task-input');
    if (existingTaskInput) {
      existingTaskInput.remove();
    }
  },
};

export default EditTaskHelper;
