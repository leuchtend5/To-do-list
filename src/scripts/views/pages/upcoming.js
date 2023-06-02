import ShowTaskHelper from '../../utils/show-usertask-helper';
// import CollectAllTask from '../../data/collect-all-tasks';
import TaskStorage from '../../data/task-storage';

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
    ShowTaskHelper.showAllTask(userTasks, TaskStorage.filterTaskByUpcoming());
  },
};

export default UpcomingPage;
