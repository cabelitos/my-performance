import React from 'react';
import { useSnackbar } from 'notistack';

const useShowSnackBar = (
  successMessage: string | null | undefined,
  success: boolean | null | undefined,
  error: Error | null | undefined,
): void => {
  const { enqueueSnackbar } = useSnackbar();
  const enqueueRef = React.useRef(enqueueSnackbar);
  const messageRef = React.useRef(successMessage);
  enqueueRef.current = enqueueSnackbar;
  messageRef.current = successMessage;
  React.useEffect((): void => {
    if (error) {
      enqueueRef.current(error.message, { variant: 'error' });
    }
  }, [error]);
  React.useEffect((): void => {
    if (success && messageRef.current) {
      enqueueRef.current(messageRef.current, { variant: 'success' });
    }
  }, [success]);
};

export default useShowSnackBar;
