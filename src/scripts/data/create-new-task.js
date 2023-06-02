import { nanoid } from 'nanoid';

class CreateNewTask {
  constructor({ name, date, description, priorityFlag, isComplete, projectId }) {
    this.id = nanoid();
    this.name = name;
    this.date = date;
    this.description = description;
    this.isComplete = isComplete;
    this.priorityFlag = priorityFlag;
    this.projectId = projectId;
  }

  setTaskName(name) {
    this.name = name;
  }

  setTaskDate(date) {
    this.date = date;
  }

  setTaskDescription(description) {
    this.description = description;
  }

  setPriorityFlag(flag) {
    this.priorityFlag = flag;
  }

  setTaskStatus(isComplete) {
    this.isComplete = isComplete;
  }
}

export default CreateNewTask;
