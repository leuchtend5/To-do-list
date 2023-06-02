import { format } from 'date-fns';

import TaskStorage from '../data/task-storage';
import ProjectStorage from '../data/project-storage';

const TaskCounter = {
  init() {
    this._taskCounterInbox();
    this._taskCounterToday();
    this._taskCounterUpcoming();
    this._taskCounterEachProject();
    this._taskCounterCompletedTask();
  },

  _taskCounterCompletedTask() {
    const counterElement = document.querySelector('.total-tasks.completed');

    this._updateUI(TaskStorage.filterCompletedTask(), counterElement);
  },

  _taskCounterInbox() {
    const counterElement = document.querySelector('.total-tasks.inbox');
    const foundProject = ProjectStorage.getProjectByName('inbox');

    this._updateUI(TaskStorage.filterUnfinishedTaskByProjectId(foundProject.id), counterElement);
  },

  _taskCounterToday() {
    const counterElement = document.querySelector('.total-tasks.today');
    const todayDate = format(new Date(), 'yyyy-MM-dd');

    const taskArray = TaskStorage.filterTaskByToday(todayDate);

    this._updateUI(taskArray, counterElement);
  },

  _taskCounterUpcoming() {
    const counterElement = document.querySelector('.total-tasks.upcoming');

    this._updateUI(TaskStorage.filterTaskByUpcoming(), counterElement);
  },

  _taskCounterEachProject() {
    const projectList = document.querySelector('.project-list');

    // iterate array all project and select total task element
    if (projectList.children.length !== 0) {
      const projectElement = document.querySelectorAll('new-project');
      projectElement.forEach(async (project) => {
        await customElements.whenDefined('new-project');

        const totalTasks = project.querySelector('.total-tasks');
        this._updateUI(TaskStorage.filterUnfinishedTaskByProjectId(project._projectId), totalTasks);
      });
    }
  },

  _updateUI(project, element) {
    if (project.length === 0) {
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
      element.textContent = project.length;
    }
  },
};

export default TaskCounter;
