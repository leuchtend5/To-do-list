import { nanoid } from 'nanoid';

class CreateNewTask {
  constructor({ name, date, description }) {
    this.id = nanoid();
    this.name = name;
    this.date = date;
    this.description = description;
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
}

export default CreateNewTask;
