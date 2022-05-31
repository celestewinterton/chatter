import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../store/chatRooms';
import SignUpFormModal from '../auth/SignUpFormModal';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal'
import './SplashPage.css'

const SplashPage = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   return (
      <div className='splash-container'>
         <h1 className='splash-title-1'>Welcome to 
         <span className='splash-title-name'>
            Chatter!
         </span>
         </h1>
         <br></br>
         <h2 className='splash-title-2'>The place to chatter it up with your peers</h2>
         <div className='splash-signup'>
            <SignUpFormModal />
         </div>
      </div>
   )
}
export default SplashPage


