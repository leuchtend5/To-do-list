import { format } from 'date-fns';
import ShowTaskHelper from '../../utils/show-usertask-helper';
import TaskStorage from '../../data/task-storage';
// import CollectAllTask from '../../data/collect-all-tasks';

const TodayPage = {
  async render() {
    return `
     <div class="menu-title">Today</div>
     <div class="user-tasks"></div>
     <div class="empty"></div>
    `;
  },

  async afterRender() {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const userTasks = document.querySelector('.user-tasks');

    ShowTaskHelper.showAllTask(userTasks, TaskStorage.filterTaskByToday(todayDate));
  },
};

export default TodayPage;
