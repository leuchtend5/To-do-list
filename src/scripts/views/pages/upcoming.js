import AddTaskUIHelper from '../../utils/addtask-UI-helper';

const UpcomingPage = {
  async render() {
    return `
     <div class="menu-title">Upcoming</div>
     <div class="user-tasks"></div>
     <div class="empty"></div>
    `;
  },

  async afterRender() {
    const userTasks = document.querySelector('.user-tasks');

    const userTask = document.createElement('user-task');
    const addTask = document.createElement('add-task');
    userTasks.appendChild(userTask);
    userTask.insertAdjacentElement('afterend', addTask);

    await customElements.whenDefined('add-task');
    const addTaskSelector = addTask.querySelector('.add-task');
    const taskInputBox = addTask.querySelector('.task-input');
    const priorityBtn = addTask.querySelector('.priority');

    AddTaskUIHelper.init({
      addTask: addTaskSelector,
      inputBox: taskInputBox,
      priority: priorityBtn,
    });
  },
};

export default UpcomingPage;
