import '../../components/user-task';

const InboxPage = {
  async render() {
    return `
     <div class="menu-title">Inbox</div>
     <div class="user-tasks"></div>
    `;
  },

  async afterRender() {
    const userTasks = document.querySelector('.user-tasks');
    const userTask = document.createElement('user-task');
    userTasks.appendChild(userTask);
  },
};

export default InboxPage;
