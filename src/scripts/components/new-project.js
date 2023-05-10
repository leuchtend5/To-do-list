import { LitElement, html } from 'lit';

class NewProject extends LitElement {
  constructor() {
    super();
  }

  // DISABLE SHADOW DOM
  createRenderRoot() {
    return this;
  }

  set projectData(data) {
    this._oldProjectName = data.projectName;
    this._newProjectName = data.projectName;
    this._projectId = data.id;
  }

  get getProjectName() {
    return this._oldProjectName;
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
      <a href="#/project/${this._projectId}">
        <div class="group-name">
          <span>⏺</span>
          <p class="project-name">${this.limitProjectName()}</p>
        </div>
        <span class="total-tasks"></span>
        <div class="edit-project"></div>
      </a>
    `;
  }
}

customElements.define('new-project', NewProject);
