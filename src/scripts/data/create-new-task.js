import { nanoid } from 'nanoid';

class CreateNewTask {
  constructor({ name, date, description }) {
    this.id = nanoid();
    this.name = name;
    this.date = date;
    this.description = description;
  }
}

export default CreateNewTask;
