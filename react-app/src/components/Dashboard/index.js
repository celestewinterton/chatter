import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getRooms } from '../../store/chatRooms';
import ProtectedRoute from '../auth/ProtectedRoute';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal';
import Groups from '../Groups';
import CreateGroupModal from '../Groups/CreateGroupModal'
import LeftMenu from '../LeftMenu';
import './Dashboard.css'


const Dashboard = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   useEffect(() => {
      dispatch(getRooms('channels'))
   }, [dispatch])

   return (
      <>
         <div className='dashboard-container'>
            <LeftMenu />
            <Switch>
               <ProtectedRoute path='/' exact={true} >
                  <div className='app-body'>
                     <h1>All channel view</h1>
                  </div>
               </ProtectedRoute>
               <ProtectedRoute path='/groups/:groupId' exact={true} >
                  <Groups />
               </ProtectedRoute>
               <Route path='/groups' exact={true} >
                  <Groups />
               </Route>
            </Switch>
         </div>
      </>
   )
}
export default Dashboard
