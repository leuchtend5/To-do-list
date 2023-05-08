import { format } from 'date-fns';
import CollectAllProjects from '../data/collect-all-projects';
import CollectAllTask from '../data/collect-all-tasks';

const TaskCounter = {
  init() {
    this._taskCounterInbox();
    this._taskCounterToday();
    this._taskCounterUpcoming();
  },

  _taskCounterInbox() {
    const counterElement = document.querySelector('.total-tasks.inbox');
    const foundProject = CollectAllProjects.findProject('inbox');

    this._updateUI(foundProject.allTasks, counterElement);
  },

  _taskCounterToday() {
    const counterElement = document.querySelector('.total-tasks.today');
    const todayDate = format(new Date(), 'yyyy-MM-dd');

    const taskArray = CollectAllTask.filterByToday(todayDate);

    this._updateUI(taskArray, counterElement);
  },

  _taskCounterUpcoming() {
    const counterElement = document.querySelector('.total-tasks.upcoming');

    this._updateUI(CollectAllTask.filterByUpcoming(), counterElement);
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
