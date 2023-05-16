import '../../components/add-task';
import '../../components/task-input-box';
import ShowTaskHelper from '../../utils/show-usertask-helper';
import CollectAllProjects from '../../data/collect-all-projects';

const InboxPage = {
  async render() {
    return `
     <div class="menu-title">Inbox</div>
     <div class="user-tasks"></div>
     <div class="empty"></div>
    `;
  },

  async afterRender() {
    const userTasks = document.querySelector('.user-tasks');
    const title = document.querySelector('.menu-title').textContent.toLowerCase();
    const addTask = document.createElement('add-task');
    userTasks.insertAdjacentElement('afterend', addTask);

    addTask.addEventListener('click', async () => {
      // remove all the task input dialog box and add a new one
      this._removeTaskInputBox();
      addTask.style.display = 'none';
      const taskInputBox = document.createElement('task-input');
      taskInputBox.taskContainer = userTasks;
      userTasks.insertAdjacentElement('afterend', taskInputBox);
    });

    const handleEditTask = async (e) => {
      this._removeTaskInputBox();

      addTask.style.display = 'flex';

      const taskInputBox = document.createElement('task-input');
      taskInputBox.taskContainer = userTasks;

      // find the task index with task ID
      const allTasks = document.querySelectorAll('user-task');
      const newArray = Array.from(allTasks);

      const index = newArray.findIndex((task) => task._taskId === e.detail.taskId);

      const position = allTasks[index];
      position.insertAdjacentElement('afterend', taskInputBox);

      await customElements.whenDefined('task-input');

      const name = document.querySelector('#task-name');
      const date = document.querySelector('#due-date');
      const description = document.querySelector('#description');
      const test = document.querySelector('.add-btn');

      name.value = e.detail.taskName;
      date.value = e.detail.taskDate;
      description.value = e.detail.taskDescription;
      test.textContent = 'Save';
      test.disabled = false;
      test.classList.remove('disable');
    };

    userTasks.addEventListener('edit-task', handleEditTask);

    ShowTaskHelper.showAllTask(userTasks, CollectAllProjects.findProjectByName(title).allTasks);
  },

  _removeTaskInputBox() {
    const existingTaskInput = document.querySelector('task-input');
    if (existingTaskInput) {
      existingTaskInput.remove();
    }
  },
};

export default InboxPage;
