const TaskPriorityColor = (flag, task) => {
  const taskColor = task.querySelector('.fa-circle');

  switch (flag) {
    case '<i class="fa-solid fa-flag p-one"></i> Priority 1':
      taskColor.style.color = 'red';
      break;
    case '<i class="fa-solid fa-flag p-two"></i> Priority 2':
      taskColor.style.color = 'orange';
      break;
    case '<i class="fa-solid fa-flag p-three"></i> Priority 3':
      taskColor.style.color = 'blue';
      break;
    default:
      taskColor.style.color = 'green';
  }
};

export default TaskPriorityColor;
