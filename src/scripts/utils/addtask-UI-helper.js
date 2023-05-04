import CollectAllProjects from '../data/collect-all-projects';
import CreateNewTask from '../data/create-new-task';
import mediaQuery from './watch-media';
import ShowTaskHelper from './show-usertask-helper';

const AddTaskUIHelper = {
  init({ addTask, inputBox, priority, title, taskContainer }) {
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
      name: taskName,
      date: taskDate,
      description: taskDescription,
      title,
      taskContainer,
    });
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

  _addTaskButton({ button, name, date, description, title, taskContainer }) {
    button.addEventListener('click', () => {
      if (!button.disabled) {
        const foundProject = CollectAllProjects.findProject(title);

        foundProject.setNewTask(
          new CreateNewTask({
            name: name.value,
            date: date.value,
            description: description.value,
          }),
        );

        // add latest task to the page
        const lastIndex = foundProject.allTasks.length - 1;
        ShowTaskHelper.showTask(taskContainer, foundProject.allTasks[lastIndex]);
      }

      // reset add task form UI
      name.value = '';
      date.value = '';
      description.value = '';
      button.disabled = true;
      button.classList.add('disable');
    });
  },
};

export default AddTaskUIHelper;
