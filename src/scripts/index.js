import 'regenerator-runtime';
import '../styles/css/main.css';
import App from './views/app';

const listName = document.querySelectorAll('li');
const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const menuList = document.querySelector('.all-menu');
const footerText = document.querySelector('.footer-text');

function sampleOnly() {
  // listName.forEach((list) => {
  //   if (list.textContent.length > 15) {
  //     list.textContent = `${list.textContent.substring(0, 15)}...`;
  //   }
  // });

  let menuToggle = true;

  hamburgerMenuBtn.addEventListener('click', () => {
    if (menuToggle) {
      menuList.classList.add('active');
      menuToggle = !menuToggle;
    } else {
      menuList.classList.remove('active');
      menuToggle = !menuToggle;
    }
  });
}

const newDate = new Date().getFullYear();
footerText.textContent = `Copyright © ${newDate} Leuchtend`;

// sampleOnly();
