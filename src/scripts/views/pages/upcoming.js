import ShowTaskHelper from '../../utils/show-usertask-helper';
import TaskStorage from '../../data/task-storage';
import EditTaskHelper from '../../utils/edit-task-helper';

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

    userTasks.addEventListener('edit-task', (e) => {
      this._removeTaskInputBox();

      EditTaskHelper.init({
        container: userTasks,
        data: e,
      });
    });

    if (TaskStorage.filterTaskByUpcoming().length === 0) {
      userTasks.textContent = 'No tasks found';
    } else {
      ShowTaskHelper.showAllTask(userTasks, TaskStorage.filterTaskByUpcoming());
    }
  },

  _removeTaskInputBox() {
    const existingTaskInput = document.querySelector('task-input');
    if (existingTaskInput) {
      existingTaskInput.remove();
    }
  },
};

export default UpcomingPage;
