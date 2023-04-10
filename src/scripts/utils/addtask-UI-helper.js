import TaskData from '../data/add-task-data';
import TaskDataInInbox from '../data/task-data-inbox';

const addTaskUIHelper = {
  init({ addTask, inputBox, priority }) {
    const cancelBtn = document.querySelector('.cancel-btn');
    const addBtn = document.querySelector('.add-btn');
    const flagDropdown = document.querySelector('.flag-dropdown');
    const mediaQuery = window.matchMedia('(max-width: 680px)');

    this._addTaskToggle({
      addTask,
      inputBox,
      cancelBtn,
    });

    this._priorityToggle(priority, flagDropdown);

    this._updateUI({
      cancelBtn,
      addBtn,
      mediaQuery,
    });

    this._watchMediaChange({ mediaQuery, cancelBtn, addBtn });

    if (TaskData.userInputTaskData().taskName === '') {
      addBtn.disabled = true;
    } else {
      this._addTaskButton(addBtn);
    }
  },

  _addTaskToggle({ addTask, inputBox, cancelBtn }) {
    addTask.addEventListener('click', () => {
      inputBox.classList.add('active');
      addTask.classList.add('nonactive');
    });

    cancelBtn.addEventListener('click', () => {
      addTask.classList.remove('nonactive');
      inputBox.classList.remove('active');
    });
  },

  _priorityToggle(priority, flagDropdown) {
    let flagToggle = true;

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

  _updateUI({ cancelBtn, addBtn, mediaQuery }) {
    if (mediaQuery.matches) {
      cancelBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
      addBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    } else {
      cancelBtn.textContent = 'Cancel';
      addBtn.textContent = 'Add Task';
    }
  },

  _watchMediaChange({ mediaQuery, cancelBtn, addBtn }) {
    mediaQuery.addEventListener('change', () => {
      this._updateUI({
        cancelBtn,
        addBtn,
        mediaQuery,
      });
    });
  },

  _addTaskButton(button) {
    const test = new TaskDataInInbox();

    // button.disabled = true;
    // button.classList.add('disable');
    // button.addEventListener('click', () => {
    //   button.disabled = false;
    //   button.classList.remove('disable');
    //   test.addNewTask(TaskData.userInputTaskData());
    //   console.log(test.getAllTask());
    // });
    button.addEventListener('click', () => {
      // console.log(TaskData.userInputTaskData().taskName);
    });
  },
};

export default addTaskUIHelper;
