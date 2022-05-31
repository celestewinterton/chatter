import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../store/chatRooms';
import DemoUser from '../auth/DemoUser/DemoUser';
import SignUpFormModal from '../auth/SignUpFormModal';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal'
import dashboard from '../../images/dashboard.png'
import './SplashPage.css'
// import 

const SplashPage = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   return (
      <div className='splash-container'>
         <div className='splash-section-1'>
            <h1 className='splash-title-1'>Chatter is your Digital HQ
            {/* <span className='splash-title-name'>
            </span> */}
            </h1>
            <br></br>
            <p className='splash-title-2'>Transform the way you work with one place for everyone and everything you need to get stuff done</p>
            <div className='splash-signup'>
               <DemoUser />
               <SignUpFormModal />
            </div>
            <div className='splash-section-1-p2'>
               <img className='dashboard'src={dashboard} alt='details-dashboard'/>
            </div>
         </div>
         <div className='splash-container-2'>
            <h1>Move faster by organizing your work life</h1>
            <p>The key to productivity in Cahtter is organized spaces called channels—a different one for everything you’re working on. With all the people, messages and files related to a topic in one place, you can move a whole lot faster.</p>
         </div>
      </div>
   )
}
export default SplashPage


