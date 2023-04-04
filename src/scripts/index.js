import 'regenerator-runtime';
import '../styles/css/main.css';
import App from './views/app';
import ObserveElement from './utils/observe-element';

const listProjectName = document.querySelectorAll('.project-list .group-name > p');
const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const menuWrapper = document.querySelector('.all-menu');
const header = document.querySelector('header');
const addTask = document.querySelector('.add-task');
const taskInputBox = document.querySelector('.task-input');
const priorityBtn = document.querySelector('.priority');
const content = document.querySelector('.content');

const app = new App({
  content,
  buttonHamburger: hamburgerMenuBtn,
  drawer: menuWrapper,
  addTask,
  inputBox: taskInputBox,
  priority: priorityBtn,
  projectName: listProjectName,
});

window.addEventListener('load', async () => {
  await app.renderPage();

  const resizeHeaderHeight = new ResizeObserver(() => {
    ObserveElement.observeHeaderHeight(header);
  });
  resizeHeaderHeight.observe(header);
});

window.addEventListener('hashchange', async () => {
  await app.renderPage();
});
