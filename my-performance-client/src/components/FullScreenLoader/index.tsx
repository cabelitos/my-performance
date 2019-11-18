import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const FullScreenLoader = (): JSX.Element => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  );
};

export default FullScreenLoader;
