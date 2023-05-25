import { format } from 'date-fns';
import '../components/task-input-box';
import CollectAllProjects from '../data/collect-all-projects';
import TaskCounter from './task-counter';

const EditTaskHelper = {
  async init({ container, data, title }) {
    this._findSelectedTask(data);

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
    const { taskId } = data.detail;

    addBtn.style.display = 'none';
    saveBtn.style.display = 'block';

    const foundProject = CollectAllProjects.findProjectByName(title);
    const foundTask = foundProject.findTask(taskId);

    this._existedData({
      name,
      date,
      description,
      currentPriority,
      data: foundTask,
    });

    this._cancelFunction(cancelBtn);
    this._saveTask({
      saveBtn,
      data: foundTask,
      name,
      date,
      description,
      currentPriority,
    });
  },

  _findSelectedTask(data) {
    const allTasks = document.querySelectorAll('user-task');
    const newArray = Array.from(allTasks);
    const index = newArray.findIndex((task) => task._taskId === data.detail.taskId);
    this._selectedTask = allTasks[index];

    allTasks.forEach((task) => {
      task.style.display = 'block';
    });
  },

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

  _saveTask({ saveBtn, data, name, date, description, currentPriority }) {
    saveBtn.addEventListener('click', () => {
      data.setTaskName(name.value);
      data.setTaskDate(date.value);
      data.setTaskDescription(description.value);
      data.setPriorityFlag(currentPriority.innerHTML);

      this._updateTaskUI({
        name,
        date,
        description,
      });
    });
  },

  _updateTaskUI({ name, date, description }) {
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
