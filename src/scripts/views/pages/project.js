import UrlParser from '../../routes/url-parser';
// import CollectAllProjects from '../../data/collect-all-projects';
import ProjectStorage from '../../data/project-storage';
import ShowTaskHelper from '../../utils/show-usertask-helper';
import EditTaskHelper from '../../utils/edit-task-helper';
import TaskStorage from '../../data/task-storage';

const ProjectPage = {
  async render() {
    return `
     <div class="menu-title"></div>
     <div class="user-tasks"></div>
     <div class="empty"></div>
    `;
  },

  async afterRender() {
    // trying to find project name by searching project's id
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const title = document.querySelector('.menu-title');
    const findProject = ProjectStorage.getProjectById(url.id);
    title.textContent = findProject.projectName;

    const userTasks = document.querySelector('.user-tasks');
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
        title: title.textContent,
      });
    });

    ShowTaskHelper.showAllTask(userTasks, TaskStorage.filterUnfinishedTaskByProjectId(url.id));
  },

  _removeTaskInputBox() {
    const existingTaskInput = document.querySelector('task-input');
    if (existingTaskInput) {
      existingTaskInput.remove();
    }
  },
};

export default ProjectPage;
