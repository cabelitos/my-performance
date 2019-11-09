import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

const Home = (): JSX.Element => {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      <Typography
        color="textPrimary"
        component="h2"
        variant="h2"
        className={styles.title}
      >
        My Performance
      </Typography>
      <Button variant="contained" color="secondary" component="a">
        Log-In
      </Button>
    </Container>
  );
};

export default Home;
