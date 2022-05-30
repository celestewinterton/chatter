import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'
import './NavBar.css'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <div className='profile-container'>
        {user.username}
        <img className="user-image-nav"
          src={user.photo}
          onClick={openMenu}
        />
      </div>
      {showMenu && (
        <li className="profile-dropdown">
          <div className='dropdown-list'>
            {/* <a>{user.username}</a> */}
            <a>{user.email}</a>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </li>
      )}
    </div>
  );
}

export default ProfileButton;
