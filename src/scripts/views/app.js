import DrawerInitiator from '../utils/drawer-initiator';
import addTaskUIHelper from '../utils/addtask-UI-helper';

class App {
  constructor({ buttonHamburger, drawer, addTask, inputBox, priority, projectName }) {
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
}

export default App;
