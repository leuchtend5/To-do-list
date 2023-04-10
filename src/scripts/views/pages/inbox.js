import '../../components/user-task';
import '../../components/add-task';
import addTaskUIHelper from '../../utils/addtask-UI-helper';

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
    const addTask = document.createElement('add-task');
    userTasks.insertAdjacentElement('afterend', addTask);

    await customElements.whenDefined('add-task');

    const addTaskSelector = addTask.querySelector('.add-task');
    const taskInputBox = addTask.querySelector('.task-input');
    const priorityBtn = addTask.querySelector('.priority');

    addTaskUIHelper.init({
      addTask: addTaskSelector,
      inputBox: taskInputBox,
      priority: priorityBtn,
    });
  },
};

export default InboxPage;
