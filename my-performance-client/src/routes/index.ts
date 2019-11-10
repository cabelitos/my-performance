import { RouteProps } from 'react-router-dom';

import Home from './home';
import Dashboard from './dashboard';
import routeNames from './routeNames';

export interface Route extends Pick<RouteProps, 'component' | 'exact'> {
  path: string;
  isPrivate: boolean;
}

const routes: Route[] = [
  {
    path: routeNames.dashboard,
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: routeNames.home,
    component: Home,
    isPrivate: false,
  },
];

export default routes;
