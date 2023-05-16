import '../components/user-task';
// import AddTaskUIHelper from './addtask-UI-helper';

const ShowTaskHelper = {
  showTask(parentElement, data) {
    const userTask = document.createElement('user-task');
    userTask.taskData = data;
    parentElement.appendChild(userTask);

    // userTask.addEventListener('edit-task', () => {
    //   const inputBoxes = document.querySelectorAll('task-input');
    //   inputBoxes.forEach((inputBox) => {
    //     inputBox.remove();
    //   });
    // });
  },

  showAllTask(parentElement, data) {
    data.forEach((task) => {
      const userTask = document.createElement('user-task');
      userTask.taskData = task;

      parentElement.appendChild(userTask);
    });
  },

  // _editTask(parentElement, task) {
  //   const taskInputBox = document.createElement('task-input');
  //   task.insertAdjacentElement('afterend', taskInputBox);
  //   const title = document.querySelector('.menu-title').textContent.toLowerCase();

  //   AddTaskUIHelper.init({
  //     taskInputBox,
  //     title,
  //     taskContainer: parentElement,
  //   });
  // },
};

export default ShowTaskHelper;
