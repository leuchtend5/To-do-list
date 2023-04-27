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
    // const checkProjectNameLength = this.limitProjectName('adasdadasdadasdadasadadadadadadqwdq');

    return html`
      <div class="group-name">
        <span>⏺</span>
        <p class="project-name">${this.limitProjectName()}</p>
      </div>
      <span class="total-tasks">13</span>
    `;
  }
}

customElements.define('new-project', NewProject);
