import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginFormModal/LoginForm';
import SignUpForm from './components/auth/SignUpFormModal/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Dashboard from './components/Dashboard';
import Groups from './components/Groups/index.js';
import { getGroupRooms, getRooms } from './store/chatRooms';
import { getChannels } from './store/channels';
import SplashPage from './components/SplashPage';
import ErrorPage from './components/404';

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
        <Route exact path='/home'>
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
