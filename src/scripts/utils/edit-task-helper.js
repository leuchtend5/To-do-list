import '../components/task-input-box';

const EditTaskHelper = {
  async init(container, data) {
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
    const addBtn = document.querySelector('.add-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    this._saveNewData({
      name,
      date,
      description,
      data,
    });

    this._cancelFunction(cancelBtn);

    this._settingAddBtnUI(addBtn);
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

  _saveNewData({ name, date, description, data }) {
    name.value = data.detail.taskName;
    date.value = data.detail.taskDate;
    description.value = data.detail.taskDescription;
  },

  _settingAddBtnUI(addBtn) {
    addBtn.textContent = 'Save';
    addBtn.disabled = false;
    addBtn.classList.remove('disable');
  },
};

export default EditTaskHelper;
