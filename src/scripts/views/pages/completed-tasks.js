const CompletedTasksPage = {
  async render() {
    return `
     <div class="menu-title">Completed Tasks</div>
     <div class="user-tasks"></div>
     <div class="empty"></div>
    `;
  },

  async afterRender() {
    //
  },
};

export default CompletedTasksPage;
