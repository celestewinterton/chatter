import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../store/chatRooms';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal';
import Groups from '../Groups';
import CreateGroupModal from '../Groups/CreateGroupModal'


const Dashboard = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   useEffect(() => {
      dispatch(getRooms('channels'))
   }, [dispatch])

   return (
      <div>
         <div>
            <h1>Helloo this is a test </h1>
            <CreateChannelModal />
            <Channels user={true} />
         </div>
         <div>
            <CreateGroupModal />
            <Groups all={true} />
         </div>
      </div>
   )
}
export default Dashboard
