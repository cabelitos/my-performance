import React from 'react';
import { useSnackbar } from 'notistack';

const useSuccessSnackMessage = (): ((message: string) => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const enqueueRef = React.useRef(enqueueSnackbar);
  enqueueRef.current = enqueueSnackbar;
  return React.useCallback((message: string): void => {
    enqueueRef.current(message, { variant: 'success' });
  }, []);
};

export default useSuccessSnackMessage;
