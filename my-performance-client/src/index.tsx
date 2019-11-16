import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, WithSnackbarProps } from 'notistack';

import theme from './theme';
import routes from './routes';
import AuthProvider from './auth';
import PrivateRoute from './components/PrivateRoute';
import ApolloContext from './graphql/context';

const anchorOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right',
};

const App = (): JSX.Element => {
  const snackProviderRef = React.useRef<WithSnackbarProps | null>(null);
  const onCloseSnackBar = React.useCallback((key: string): void => {
    if (snackProviderRef.current) {
      snackProviderRef.current.closeSnackbar(key);
    }
  }, []);
  const snackBarAction = React.useCallback(
    (key: string): JSX.Element => (
      <Button onClick={(): void => onCloseSnackBar(key)}>Dismiss</Button>
    ),
    [onCloseSnackBar],
  );
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        action={snackBarAction}
        ref={snackProviderRef}
        maxSnack={3}
        anchorOrigin={anchorOrigin}
      >
        <BrowserRouter>
          <AuthProvider>
            <ApolloContext>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CssBaseline />
                <Switch>
                  {routes.map(
                    ({ isPrivate, ...rest }): JSX.Element =>
                      isPrivate ? (
                        <PrivateRoute {...rest} key={rest.path} />
                      ) : (
                        <Route {...rest} key={rest.path} />
                      ),
                  )}
                </Switch>
              </MuiPickersUtilsProvider>
            </ApolloContext>
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
