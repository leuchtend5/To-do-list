import DrawerInitiator from '../utils/drawer-initiator';
import routes from '../routes/routes';
import ObserveElement from '../utils/observe-element';
import UrlParser from '../routes/url-parser';

class App {
  constructor({ content, buttonHamburger, drawer, projectName }) {
    this._content = content;
    this._buttonHamburger = buttonHamburger;
    this._drawer = drawer;
    this._projectName = projectName;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._buttonHamburger,
      drawer: this._drawer,
      projectName: this._projectName,
    });
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
