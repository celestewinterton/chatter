
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Search from './Search';
import SearchInput from './Search/SearchInput';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks
  let search
  if (!sessionUser) {
    sessionLinks = (
      <div>
        <LoginFormModal />
        <SignUpFormModal />
      </div>
    )
  } else {
    search = (
      <div>
        <SearchInput />
      </div>
    )
    sessionLinks = (
      <div className='navbar-profile-container'>
        <ProfileButton user={sessionUser} />
      </div>
    )
  }


  return (
    <div className='navbar-container'>
        {search}
        {sessionLinks}
    </div>
  );
}

export default NavBar;
