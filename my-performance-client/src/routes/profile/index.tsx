import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { useAuth } from '../../auth';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 100,
    height: 100,
    background: theme.palette.secondary.light,
    marginBottom: theme.spacing(4),
  },
  textSpacer: {
    marginBottom: theme.spacing(2),
  },
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
}));

const fakeUser = {
  email: 'unknown',
  nickname: 'Unknown',
  picture: null,
};

const Profile = (): JSX.Element => {
  const { logout, user } = useAuth();
  const styles = useStyles();
  const { nickname, email, picture } = user || fakeUser;
  return (
    <div className={styles.root}>
      <Avatar
        alt="nickname photo"
        src={picture || ''}
        className={styles.avatar}
      >
        {nickname.substring(0, 2).toLocaleUpperCase()}
      </Avatar>
      <Typography variant="h4" className={styles.textSpacer}>
        {nickname}
      </Typography>
      <Typography variant="h5" className={styles.textSpacer}>
        {email}
      </Typography>
      <Button variant="contained" onClick={logout} color="primary">
        Logout
      </Button>
    </div>
  );
};

export default Profile;
