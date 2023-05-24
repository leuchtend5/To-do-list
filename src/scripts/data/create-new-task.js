import { nanoid } from 'nanoid';

class CreateNewTask {
  constructor({ name, date, description, priorityFlag, isComplete }) {
    this.id = nanoid();
    this.name = name;
    this.date = date;
    this.description = description;
    this.isComplete = isComplete;
    this.priorityFlag = priorityFlag;
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

  setTaskStatus(isComplete) {
    this.isComplete = isComplete;
  }
}

export default CreateNewTask;
