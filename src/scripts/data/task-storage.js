import { isFuture, parseISO } from 'date-fns';
import CreateNewTask from './create-new-task';

class TaskStorage {
  static allTasks = [];

  static saveAllTasks(data) {
    localStorage.setItem('all-tasks', JSON.stringify(data));
  }

  static getAllTasks() {
    if (localStorage.getItem('all-tasks')) {
      const data = JSON.parse(localStorage.getItem('all-tasks'));

      // make a new array with task instance
      const newData = data.map((task) =>
        Object.assign(
          new CreateNewTask({
            name: task.name,
            date: task.date,
            description: task.description,
            priorityFlag: task.priorityFlag,
            isComplete: task.isComplete,
            projectId: task.projectId,
          }),
          task,
        ),
      );
      return newData;
    }
    return this.allTasks;
  }

  static getTaskById(id) {
    const data = this.getAllTasks();
    return data.find((task) => task.id === id);
  }

  static addNewTask(data) {
    if (localStorage.getItem('all-tasks')) {
      const allTasks = JSON.parse(localStorage.getItem('all-tasks'));
      allTasks.push(data);
      this.saveAllTasks(allTasks);
      return;
    }
    this.allTasks.push(data);
    this.saveAllTasks(this.allTasks);
  }

  static setNewTaskName(id, newName) {
    const allTasks = this.getAllTasks();
    const foundTask = allTasks.find((task) => task.id === id);
    foundTask.setTaskName(newName);

    this.saveAllTasks(allTasks);
  }

  static setNewTaskDate(id, newDate) {
    const allTasks = this.getAllTasks();
    const foundTask = allTasks.find((task) => task.id === id);
    foundTask.setTaskDate(newDate);

    this.saveAllTasks(allTasks);
  }

  static setNewTaskDescription(id, newDescription) {
    const allTasks = this.getAllTasks();
    const foundTask = allTasks.find((task) => task.id === id);
    foundTask.setTaskDescription(newDescription);

    this.saveAllTasks(allTasks);
  }

  static setNewTaskPriorityFlag(id, newFlag) {
    const allTasks = this.getAllTasks();
    const foundTask = allTasks.find((task) => task.id === id);
    foundTask.setPriorityFlag(newFlag);

    this.saveAllTasks(allTasks);
  }

  static setNewTaskStatus(id, newStatus) {
    const allTasks = this.getAllTasks();
    const foundTask = allTasks.find((task) => task.id === id);
    foundTask.setTaskStatus(newStatus);

    this.saveAllTasks(allTasks);
  }

  static deleteTask(id) {
    const data = this.getAllTasks();
    const index = data.findIndex((task) => task.id === id);
    data.splice(index, 1);
    this.saveAllTasks(data);
  }

  static filterTaskByToday(date) {
    const data = this.getAllTasks();

    return data.filter((task) => task.isComplete === false).filter((task) => task.date === date);
  }

  static filterTaskByUpcoming() {
    const data = this.getAllTasks();

    return data
      .filter((task) => task.isComplete === false)
      .filter((task) => isFuture(parseISO(task.date)) === true);
  }

  static filterCompletedTask() {
    const data = this.getAllTasks();
    return data.filter((task) => task.isComplete === true);
  }

  static filterUnfinishedTaskByProjectId(projectId) {
    const data = this.getAllTasks();

    return data
      .filter((task) => task.projectId === projectId)
      .filter((task) => task.isComplete === false);
  }
}

export default TaskStorage;
