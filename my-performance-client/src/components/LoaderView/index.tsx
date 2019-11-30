import React from 'react';

import FullScreenLoader from '../FullScreenLoader';
import ErrorView from '../ErrorView';

interface Props {
  children: JSX.Element;
  data?: unknown | null;
  error?: Error | null;
  loading: boolean;
  onRetry(): void;
}

const LoaderView = ({
  children,
  data,
  error,
  loading,
  onRetry,
}: Props): JSX.Element => {
  if (loading) {
    return <FullScreenLoader />;
  }

  if (error || !data) {
    return <ErrorView onClick={onRetry} />;
  }

  return children;
};

export default LoaderView;
