import '../components/task-input-box';
import CollectAllProjects from '../data/collect-all-projects';
import CollectAllTask from '../data/collect-all-tasks';
import CreateNewTask from '../data/create-new-task';
import mediaQuery from './watch-media';
import ShowTaskHelper from './show-usertask-helper';
import TaskCounter from './task-counter';

const AddTaskUIHelper = {
  init({ taskInputBox, title, taskContainer }) {
    this._cancelBtn = document.querySelector('.cancel-btn');
    this._addBtn = document.querySelector('.add-btn');
    this._flagDropdown = document.querySelector('.flag-dropdown');
    this._taskName = document.querySelector('#task-name');
    this._taskDescription = document.querySelector('#description');
    this._taskDate = document.querySelector('#due-date');
    this._priority = document.querySelector('.priority');
    const addTaskElement = document.querySelector('add-task');

    this._addBtn.disabled = true;

    // to set autofocus on task name when task input dialog box appear
    setTimeout(() => {
      this._taskName.focus();
    }, 0);

    this._cancelBtn.addEventListener('click', () => {
      addTaskElement.style.display = 'flex';
      taskInputBox.remove();
    });

    this._priorityToggle();
    this._updateUI();
    this._watchMediaChange();
    this._watchUserInput();
    this._addTaskButton(title, taskContainer);
  },

  _priorityToggle() {
    let flagToggle = true;

    this._priority.addEventListener('click', () => {
      if (flagToggle) {
        this._flagDropdown.classList.add('active');
        flagToggle = !flagToggle;
      } else {
        this._flagDropdown.classList.remove('active');
        flagToggle = !flagToggle;
      }
    });
  },

  _updateUI() {
    if (mediaQuery.matches) {
      this._cancelBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
      this._addBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    } else {
      this._cancelBtn.textContent = 'Cancel';
      this._addBtn.textContent = 'Add Task';
    }
  },

  _watchMediaChange() {
    mediaQuery.addEventListener('change', () => {
      this._updateUI();
    });
  },

  _watchUserInput() {
    this._taskName.addEventListener('input', () => {
      if (this._taskName.value !== '') {
        this._addBtn.disabled = false;
        this._addBtn.classList.remove('disable');
      } else {
        this._addBtn.disabled = true;
        this._addBtn.classList.add('disable');
      }
    });
  },

  _addTaskButton(title, taskContainer) {
    this._addBtn.addEventListener('click', () => {
      if (!this._addBtn.disabled) {
        const foundProject = CollectAllProjects.findProjectByName(title);
        const newTask = new CreateNewTask({
          name: this._taskName.value,
          date: this._taskDate.value,
          description: this._taskDescription.value,
        });

        foundProject.setNewTask(newTask);
        CollectAllTask.addNewTask(newTask);
        // ShowTaskHelper.showTask(taskContainer, newTask);
        // this.dispatchEvent(new Event('add-task'));
        TaskCounter.init();
      }

      // reset add task form UI
      this._taskName.value = '';
      this._taskDate.value = '';
      this._taskDescription.value = '';
      this._addBtn.disabled = true;
      this._addBtn.classList.add('disable');
      setTimeout(() => {
        this._taskName.focus();
      }, 0);
    });
  },
};

export default AddTaskUIHelper;
