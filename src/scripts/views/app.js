import DrawerInitiator from '../utils/drawer-initiator';
import routes from '../routes/routes';
import ObserveElement from '../utils/observe-element';
import UrlParser from '../routes/url-parser';
import AddProjectHelper from '../utils/addproject-helper';
import OverlayInitiator from '../utils/overlay-initiator';

class App {
  constructor({
    content,
    buttonHamburger,
    drawer,
    addProjectBtn,
    projectContainer,
    projectCounter,
    overlay,
    projectForm,
    confirmNewProjectBtn,
    cancelNewProjectBtn,
    userInputNewProjectName,
  }) {
    this._content = content;
    this._buttonHamburger = buttonHamburger;
    this._drawer = drawer;
    this._addProjectBtn = addProjectBtn;
    this._container = projectContainer;
    this._counter = projectCounter;
    this._overlay = overlay;
    this._projectForm = projectForm;
    this._confirmNewProjectBtn = confirmNewProjectBtn;
    this._cancelNewProjectBtn = cancelNewProjectBtn;
    this._userInputNewProjectName = userInputNewProjectName;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._buttonHamburger,
      drawer: this._drawer,
    });

    AddProjectHelper.init({
      addButton: this._addProjectBtn,
      container: this._container,
      counter: this._counter,
      projectForm: this._projectForm,
      overlay: this._overlay,
      confirmButton: this._confirmNewProjectBtn,
      cancelButton: this._cancelNewProjectBtn,
      userInput: this._userInputNewProjectName,
    });

    OverlayInitiator.drawer(this._buttonHamburger, this._overlay);
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    const title = document.querySelector('.menu-title');
    await page.afterRender();

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
