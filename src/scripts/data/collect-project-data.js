class CollectProjectData {
  constructor() {
    this._allProjects = [];
  }

  addNewProject(data) {
    this._allProjects.push(data);
    return this._allProjects;
  }

  getAllProjects() {
    return this._allProjects;
  }
}

export default CollectProjectData;
