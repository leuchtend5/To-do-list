import CreateNewProject from './create-new-project';

class CollectAllProjects {
  static allProjects = [new CreateNewProject('inbox')];

  static addNewProject(data) {
    this.allProjects.push(data);
    return this.allProjects;
  }

  static findProjectByName(projectName) {
    return this.allProjects.find((project) => project.projectName === projectName);
  }

  static findProjectById(id) {
    return this.allProjects.find((project) => project.id === id);
  }

  static deleteProject(id) {
    const index = this.allProjects.findIndex((project) => project.id === id);
    this.allProjects.splice(index, 1);
    return this.allProjects;
  }
}

export default CollectAllProjects;
