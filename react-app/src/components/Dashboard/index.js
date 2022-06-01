import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getGroupRooms } from '../../store/chatRooms';
import { getChannels } from '../../store/channels';
import ProtectedRoute from '../auth/ProtectedRoute';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal';
import Groups from '../Groups';
import { io } from 'socket.io-client'
import CreateGroupModal from '../Groups/CreateGroupModal'
import LeftMenu from '../LeftMenu'
import './Dashboard.css'
import { loadUsers } from '../../store/users';
import GroupForm from '../Groups/GroupForm';
import { reloadCurrentUser } from '../../store/session';

let socket;
const Dashboard = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   useEffect(() => {
      dispatch(reloadCurrentUser(sessionUser.id))
      socket = io();
      socket.emit('sign-in', { 'id': sessionUser.id, 'username': sessionUser.username, 'room': 'chatter', 'online': true })

      socket.on('sign-in', (data) => {
         dispatch(loadUsers())
      });

      socket.on('log-out', (data) => {
         dispatch(loadUsers())
      })

      socket.on('delete-channel', (data) => {
         console.log('deletingggggg')
         dispatch(reloadCurrentUser(sessionUser.id))
      })

      return (() => {
         socket.emit('log-out', { 'id': sessionUser.id, 'username': sessionUser.username, 'room': 'chatter', 'online': false })
         socket.disconnect();
      });
   }, [dispatch])



   return (
      <>

         <div className='dashboard-container'>
            <LeftMenu />
            <Switch>
               <ProtectedRoute path='/' exact={true} >
                  <div className='app-body'>
                     <Channels all={true} />
                  </div>
               </ProtectedRoute>
               <ProtectedRoute path='/channels/:id' exact={true} >
                  <div className='app-body'>
                     <Channels single={true} />
                  </div>
               </ProtectedRoute>
               <ProtectedRoute path='/groups/new' exact={true} >
                  <div className='app-body'>
                     <Groups form={true} />
                  </div>
               </ProtectedRoute>
               <ProtectedRoute path='/groups/:id' exact={true} >
                  <div className='app-body'>
                     <Groups single={true} />
                  </div>
               </ProtectedRoute>
            </Switch>
         </div>
      </>
   )
}
export default Dashboard
