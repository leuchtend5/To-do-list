import ShowTaskHelper from '../../utils/show-usertask-helper';
import TaskStorage from '../../data/task-storage';

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

    if (TaskStorage.filterCompletedTask().length === 0) {
      userTasks.textContent = 'No tasks found';
    } else {
      ShowTaskHelper.showAllTask(userTasks, TaskStorage.filterCompletedTask());
    }
  },
};

export default CompletedTasksPage;
