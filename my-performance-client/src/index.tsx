import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import theme from './theme';
import routes from './routes';
import AuthProvider from './auth';
import PrivateRoute from './components/PrivateRoute';
import ApolloContext from './graphql/context';

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
