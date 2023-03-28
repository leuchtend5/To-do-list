import 'regenerator-runtime';
import '../styles/css/main.css';
import App from './views/app';

const listProjectName = document.querySelectorAll('.project-list .group-name > p');
const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const menuList = document.querySelector('.all-menu');
const footerText = document.querySelector('.footer-text');
const overlay = document.querySelector('.overlay');
const content = document.querySelector('.content');

function sampleOnly() {
  listProjectName.forEach((list) => {
    if (list.textContent.length > 25) {
      list.textContent = `${list.textContent.substring(0, 25)}...`;
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
}

const newDate = new Date().getFullYear();
footerText.textContent = `Copyright © ${newDate} Leuchtend`;

sampleOnly();
