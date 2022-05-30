
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks
  if (!sessionUser) {
    sessionLinks = (
      <div>
        <LoginFormModal />
        <SignUpFormModal />
      </div>
    )
  } else {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    )
  }


  return (
    <div className='navbar-container'>
      <nav>
        <ul>
          <li>
            {/* <LogoutButton /> */}
            {sessionLinks}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
