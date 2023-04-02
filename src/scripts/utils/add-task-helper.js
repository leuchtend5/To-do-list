const addTaskHelper = {
  init({ addTask, inputBox, priority }) {
    this._addTaskToggle({
      addTask,
      inputBox,
    });

    this._priorityToggle(priority);
  },

  _addTaskToggle({ addTask, inputBox }) {
    const cancelBtn = document.querySelector('.cancel-btn');

    addTask.addEventListener('click', () => {
      inputBox.classList.add('active');
      addTask.classList.add('nonactive');
    });

    cancelBtn.addEventListener('click', () => {
      addTask.classList.remove('nonactive');
      inputBox.classList.remove('active');
    });
  },

  _priorityToggle(priority) {
    let flagToggle = true;
    const flagDropdown = document.querySelector('.flag-dropdown');

    priority.addEventListener('click', () => {
      if (flagToggle) {
        flagDropdown.classList.add('active');
        flagToggle = !flagToggle;
      } else {
        flagDropdown.classList.remove('active');
        flagToggle = !flagToggle;
      }
    });
  },
};

export default addTaskHelper;
