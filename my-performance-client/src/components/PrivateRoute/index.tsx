import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../auth';
import routeNames from '../../routes/routeNames';
import FullScreenLoader from '../FullScreenLoader';

const useStyles = makeStyles(() => ({
  container: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
  },
}));

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}: RouteProps): JSX.Element => {
  const { isAuthenticated, loading } = useAuth();
  const styles = useStyles();
  const onRender = React.useCallback(
    (props): JSX.Element | null => {
      if (loading) {
        return (
          <div className={styles.container}>
            <FullScreenLoader />
          </div>
        );
      }
      if (isAuthenticated && Component) {
        return <Component {...props} />;
      }
      return <Redirect to={routeNames.home} />;
    },
    [isAuthenticated, loading, Component, styles],
  );

  return <Route path={path} render={onRender} {...rest} />;
};

export default PrivateRoute;
