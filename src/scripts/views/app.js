import DrawerInitiator from '../utils/drawer-initiator';
import addTaskUIHelper from '../utils/addtask-UI-helper';
import routes from '../routes/routes';
import ObserveElement from '../utils/observe-element';

class App {
  constructor({ content, buttonHamburger, drawer, addTask, inputBox, priority, projectName }) {
    this._content = content;
    this._buttonHamburger = buttonHamburger;
    this._drawer = drawer;
    this._addTask = addTask;
    this._inputBox = inputBox;
    this._priority = priority;
    this._projectName = projectName;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._buttonHamburger,
      drawer: this._drawer,
      projectName: this._projectName,
    });

    addTaskUIHelper.init({
      addTask: this._addTask,
      inputBox: this._inputBox,
      priority: this._priority,
    });
  }

  async renderPage() {
    const url = window.location.hash.slice(1).toLowerCase();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    const title = document.querySelector('.menu-title');

    const resizeTitleHeight = new ResizeObserver(() => {
      ObserveElement.observeTitleHeight(title);
    });

    const resizeTitleWidth = new ResizeObserver(() => {
      ObserveElement.observeTitleWidth(title);
    });

    resizeTitleHeight.observe(title);
    resizeTitleWidth.observe(title);
  }
}

export default App;
