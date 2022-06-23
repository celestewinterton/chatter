import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'
import './NavBar.css'
import { useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

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
    history.push('/')
  };

  return (
    <div className="profile-and-dropdown">
      <div className='profile-container'>
        <div className="profile-active-image-container">
          <img className="user-image-nav-1"
            src={user.photo} alt=""
            onClick={openMenu}
          />
          <div className={(user.online) ? 'status-circle online-profile' : 'status-circle offline-profile'}>
            <div className='inner-circle-profile'></div>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className='profile-dropdown-content'>
            <div className="profile-dropdown-name">
              <img className="user-image-nav-2"
                src={user.photo} alt=""
                onClick={openMenu}
              />
              <div className="profile-username">{user.username}</div>
              <div className={(user.online) ? 'status-circle online-profile1' : 'status-circle offline-profile1'}>
                <div className='inner-circle-profile'></div>
              </div>
              <div className="status">
              </div>
            </div>


            <div className="line"></div>
            <div className="profile-item">Meet the developers</div>

            <div className="profile-item blue-hover">
              <div>Austin Dang</div>
              <div>
                <a className="unset" href="https://www.linkedin.com/in/austin-dang-106834191/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a className="unset" href="https://github.com/AuDang" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>

            <div className="profile-item blue-hover">
              <div>Brendan Downing</div>
              <div>
                <a className="unset" href="https://www.linkedin.com/in/brendan-downing-641672228/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a className="unset" href="https://github.com/Downster" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>

            <div className="profile-item blue-hover">
              <div>Celeste Winterton</div>
              <div>
                <a className="unset" href="https://angel.co/u/celeste-winterton" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-angellist"></i>
                </a>
                <a className="unset" href="https://www.linkedin.com/in/celestewinterton/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a className="unset" href="https://github.com/celestewinterton" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>

            <div className="profile-item blue-hover">
              <div>Jingling Jin</div>
              <div>
                <a className="unset" href="https://www.linkedin.com/in/jingling-jin-4641961a9/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a className="unset" href="https://github.com/ellen20" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
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
