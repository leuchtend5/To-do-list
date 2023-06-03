import { nanoid } from 'nanoid';

class CreateNewProject {
  constructor(name) {
    this.id = nanoid();
    this.projectName = name;
  }

  setProjectName(name) {
    this.projectName = name;
  }
}

export default CreateNewProject;
