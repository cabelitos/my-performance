import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';

import { useAuth } from '../../auth';
import routeNames from '../routeNames';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: '100vw',
  },
  spacer: {
    height: theme.spacing(2),
  },
}));

const Home = (): JSX.Element => {
  const styles = useStyles();
  const { loginWithRedirect, loading } = useAuth();
  const onLogIn = React.useCallback((): void => {
    loginWithRedirect({
      appState: { targetUrl: routeNames.dashboard },
    });
  }, [loginWithRedirect]);
  return (
    <Container className={styles.root}>
      <DirectionsBikeIcon fontSize="large" color="primary" />
      <div className={styles.spacer} />
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Button variant="contained" color="primary" onClick={onLogIn}>
          Log-In
        </Button>
      )}
    </Container>
  );
};

export default Home;
