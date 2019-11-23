import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import useDeletePerformanceEntry from '../../../graphql/delete-performance';
import useShowSnackBar from '../../../hooks/useShowSnackBar';

interface Props {
  children: React.ReactNode;
  id?: string;
  isDelete?: boolean;
  isFirst: boolean;
  isHeader: boolean;
  onCloseOpenDialog?(cb: () => void): void;
}

export const Constants = {
  headerHeight: 60,
  itemHeight: 100,
};

const useStyles = makeStyles((theme: Theme) => ({
  common: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  headerItem: {
    height: Constants.headerHeight,
  },
  bodyItem: {
    height: Constants.itemHeight,
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 9,
    },
  },
}));

const TableHeader = ({
  children,
  id,
  isDelete,
  isFirst,
  isHeader,
  onCloseOpenDialog,
}: Props): JSX.Element => {
  const styles = useStyles();
  const [deleteEntry, { data, error, loading }] = useDeletePerformanceEntry();
  useShowSnackBar('Performance entry deleted', !!data, error);
  const onDeleteClicked = React.useCallback((): void => {
    if (!id || !onCloseOpenDialog) return;
    onCloseOpenDialog((): void => {
      deleteEntry({
        variables: {
          id,
        },
      });
    });
  }, [deleteEntry, id, onCloseOpenDialog]);
  let content;
  if (isDelete) {
    content = (
      <Button onClick={onDeleteClicked}>
        {loading ? <CircularProgress /> : <DeleteIcon />}
      </Button>
    );
  } else {
    content = (
      <Typography variant={isHeader ? 'h6' : 'body1'} className={styles.text}>
        {children}
      </Typography>
    );
  }
  return (
    <TableCell
      component="div"
      variant={isHeader ? 'head' : 'body'}
      className={`${styles.common} ${
        isHeader ? styles.headerItem : styles.bodyItem
      }`}
      align={isFirst ? 'left' : 'right'}
    >
      {content}
    </TableCell>
  );
};

export default TableHeader;
