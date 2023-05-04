import '../components/user-task';

const ShowTaskHelper = {
  showTask(parentElement, data) {
    // data.forEach((task) => {
    //   const userTask = document.createElement('user-task');
    //   userTask.taskData = task;

    //   parentElement.appendChild(userTask);
    // });
    const userTask = document.createElement('user-task');
    userTask.taskData = data;
    parentElement.appendChild(userTask);
  },

  showAllTask(parentElement, data) {
    data.forEach((task) => {
      const userTask = document.createElement('user-task');
      userTask.taskData = task;

      parentElement.appendChild(userTask);
    });
  },
};

export default ShowTaskHelper;
