import 'regenerator-runtime';
import '../styles/css/main.css';
import App from './views/app';

const listProjectName = document.querySelectorAll('.project-list .group-name > p');
const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const menuList = document.querySelector('.all-menu');
const overlay = document.querySelector('.overlay');
const content = document.querySelector('.content');
const header = document.querySelector('header');
const title = document.querySelector('.menu-title');

function observeHeaderHeight() {
  document.documentElement.style.setProperty('--top-header', `${header.offsetHeight}px`);
}

function observeTitleHeight() {
  document.documentElement.style.setProperty('--top-title', `${title.offsetHeight}px`);
}

function observeTitleWidth() {
  document.documentElement.style.setProperty('--width-title', `${title.offsetWidth}px`);
}

function sampleOnly() {
  listProjectName.forEach((list) => {
    if (list.textContent.length > 20) {
      list.textContent = `${list.textContent.substring(0, 20)}...`;
    }
  });

  let menuToggle = true;

  hamburgerMenuBtn.addEventListener('click', () => {
    if (menuToggle) {
      menuList.classList.add('active');
      overlay.classList.add('active');
      content.classList.add('active');
      menuToggle = !menuToggle;
    } else {
      menuList.classList.remove('active');
      overlay.classList.remove('active');
      content.classList.remove('active');
      menuToggle = !menuToggle;
    }
  });

  const resizeHeaderHeight = new ResizeObserver(observeHeaderHeight);
  const resizeTitleHeight = new ResizeObserver(observeTitleHeight);
  const resizeTitleWidth = new ResizeObserver(observeTitleWidth);
  resizeHeaderHeight.observe(header);
  resizeTitleHeight.observe(title);
  resizeTitleWidth.observe(title);
}

sampleOnly();
