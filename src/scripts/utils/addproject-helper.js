import '../components/new-project';

const AddProjectHelper = {
  init({ button, container, counter }) {
    let totalProject = 0;
    button.addEventListener('click', () => {
      if (totalProject < 5) {
        const newProject = document.createElement('new-project');
        container.appendChild(newProject);
        totalProject += 1;
        counter.textContent = `(${totalProject}/5)`;
      }
    });
  },
};

export default AddProjectHelper;
