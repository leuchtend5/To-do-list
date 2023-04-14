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
      <div class="task-input">
        <div class="task-name">
          <input type="text" id="task-name" placeholder="Task name" />
        </div>
        <div class="description">
          <input type="text" id="description" placeholder="Description" />
        </div>
        <div class="set-panel">
          <div class="due-date">
            <input type="date" id="due-date" />
          </div>
          <button class="priority">
            <div class="current-flag">
              <span><i class="fa-solid fa-flag p-four"></i></span>
              <p>Priority 4</p>
            </div>
            <div class="flag-dropdown">
              <ul>
                <li>
                  <span><i class="fa-solid fa-flag p-one"></i></span>
                  <p>Priority 1</p>
                </li>
                <li>
                  <span><i class="fa-solid fa-flag p-two"></i></span>
                  <p>Priority 2</p>
                </li>
                <li>
                  <span><i class="fa-solid fa-flag p-three"></i></span>
                  <p>Priority 3</p>
                </li>
                <li>
                  <span><i class="fa-solid fa-flag p-four"></i></span>
                  <p>Priority 4</p>
                </li>
              </ul>
            </div>
          </button>
        </div>
        <div class="decision-panel">
          <div class="yes-no-btn">
            <button class="cancel-btn">Cancel</button>
            <button class="add-btn disable">Add Task</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('add-task', AddTask);
