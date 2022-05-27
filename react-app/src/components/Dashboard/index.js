import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal';
import Groups from '../Groups';
import CreateGroupModal from '../Groups/CreateGroupModal'


const Dashboard = () => {
   const sessionUser = useSelector((state) => state.session.user)

   return (
      <div>
         <div>
            <h1>Helloo this is a test </h1>
            <CreateChannelModal />
            <Channels all={true} />
         </div>
         <div>
            <CreateGroupModal />
            <Groups all={true} />
         </div>
      </div>
   )
}
export default Dashboard
