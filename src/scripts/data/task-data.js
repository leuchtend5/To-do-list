class TaskData {
  static userInputTaskData() {
    const taskName = document.querySelector('#task-name').value;
    const taskDescription = document.querySelector('#description').value;
    const taskDate = document.querySelector('#due-date').value;
    return { taskName, taskDescription, taskDate };
  }
}

export default TaskData;
