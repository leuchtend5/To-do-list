import 'regenerator-runtime';
import '../styles/css/main.css';
import App from './views/app';

const listProjectName = document.querySelectorAll('.project-list .group-name > p');
const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const menuWrapper = document.querySelector('.all-menu');
const header = document.querySelector('header');
const title = document.querySelector('.menu-title');
const addTask = document.querySelector('.add-task');
const taskInputBox = document.querySelector('.task-input');
const priorityBtn = document.querySelector('.priority');

const ObserveElement = {
  observeHeaderHeight() {
    document.documentElement.style.setProperty('--top-header', `${header.offsetHeight}px`);
  },

  observeTitleHeight() {
    document.documentElement.style.setProperty('--top-title', `${title.offsetHeight}px`);
  },

  observeTitleWidth() {
    document.documentElement.style.setProperty('--width-title', `${title.offsetWidth}px`);
  },
};

const app = new App({
  buttonHamburger: hamburgerMenuBtn,
  drawer: menuWrapper,
  addTask,
  inputBox: taskInputBox,
  priority: priorityBtn,
  projectName: listProjectName,
});

const resizeHeaderHeight = new ResizeObserver(ObserveElement.observeHeaderHeight);
const resizeTitleHeight = new ResizeObserver(ObserveElement.observeTitleHeight);
const resizeTitleWidth = new ResizeObserver(ObserveElement.observeTitleWidth);

window.addEventListener('load', () => {
  resizeHeaderHeight.observe(header);
  resizeTitleHeight.observe(title);
  resizeTitleWidth.observe(title);
});
