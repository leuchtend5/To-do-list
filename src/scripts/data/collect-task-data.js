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

class CollectTaskData {
  constructor() {
    this._allTask = [];
  }

  static addNewTask(data) {
    this._allTask.push(data);
    return this._allTask;
  }

  static getAllTask() {
    return this._allTask;
  }
}

export default CollectTaskData;
