import '../styles/css/main.css';

const listName = document.querySelectorAll('li');

function limitName() {
  listName.forEach((list) => {
    if (list.textContent.length > 15) {
      list.textContent = `${list.textContent.substring(0, 15)}...`;
    }
  });
}

limitName();
