import { LitElement, css, html } from 'lit';

class UserTask extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    .test {
      color: red;
      z-index: 100;
      top: 200px;
      position: absolute;
    }
  `;

  render() {
    return html` <div class="test">KAOJOSDK</div> `;
  }

  // render() {
  //   this.innerHTML = `
  //     <style>
  //       .test {
  //         color: red;
  //         z-index: 100;
  //         top: 200px;
  //         position: absolute;
  //       }
  //     </style>

  //     <div class="test">KAOJOSDK</div>
  //   `;
  // }
}

customElements.define('user-task', UserTask);
