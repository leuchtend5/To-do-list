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

const app = new App({
  content,
  buttonHamburger: hamburgerMenuBtn,
  drawer: menuWrapper,
  addProjectBtn: addNewProjectBtn,
  projectContainer: projectList,
  projectCounter,
  overlay,
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

  const resizeHeaderHeight = new ResizeObserver(() => {
    ObserveElement.observeHeaderHeight(header);
  });
  resizeHeaderHeight.observe(header);
});
