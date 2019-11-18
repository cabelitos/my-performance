import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));

interface Props {
  onClick(): void;
}

const FullScreenLoader = ({ onClick }: Props): JSX.Element => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Could not load the data
      </Typography>
      <Button variant="contained" color="primary" onClick={onClick}>
        Retry
      </Button>
    </div>
  );
};

export default FullScreenLoader;
