import UrlParser from '../../routes/url-parser';
import AddTaskUIHelper from '../../utils/addtask-UI-helper';
import CollectAllProjects from '../../data/collect-all-projects';
import ShowTaskHelper from '../../utils/show-usertask-helper';

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
    const findProject = CollectAllProjects.findProjectById(url.id);
    title.textContent = findProject.projectName;

    const userTasks = document.querySelector('.user-tasks');
    const addTask = document.createElement('add-task');
    userTasks.insertAdjacentElement('afterend', addTask);

    await customElements.whenDefined('add-task');

    const addTaskSelector = addTask.querySelector('.add-task');
    const taskInputBox = addTask.querySelector('.task-input');
    const priorityBtn = addTask.querySelector('.priority');

    AddTaskUIHelper.init({
      addTask: addTaskSelector,
      inputBox: taskInputBox,
      priority: priorityBtn,
      title: title.textContent,
      taskContainer: userTasks,
    });

    ShowTaskHelper.showAllTask(
      userTasks,
      CollectAllProjects.findProjectByName(title.textContent).allTasks,
    );
  },
};

export default ProjectPage;