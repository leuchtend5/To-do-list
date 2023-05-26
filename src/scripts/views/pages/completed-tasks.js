import ShowTaskHelper from '../../utils/show-usertask-helper';
import CollectAllTask from '../../data/collect-all-tasks';

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
    ShowTaskHelper.showAllTask(userTasks, CollectAllTask.filterByStatus());
  },
};

export default CompletedTasksPage;
