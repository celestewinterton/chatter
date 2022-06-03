import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Channels from '../Channels';
import Groups from '../Groups';
import { io } from 'socket.io-client'
import LeftMenu from '../LeftMenu'
import './Dashboard.css'
import { loadUsers } from '../../store/users';
import GroupForm from '../Groups/GroupForm';
import { reloadCurrentUser } from '../../store/session';
import { useLocation } from 'react-router-dom';
import { getChannels, socketUpdateChannels } from '../../store/channels';
import { getGroupRooms, socketUpdateGroupRooms } from '../../store/chatRooms'

let socket;
const Dashboard = () => {
   const history = useHistory()
   const location = useLocation()
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   useEffect(() => {
      dispatch(reloadCurrentUser(sessionUser.id))
      socket = io();
      socket.emit('sign-in', { 'id': sessionUser.id, 'username': sessionUser.username, 'room': 'chatter', 'online': true })

      socket.on('sign-in', async (data) => {
         await dispatch(loadUsers())
      });

      socket.on('log-out', async (data) => {
         await dispatch(loadUsers())
      })

      socket.on('update-channel', async (data) => {
         await dispatch(getChannels())
      })

      socket.on('delete-channel', async (data) => {
         await dispatch(reloadCurrentUser(sessionUser.id))
         const path = window.location.href.split('/')
         if (path[3] == 'channels' && path[4] === data['channelId']) {
            history.push('/')
         }
         await dispatch(socketUpdateChannels())
      })

      socket.on('delete-group', async (data) => {
         await dispatch(reloadCurrentUser(sessionUser.id))
         const path = window.location.href.split('/')
         if (path[3] == 'groups' && path[4] === data['groupId']) {
            history.push('/')
         }
         await dispatch(socketUpdateGroupRooms())
      })

      socket.on('create-channel', async (data) => {
         await dispatch(getChannels())
      })

      socket.on('create-group', async (data) => {
         await dispatch(getGroupRooms())
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
