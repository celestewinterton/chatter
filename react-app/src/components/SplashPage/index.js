import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../store/chatRooms';
import DemoUser from '../auth/DemoUserSplash/DemoUserSplash';
import DemoUser1 from './DemoUser/DemoUser';
import Channels from '../Channels';
import CreateChannelModal from '../Channels/CreateChannelModal'
import SignUpFormModal1 from '../auth/SignUpFormSplash';
import SignUpFormModal2 from './SignUpButtonFooter';
import dashboard from '../../images/dashboard.png'
import corkboard from '../../images/corkboard.jpg'
import folders from '../../images/folders.gif'
import teamwork from '../../images/teamwork.gif'
import yarn from '../../images/yarn.gif'
import Footer from '../Footer';
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
                  <SignUpFormModal1 />
                  <DemoUser />
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
         <div className='splash-container-6'>
            <div className='splash-container-6-title'>
               <h1 className='splash-container-6-header'>Get started with Chatter</h1>
            </div>
            <div className='splash-container-steps'>
               <div className='splash-container-6-boxes'>
                  <div className='splash-number'>
                     <p className='number'>1</p>
                  </div>
                  <div>
                     <h1 className='splash-container-6-text-headers'>Sign Up</h1>
                     <p className='splash-container-6-text'>Create a new Chatter workspace in just a few moments. It’s free to try for teams of any size.</p>
                  </div>
               </div>
               <div className='splash-container-6-boxes'>
                  <div className='splash-number'>
                     <p className='number'>2</p>
                  </div>
                  <div>      
                     <h1 className='splash-container-6-text-headers'> Invite your coworkers</h1>
                     <p className='splash-container-6-text'>Chatter is better together (no, really, it’s a bit underwhelming by yourself), and it’s easy to invite your team.</p>
                  </div>
               </div>
               <div className='splash-container-6-boxes'>
                  <div className='splash-number'>
                     <p className='number'>3</p>
                  </div>
                  <div> 
                     <h1 className='splash-container-6-text-headers'>Try it out</h1>
                     <p className='splash-container-6-text'>Run a project, coordinate with your team, or just talk it out. Chatter is a blank canvas for teamwork.</p>
                  </div>
               </div>
               
            </div>
         </div>
         <div className='splash-container-7'>
            <div className='splash-container-7-title'>
               <h1 className='splash-container-7-header'>Welcome to where the future works</h1>
            </div>
            <div className='splash-container-7-buttons'>
               <SignUpFormModal2/>
               <DemoUser1 />
            </div>
         </div>
         <div className='splash-footer'>
            <Footer />
            <p className='copyright'>©2022 Chatter Technologies, LLC, a Salesforce company. All rights reserved. Various trademarks held by their respective owners.</p>
         </div>

      </div>
   )
}
export default SplashPage


