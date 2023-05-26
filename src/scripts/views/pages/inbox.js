import '../../components/add-task';
import '../../components/task-input-box';
import ShowTaskHelper from '../../utils/show-usertask-helper';
import CollectAllProjects from '../../data/collect-all-projects';
import EditTaskHelper from '../../utils/edit-task-helper';

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
    const title = document.querySelector('.menu-title').textContent.toLowerCase();
    const addTask = document.createElement('add-task');
    userTasks.insertAdjacentElement('afterend', addTask);

    addTask.addEventListener('click', (e) => {
      e.stopPropagation();
      // remove all the task input dialog box and add a new one
      this._removeTaskInputBox();

      const userTask = document.querySelectorAll('user-task');
      userTask.forEach((task) => {
        task.style.display = 'block';
      });

      addTask.style.display = 'none';
      const taskInputBox = document.createElement('task-input');
      taskInputBox.taskContainer = userTasks;
      userTasks.insertAdjacentElement('afterend', taskInputBox);
    });

    userTasks.addEventListener('edit-task', (e) => {
      this._removeTaskInputBox();
      addTask.style.display = 'flex';

      EditTaskHelper.init({
        container: userTasks,
        data: e,
        title,
      });
    });

    ShowTaskHelper.showAllTask(
      userTasks,
      CollectAllProjects.findProjectByName(title).getUnfinishedTasks(),
    );
  },

  _removeTaskInputBox() {
    const existingTaskInput = document.querySelector('task-input');
    if (existingTaskInput) {
      existingTaskInput.remove();
    }
  },
};

export default InboxPage;
