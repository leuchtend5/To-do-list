import { format } from 'date-fns';
import ShowTaskHelper from '../../utils/show-usertask-helper';
import TaskStorage from '../../data/task-storage';
import EditTaskHelper from '../../utils/edit-task-helper';

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

    userTasks.addEventListener('edit-task', (e) => {
      this._removeTaskInputBox();

      EditTaskHelper.init({
        container: userTasks,
        data: e,
      });
    });

    if (TaskStorage.filterTaskByToday(todayDate).length === 0) {
      userTasks.textContent = 'No tasks found';
    } else {
      ShowTaskHelper.showAllTask(userTasks, TaskStorage.filterTaskByToday(todayDate));
    }
  },

  _removeTaskInputBox() {
    const existingTaskInput = document.querySelector('task-input');
    if (existingTaskInput) {
      existingTaskInput.remove();
    }
  },
};

export default TodayPage;
