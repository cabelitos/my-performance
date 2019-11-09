import { RouteProps } from 'react-router-dom';

import Home from './home';
import routeNames from './routeNames';

export interface Route extends Pick<RouteProps, 'component'> {
  path: string;
}

const routes: Route[] = [
  {
    path: routeNames.home,
    component: Home,
  },
];

export default routes;
