import { isFuture, parseISO } from 'date-fns';

class CollectAllTask {
  static allTasks = [];

  static addNewTask(data) {
    this.allTasks.push(data);
    return this.allTasks;
  }

  static filterByToday(date) {
    return this.allTasks.filter((task) => task.date === date);
  }

  static filterByUpcoming() {
    // parse string to date using parseISO
    return this.allTasks.filter((task) => isFuture(parseISO(task.date)) === true);
  }

  static deleteTask(id) {
    const index = this.allTasks.findIndex((task) => task.id === id);
    this.allTasks.splice(index, 1);
    return this.allTasks;
  }

  static findTaskById(id) {
    return this.allTasks.find((task) => task.id === id);
  }
}

export default CollectAllTask;
