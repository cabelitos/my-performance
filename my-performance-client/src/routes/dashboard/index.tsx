import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { useAuth } from '../../auth';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: '100vw',
  },
  title: {
    marginBottom: theme.spacing(8),
  },
}));

const Dashboard = (): JSX.Element => {
  const styles = useStyles();
  const { logout } = useAuth();
  const onLogout = React.useCallback((): void => {
    logout();
  }, [logout]);
  return (
    <Container className={styles.root}>
      <Button variant="contained" color="secondary" onClick={onLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
