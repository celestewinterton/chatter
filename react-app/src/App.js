import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Dashboard from './components/Dashboard';
import { getGroupRooms } from './store/chatRooms';
import { getChannels } from './store/channels';
import SplashPage from './components/SplashPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getChannels())
      await dispatch(getGroupRooms())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/home'>
          {!sessionUser &&
            <SplashPage />
          }
        </Route>
        <ProtectedRoute path='/' >
          <Dashboard />
        </ProtectedRoute>
        {/* <Route>
          <ErrorPage />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
