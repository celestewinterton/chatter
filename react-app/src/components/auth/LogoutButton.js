import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { io } from 'socket.io-client'

let socket;
const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    socket = io()
    socket.emit('log-out', { 'id': sessionUser.id, 'username': sessionUser.username, 'room': 'we-study', 'online': false })
    socket.disconnect();
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
