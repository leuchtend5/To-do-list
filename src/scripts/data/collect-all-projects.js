import CreateNewProject from './create-new-project';

class CollectAllProjects {
  static allProjects = [new CreateNewProject('inbox')];

  static addNewProject(data) {
    this.allProjects.push(data);
    return this.allProjects;
  }

  static findProject(projectName) {
    return this.allProjects.find((project) => project.projectName === projectName);
  }

  // static getAllProjects() {
  //   return this.allProjects;
  // }
}

export default CollectAllProjects;
