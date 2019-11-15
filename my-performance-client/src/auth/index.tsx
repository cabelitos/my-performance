/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import { History } from 'history';
import { useHistory } from 'react-router-dom';

import routeNames from '../routes/routeNames';

interface Props {
  children: React.ReactNode;
}

interface LoginArgs {
  appState?: {
    targetUrl?: string;
  };
}

export interface User {
  name: string;
  nickname: string;
  email: string;
  picture: string;
}

interface Context {
  isAuthenticated: boolean;
  loading: boolean;
  loginWithRedirect(args?: LoginArgs): Promise<void>;
  getToken(): Promise<string>;
  logout(): void;
  user?: User | null;
}
const onRedirectCallback = (
  history: History,
  appState: { targetUrl?: string },
): void => {
  history.replace(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

const AuthContext = React.createContext<Context>({
  isAuthenticated: false,
  loading: false,
  user: null,
  loginWithRedirect: () => Promise.resolve(),
  getToken: () => Promise.resolve(''),
  logout: () => {},
});

export const useAuth = (): Context => React.useContext(AuthContext);

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [auth0Client, setAuth0] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<User | null | undefined>();
  const isMounted = React.useRef(false);
  const history = useHistory();
  const historyRef = React.useRef(history);
  historyRef.current = history;

  React.useEffect(() => {
    const initAuth0 = async (): Promise<void> => {
      try {
        let redirectCalled = false;
        const auth0FromHook = await createAuth0Client({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
          domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
          redirect_uri: window.location.origin,
        });

        if (!isMounted.current) return;

        setAuth0(auth0FromHook);

        if (window.location.search.includes('code=')) {
          const { appState } = await auth0FromHook.handleRedirectCallback();
          if (!isMounted.current) return;
          onRedirectCallback(historyRef.current, appState);
          redirectCalled = true;
        }

        const isAuth = await auth0FromHook.isAuthenticated();
        let hookUser;
        if (isAuth) {
          hookUser = await auth0FromHook.getUser();
        }
        if (isMounted.current) {
          if (isAuth && !redirectCalled) {
            onRedirectCallback(historyRef.current, {
              targetUrl: routeNames.dashboard,
            });
          }
          setUser(hookUser);
          setIsAuthenticated(isAuth);
        }
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };
    isMounted.current = true;
    initAuth0();
    return (): void => {
      isMounted.current = false;
    };
  }, []);

  const value = React.useMemo(
    (): Context => ({
      isAuthenticated,
      loading,
      user,
      loginWithRedirect: async (args: LoginArgs = {}): Promise<void> => {
        if (auth0Client) {
          setLoading(true);
          try {
            await auth0Client.loginWithRedirect(args);
            const newUser = await auth0Client.getUser();
            if (isMounted.current) setUser(newUser);
          } finally {
            if (isMounted.current) setLoading(false);
          }
        }
      },
      logout: (): void => {
        if (auth0Client) auth0Client.logout();
      },
      getToken: (): Promise<string> => {
        if (!auth0Client) {
          throw new Error('');
        }
        return auth0Client.getTokenSilently();
      },
    }),
    [isAuthenticated, loading, auth0Client, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
