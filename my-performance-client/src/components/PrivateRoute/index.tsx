import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../../auth';
import routeNames from '../../routes/routeNames';

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}: RouteProps): JSX.Element => {
  const { isAuthenticated, loading } = useAuth();

  const onRender = React.useCallback(
    (props): JSX.Element | null => {
      if (loading) {
        return null;
      }
      if (isAuthenticated && Component) {
        return <Component {...props} />;
      }
      return <Redirect to={routeNames.home} />;
    },
    [isAuthenticated, loading, Component],
  );

  return <Route path={path} render={onRender} {...rest} />;
};

export default PrivateRoute;
