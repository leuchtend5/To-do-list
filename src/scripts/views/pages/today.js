import AddTaskUIHelper from '../../utils/addtask-UI-helper';
import ShowTaskHelper from '../../utils/show-usertask-helper';
import CollectAllProjects from '../../data/collect-all-projects';

const TodayPage = {
  async render() {
    return `
     <div class="menu-title">Today</div>
     <div class="user-tasks"></div>
     <div class="empty"></div>
    `;
  },

  async afterRender() {
    const userTasks = document.querySelector('.user-tasks');
    const addTask = document.createElement('add-task');
    userTasks.insertAdjacentElement('afterend', addTask);

    await customElements.whenDefined('add-task');

    const addTaskSelector = addTask.querySelector('.add-task');
    const taskInputBox = addTask.querySelector('.task-input');
    const priorityBtn = addTask.querySelector('.priority');
    const title = document.querySelector('.menu-title').textContent.toLowerCase();

    AddTaskUIHelper.init({
      addTask: addTaskSelector,
      inputBox: taskInputBox,
      priority: priorityBtn,
      title,
      taskContainer: userTasks,
    });

    // const sortTaskByDate =

    ShowTaskHelper.showAllTask(userTasks, CollectAllProjects.findProject(title).allTasks);
  },
};

export default TodayPage;
