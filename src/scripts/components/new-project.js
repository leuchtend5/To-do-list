import { LitElement, html } from 'lit';

class NewProject extends LitElement {
  constructor() {
    super();
  }

  // DISABLE SHADOW DOM
  createRenderRoot() {
    return this;
  }

  limitProjectName(projectName) {
    if (projectName.length > 20) {
      projectName = `${projectName.substring(0, 20)}...`;
      return projectName;
    }
    return projectName;
  }

  render() {
    const checkProjectNameLength = this.limitProjectName('adasdadasdadasdadasadadadadadadqwdq');

    return html`
      <div class="group-name">
        <span>⏺</span>
        <p class="project-name">${checkProjectNameLength}</p>
      </div>
      <span class="total-tasks">13</span>
    `;
  }
}

customElements.define('new-project', NewProject);
