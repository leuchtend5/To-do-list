import { nanoid } from 'nanoid';

// const TaskData = {
//   userInputTaskData({ name, date, description }) {
//     const taskName = document.querySelector('#task-name').value;
//     const taskDescription = document.querySelector('#description').value;
//     const taskDate = document.querySelector('#due-date').value;

//     const data = {
//       taskName: name,
//       taskDate: date,
//       taskDescription: description,
//     };
//     return data;
//   },
// };

// export default TaskData;

class CreateNewTask {
  constructor({ name, date, description }) {
    this.id = nanoid();
    this.name = name;
    this.date = date;
    this.description = description;
  }
}

export default CreateNewTask;
