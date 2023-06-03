import CreateNewProject from './create-new-project';

class ProjectStorage {
  static allProjects = [];

  static saveAllProjects(data) {
    localStorage.setItem('all-projects', JSON.stringify(data));
  }

  static getAllProjects() {
    if (localStorage.getItem('all-projects')) {
      const data = JSON.parse(localStorage.getItem('all-projects'));

      // make a new array with project instance
      const newData = data.map((project) =>
        Object.assign(new CreateNewProject(project.projectName), project),
      );
      return newData;
    }
    this.allProjects.push(new CreateNewProject('inbox'));
    this.saveAllProjects(this.allProjects);
    return this.allProjects;
  }

  static addNewProject(data) {
    if (localStorage.getItem('all-projects')) {
      const allProjects = JSON.parse(localStorage.getItem('all-projects'));
      allProjects.push(data);
      this.saveAllProjects(allProjects);
      return;
    }

    this.allProjects.push(data);
    this.saveAllProjects(this.allProjects);
  }

  static saveNewProjectName(id, newProjectName) {
    const allProjects = this.getAllProjects();
    const foundProject = allProjects.find((project) => project.id === id);

    foundProject.setProjectName(newProjectName);

    this.saveAllProjects(allProjects);
  }

  static deleteProject(id) {
    const data = this.getAllProjects();
    const index = data.findIndex((project) => project.id === id);
    data.splice(index, 1);
    this.saveAllProjects(data);
  }

  static getProjectByName(projectName) {
    const data = this.getAllProjects();
    return data.find((project) => project.projectName === projectName);
  }

  static getProjectById(id) {
    const data = this.getAllProjects();
    return data.find((project) => project.id === id);
  }
}

export default ProjectStorage;
