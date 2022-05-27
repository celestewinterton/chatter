import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../store/chatRooms';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal';

const SplashPage = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   return (
      <div>
         <h1>Helloo this is a test </h1>
      </div>
   )
}
export default SplashPage


