import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../store/chatRooms';
import DemoUser from '../auth/DemoUserSplash/DemoUserSplash';
import SignUpFormModal from '../auth/SignUpFormSplash';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal'
import dashboard from '../../images/dashboard.png'
import corkboard from '../../images/corkboard.jpg'
import folders from '../../images/folders.gif'
import teamwork from '../../images/teamwork.gif'
import yarn from '../../images/yarn.gif'
import './SplashPage.css'
// import 

const SplashPage = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   return (
      <div className='splash-main-container'>
         <div className='splash-container-1'>
            <div className='splash-container-1-title'>
               <h1 className='splash-container-1-header'>Chatter is your digital HQ </h1>
               <p className='splash-container-1-text'>Transform the way you work with one place for everyone and everything you need to get stuff done.</p>
               <div className='splash-buttons'>
                  <DemoUser />
                  <SignUpFormModal />
               </div>
            </div>
            <div className='splash-section-1-image'>
               <img className='dashboard'src={dashboard} alt='details-dashboard'/>
            </div>
         </div>

         <div className='splash-container-2'>
            <div className='splash-container-2-image'>
               <img className='corkboard' src={corkboard} alt='corkboard image'/>
            </div>
            <div className='splash-container-2-title'>
               <h2 className='splash-container-header'>Now is your movement to build a better tomorrow</h2>
               <p className='splash-container-text'>We've seen what the future can be. Now it's time to decide what it will be.</p>
            </div>
         </div>

         <div className='splash-container-3'>
            <div className='splash-container-3-title'>
               <h1 className='splash-container-header'>Move faster by organizing your work life</h1>
               <p className='splash-container-text'>The key to productivity in Cahtter is organized spaces called 
                  channels—a different one for everything you’re working on. With all the people, messages and files related to a topic in one place, you can move a whole lot faster.</p>
            </div>
            <div className='splash-container-3-image'>
               <img className='yarn' src={yarn} alt='yarn gif'/>  
            </div>
         </div>
         <div className='splash-container-4'>
            <div className='splash-container-4-image'>
               <img className='folders' src={folders} alt='folders gif'/>
            </div>
            <div className='splash-container-4-title'>
               <h1 className='splash-container-header'>Focus your time, on your own terms</h1>
               <p className='splash-container-text'>Give yourself the flexibility to work when, where and how you work best. Take control of notifications, collaborate live or on your own time, and find answers in conversations from across your company.</p>
            </div>
         </div>
         <div className='splash-container-5'>
            <div className='splash-container-5-title'>
               <h1 className='splash-container-header'>Simplify teamwork for everyone</h1>
               <p className='splash-container-text'>Give everyone you work with—inside and outside your company—a more productive way to stay in sync. Respond faster with emoji, keep conversations focused in channels, and simplify all your communication into one place.</p>
            </div>
            <div className='splash-container-5-image'>
               <img className='teamwork' src={teamwork} alt='teamwork gif'/>
            </div>
         </div>
      </div>
   )
}
export default SplashPage


