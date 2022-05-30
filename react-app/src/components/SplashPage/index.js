import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../store/chatRooms';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal';

const SplashPage = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   return (
      <div className='splash-container'>
            <h1>Helloo this is a test </h1>
         <div className='splash-left'>
         </div>

         <div className='splash-right'>
            {/* <LoginFormModal />
            <SignUpFormModal /> */}
         </div>

      </div>
   )
}
export default SplashPage


