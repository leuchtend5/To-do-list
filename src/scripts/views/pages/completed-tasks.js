const CompletedTasksPage = {
  async render() {
    return `
     <div class="menu-title">Completed Tasks</div>
     <div class="user-tasks"></div>
     <div class="empty"></div>
    `;
  },

  async afterRender() {
    const userTasks = document.querySelector('.user-tasks');

    const userTask = document.createElement('user-task');
    userTasks.appendChild(userTask);
  },
};

export default CompletedTasksPage;
