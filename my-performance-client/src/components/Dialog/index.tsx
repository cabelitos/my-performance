import React from 'react';
import Button from '@material-ui/core/Button';
import MaterialDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface Props {
  title: string;
  isOpen: boolean;
  subTitle: string;
  onClose(): void;
  onAgree(): void;
  onDisagree(): void;
}

const Dialog = ({
  title,
  subTitle,
  isOpen,
  onClose,
  onAgree,
  onDisagree,
}: Props): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <MaterialDialog fullScreen={fullScreen} open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subTitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onDisagree}>
          Cancel
        </Button>
        <Button onClick={onAgree} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </MaterialDialog>
  );
};

export default Dialog;
