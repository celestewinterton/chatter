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
    <div className="profile-and-dropdown">
      <div className='profile-container'>
        <img className="user-image-nav-1"
          src={user.photo}
          onClick={openMenu}
        />
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className='profile-dropdown-content'>
            <div className="profile-dropdown-name">
              <img className="user-image-nav-2"
                src={user.photo}
                onClick={openMenu}
              />
              <a>{user.username}</a>
            </div>
            <div className="line"></div>
            <div className="profile-link-container">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
