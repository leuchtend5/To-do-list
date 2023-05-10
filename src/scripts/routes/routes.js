import InboxPage from '../views/pages/inbox';
import TodayPage from '../views/pages/today';
import UpcomingPage from '../views/pages/upcoming';
import CompletedTasksPage from '../views/pages/completed-tasks';
import ProjectPage from '../views/pages/project';

const routes = {
  '/': TodayPage,
  '/inbox': InboxPage,
  '/today': TodayPage,
  '/upcoming': UpcomingPage,
  '/completed': CompletedTasksPage,
  '/project/:id': ProjectPage,
};

export default routes;
