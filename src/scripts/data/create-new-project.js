// class CollectProjectData {
//   static allProjects = [];

//   static addNewProject(data) {
//     this._allProjects.push(data);
//     return this._allProjects;
//   }

//   static getAllProjects() {
//     return this._allProjects;
//   }
// }

// export default CollectProjectData;

class CreateNewProject {
  constructor(name) {
    this.projectName = name;
    this.allTasks = [];
  }

  setProjectName(name) {
    this.projectName = name;
    return this.projectName;
  }

  setNewTask(data) {
    this.allTasks.push(data);
    return this._allTasks;
  }

  deleteTask(id) {
    const index = this.allTasks.findIndex((task) => task.id === id);
    this.allTasks.splice(index, 1);
    return this.allTasks;
  }
}

export default CreateNewProject;
