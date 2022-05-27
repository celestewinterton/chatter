import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal';

const SplashPage = () => {
   const sessionUser = useSelector((state) => state.session.user)

   return (
      <div>
         <h1>Helloo this is a test </h1>
         <CreateChannelModal />
         <Channels all={true} />
      </div>
   )
}
export default SplashPage


