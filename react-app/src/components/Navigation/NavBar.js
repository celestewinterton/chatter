
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import DemoUser from '../auth/DemoUser/DemoUser';
import './NavBar.css'
import chatter from "../../images/chatter.png"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks
  if (!sessionUser) {
    sessionLinks = (
      <div className='nav-container'>
        <div className='nav-left'>
            <NavLink className='nav-app-name' to='/home'>
              <a>
                <img className='logo' src={chatter}/>
              </a>
            </NavLink>
        </div>
        <div className='nav-right'>
          <div className='ui-buttons'>
            <LoginFormModal />
            <SignUpFormModal />
          </div>
        </div>
      </div>
    )
  } else {
    sessionLinks = (
      <div className='nav-profile'>
        <ProfileButton user={sessionUser} />
      </div>
    )
  }


  return (
    <div className='navbar-container'>
      <nav>
        <ul className='navbar-ul'>
          <li className='navbar-li'>
            {sessionLinks}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
