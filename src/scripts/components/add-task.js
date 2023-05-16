import { LitElement, html } from 'lit';

class AddTask extends LitElement {
  constructor() {
    super();
  }

  // DISABLE SHADOW DOM
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="add-task">
        <span>
          <i class="fa-solid fa-plus"></i>
        </span>
        <p>Add task</p>
      </div>
    `;
  }
}

customElements.define('add-task', AddTask);
