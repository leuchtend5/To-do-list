import { LitElement, html } from 'lit';

class UserTask extends LitElement {
  constructor() {
    super();
  }

  // DISABLE SHADOW DOM
  createRenderRoot() {
    return this;
  }

  set taskData(data) {
    this._taskName = data.taskName;
  }

  render() {
    return html`
      <div class="task-wrapper">
        <span>⏺</span>
        <div>
          <p>First task</p>
          <p class="task-desc">
            Description alalalalwejfncwkckwenfwjkenfkwn cwbwebgkwjenfkwefv wkej
          </p>
          <div class="task-date">
            <i class="fa-regular fa-calendar"></i>
            <p>31 Mar</p>
          </div>
          <div class="edit-panel">
            <div class="edit-btn">
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div class="delete-btn">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('user-task', UserTask);
