import TaskData from '../data/task-data';
import CollectTaskData from '../data/collect-task-data';
import mediaQuery from './watch-media';

const AddTaskUIHelper = {
  init({ addTask, inputBox, priority }) {
    const cancelBtn = document.querySelector('.cancel-btn');
    const addBtn = document.querySelector('.add-btn');
    const flagDropdown = document.querySelector('.flag-dropdown');
    const taskName = document.querySelector('#task-name');
    const taskDescription = document.querySelector('#description');
    const taskDate = document.querySelector('#due-date');

    addBtn.disabled = true;

    this._addTaskToggle({
      addTask,
      inputBox,
      cancelBtn,
    });

    this._priorityToggle(priority, flagDropdown);

    this._updateUI({
      cancelBtn,
      addBtn,
    });

    this._watchMediaChange({ mediaQuery, cancelBtn, addBtn });

    this._watchUserInput({
      element: taskName,
      button: addBtn,
    });

    this._addTaskButton({
      button: addBtn,
      name: taskName.value,
      date: taskDate.value,
      description: taskDescription.value,
    });
    // const taskName = document.querySelector('#task-name');
    // taskName.addEventListener('input', () => {
    //   if (taskName.value === '') {
    //     addBtn.disabled = true;
    //     addBtn.classList.add('disable');
    //   } else {
    //     addBtn.disabled = false;
    //     addBtn.classList.remove('disable');
    //     this._addTaskButton(addBtn);
    //   }
    // });
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

  _updateUI({ cancelBtn, addBtn }) {
    if (mediaQuery.matches) {
      cancelBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
      addBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    } else {
      cancelBtn.textContent = 'Cancel';
      addBtn.textContent = 'Add Task';
    }
  },

  _watchMediaChange({ cancelBtn, addBtn }) {
    mediaQuery.addEventListener('change', () => {
      this._updateUI({
        cancelBtn,
        addBtn,
        mediaQuery,
      });
    });
  },

  _watchUserInput({ element, button }) {
    element.addEventListener('input', () => {
      if (element.value !== '') {
        button.disabled = false;
        button.classList.remove('disable');
      } else {
        button.disabled = true;
        button.classList.add('disable');
      }
    });
  },

  _addTaskButton({ button, name, date, description }) {
    const test = new CollectTaskData();

    button.addEventListener('click', () => {
      if (!button.disabled) {
        test.addNewTask(TaskData.userInputTaskData(name, date, description));
        console.log(test.getAllTask());
      }
    });
  },
};

export default AddTaskUIHelper;
