// const TaskDataInInbox = {
//   init() {
//     this._allData = [];
//   },

//   addNewTask(task) {
//     this._allData.push(task);
//     return this._allData;
//   },

//   getAllTask() {
//     return this._allData;
//   },
// };

class TaskDataInInbox {
  constructor() {
    this._allTask = [];
  }

  addNewTask(data) {
    this._allTask.push(data);
    return this._allTask;
  }

  getAllTask() {
    return this._allTask;
  }
}

export default TaskDataInInbox;
