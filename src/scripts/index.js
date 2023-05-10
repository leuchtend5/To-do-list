import 'regenerator-runtime';
import '../styles/css/main.css';
import App from './views/app';
import ObserveElement from './utils/observe-element';

const addNewProjectBtn = document.querySelector('.project-group .fa-plus');
const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const menuWrapper = document.querySelector('.all-menu');
const header = document.querySelector('header');
const content = document.querySelector('.content');
const projectList = document.querySelector('.project-list');
const projectCounter = document.querySelector('.project-counter');
const overlay = document.querySelector('.overlay');
const newProjectForm = document.querySelector('.add-project-form');
const confirmNewProjectBtn = document.querySelector('.add-project-name-btn');
const cancelNewProjectBtn = document.querySelector('.cancel-project-name-btn');
const userInputNewProjectName = document.querySelector('#project-name');

const app = new App({
  content,
  buttonHamburger: hamburgerMenuBtn,
  drawer: menuWrapper,
  addProjectBtn: addNewProjectBtn,
  projectContainer: projectList,
  projectCounter,
  overlay,
  projectForm: newProjectForm,
  confirmNewProjectBtn,
  cancelNewProjectBtn,
  userInputNewProjectName,
});

const resizeHeaderHeight = new ResizeObserver(() => {
  ObserveElement.observeHeaderHeight(header);
});
resizeHeaderHeight.observe(header);

window.addEventListener('load', async () => {
  await app.renderPage();
});

window.addEventListener('hashchange', async () => {
  await app.renderPage();
});
