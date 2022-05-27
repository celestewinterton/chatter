
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

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
       <ProfileButton user={sessionUser}/>
     </div>
   )
 }


  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          {/* <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink> */}
        </li>
        <li>
          {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink> */}
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          {/* <LogoutButton /> */}
          {sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
