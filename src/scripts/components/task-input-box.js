import { LitElement, html } from 'lit';
import mediaQuery from '../utils/watch-media';
import CollectAllProjects from '../data/collect-all-projects';
import CollectAllTask from '../data/collect-all-tasks';
import CreateNewTask from '../data/create-new-task';
import TaskCounter from '../utils/task-counter';
import ShowTaskHelper from '../utils/show-usertask-helper';

class TaskInputBox extends LitElement {
  constructor() {
    super();
  }

  // DISABLE SHADOW DOM
  createRenderRoot() {
    return this;
  }

  set taskContainer(container) {
    this._taskContainer = container;
  }

  firstUpdated() {
    const taskName = this.querySelector('#task-name');
    const taskDescription = this.querySelector('#description');
    const taskDate = this.querySelector('#due-date');
    const priorityBtn = this.querySelector('.priority');
    const flagDropDown = this.querySelector('.flag-dropdown');
    const currentPriority = this.querySelector('.current-flag > p');
    const addBtn = this.querySelector('.add-btn');
    const cancelBtn = this.querySelector('.cancel-btn');
    const saveBtn = this.querySelector('.save-btn');
    const title = document.querySelector('.menu-title').textContent.toLowerCase();
    const addTask = document.querySelector('add-task');

    addBtn.disabled = true;
    saveBtn.style.display = 'none';

    this._autoFocus(taskName);
    this._addTask({ addBtn, taskName, taskDate, taskDescription, currentPriority, title });
    this._cancelTask(cancelBtn, addTask);
    this._priorityToggle({ priorityBtn, flagDropDown, currentPriority });
    this._updateUI(addBtn, cancelBtn, saveBtn);
    this._watchMediaChange(addBtn, cancelBtn, saveBtn);
    this._watchUserInput(taskName, addBtn, saveBtn);
  }

  _autoFocus(element) {
    element.focus();
  }

  _resetInputValue({ taskName, taskDate, taskDescription, currentPriority, addBtn }) {
    taskName.value = '';
    taskDate.value = '';
    taskDescription.value = '';
    currentPriority.innerHTML = '<i class="fa-solid fa-flag p-four"></i> Priority 4';
    addBtn.disabled = true;
    addBtn.classList.add('disable');
    this._autoFocus(taskName);
  }

  _addTask({ addBtn, taskName, taskDate, taskDescription, currentPriority, title }) {
    addBtn.addEventListener('click', () => {
      if (!addBtn.disabled) {
        const foundProject = CollectAllProjects.findProjectByName(title);
        const newTask = new CreateNewTask({
          name: taskName.value,
          date: taskDate.value,
          description: taskDescription.value,
          priorityFlag: currentPriority.innerHTML,
          isComplete: false,
        });
        foundProject.setNewTask(newTask);
        CollectAllTask.addNewTask(newTask);
        ShowTaskHelper.showTask(this._taskContainer, newTask);
        TaskCounter.init();
      }

      this._resetInputValue({ taskName, taskDate, taskDescription, currentPriority, addBtn });
    });
  }

  _cancelTask(button, addTask) {
    button.addEventListener('click', () => {
      this.remove();
      addTask.style.display = 'flex';
    });
  }

  _priorityToggle({ priorityBtn, flagDropDown, currentPriority }) {
    let flagToggle = true;
    let selectedFlag;

    priorityBtn.addEventListener('click', () => {
      if (flagToggle) {
        flagDropDown.classList.add('active');
        flagDropDown.addEventListener('click', (e) => {
          selectedFlag = e.target.innerHTML;

          currentPriority.innerHTML = selectedFlag;
        });
        flagToggle = !flagToggle;
      } else {
        flagDropDown.classList.remove('active');
        flagToggle = !flagToggle;
      }
    });
  }

  _updateUI(addBtn, cancelBtn, saveBtn) {
    if (mediaQuery.matches) {
      cancelBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
      addBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
      saveBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    } else {
      cancelBtn.textContent = 'Cancel';
      addBtn.textContent = 'Add Task';
      saveBtn.textContent = 'Save';
    }
  }

  _watchMediaChange(addBtn, cancelBtn, saveBtn) {
    mediaQuery.addEventListener('change', () => {
      this._updateUI(addBtn, cancelBtn, saveBtn);
    });
  }

  _watchUserInput(element, addBtn, saveBtn) {
    element.addEventListener('input', () => {
      if (element.value !== '') {
        addBtn.disabled = false;
        addBtn.classList.remove('disable');
        saveBtn.disabled = false;
        saveBtn.classList.remove('disable');
      } else {
        addBtn.disabled = true;
        addBtn.classList.add('disable');
        saveBtn.disabled = true;
        saveBtn.classList.add('disable');
      }
    });
  }

  render() {
    return html`
      <div class="task-input">
        <div class="task-name">
          <input type="text" id="task-name" placeholder="Task name" />
        </div>
        <div class="description">
          <input type="text" id="description" placeholder="Description" />
        </div>
        <div class="set-panel">
          <div class="due-date">
            <input type="date" id="due-date" />
          </div>
          <button class="priority">
            <div class="current-flag">
              <p><i class="fa-solid fa-flag p-four"></i> Priority 4</p>
            </div>
            <div class="flag-dropdown">
              <ul>
                <li><i class="fa-solid fa-flag p-one"></i> Priority 1</li>
                <li><i class="fa-solid fa-flag p-two"></i> Priority 2</li>
                <li><i class="fa-solid fa-flag p-three"></i> Priority 3</li>
                <li><i class="fa-solid fa-flag p-four"></i> Priority 4</li>
              </ul>
            </div>
          </button>
        </div>
        <div class="decision-panel">
          <div class="yes-no-btn">
            <button class="cancel-btn">Cancel</button>
            <button class="add-btn disable">Add Task</button>
            <button class="save-btn">Save</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('task-input', TaskInputBox);
