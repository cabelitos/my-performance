import React from 'react';
import { Link, Switch, RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircle from '@material-ui/icons/AddCircle';
import BarChart from '@material-ui/icons/BarChart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';

import AddPerformance from '../add-performance';
import Charts from '../charts';
import Profile from '../profile';
import Classes from '../classes';
import routeNames from '../routeNames';
import PrivateRoute from '../../components/PrivateRoute';

const useStyles = makeStyles((theme: Theme) => ({
  bottomBar: {
    background: theme.palette.primary.light,
  },
  root: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
  },
  routeContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 4),
    flex: 1,
    width: '100%',
    overflowY: 'scroll',
    minHeight: 0,
    '-webkit-overflow-scrolling': 'touch',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0),
    },
  },
}));

const Dashboard = ({
  match: { url, path },
}: RouteComponentProps): JSX.Element => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(2);
  const onSelectedTabChanged = React.useCallback(
    (_: unknown, newTab: number): void => {
      setSelectedTab(newTab);
    },
    [],
  );
  return (
    <div className={styles.root}>
      <div className={styles.routeContainer}>
        <Switch>
          <PrivateRoute
            path={`${path}${routeNames.profile}`}
            component={Profile}
          />
          <PrivateRoute
            path={`${path}${routeNames.add}`}
            component={AddPerformance}
          />
          <PrivateRoute
            path={`${path}${routeNames.classes}`}
            component={Classes}
          />
          <PrivateRoute component={Charts} />
        </Switch>
      </div>
      <BottomNavigation
        value={selectedTab}
        onChange={onSelectedTabChanged}
        showLabels
        className={styles.bottomBar}
      >
        <BottomNavigationAction
          component={Link}
          label="Add"
          to={`${url}${routeNames.add}`}
          icon={<AddCircle />}
        />
        <BottomNavigationAction
          component={Link}
          label="Classes"
          to={`${url}${routeNames.classes}`}
          icon={<DirectionsBikeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          label="Charts"
          to={url}
          icon={<BarChart />}
        />
        <BottomNavigationAction
          component={Link}
          to={`${url}${routeNames.profile}`}
          label="Profile"
          icon={<AccountCircle />}
        />
      </BottomNavigation>
    </div>
  );
};

export default Dashboard;
