import '../../components/user-task';

const InboxPage = {
  async render() {
    return `
     <div class="menu-title">Inbox</div>
     <user-task></user-task>
    `;
  },

  // async afterRender() {},
};

export default InboxPage;
