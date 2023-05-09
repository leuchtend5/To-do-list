import { LitElement, html } from 'lit';

class NewProject extends LitElement {
  constructor() {
    super();
  }

  // DISABLE SHADOW DOM
  createRenderRoot() {
    return this;
  }

  set newProjectName(name) {
    this._newProjectName = name;
  }

  limitProjectName() {
    if (this._newProjectName.length > 17) {
      this._newProjectName = `${this._newProjectName.substring(0, 17)}...`;
      return this._newProjectName;
    }
    return this._newProjectName;
  }

  render() {
    return html`
      <a href="#/project/${this._newProjectName}">
        <div class="group-name">
          <span>⏺</span>
          <p class="project-name">${this.limitProjectName()}</p>
        </div>
        <span class="total-tasks">13</span>
        <div class="edit-project"></div>
      </a>
    `;
  }
}

customElements.define('new-project', NewProject);
