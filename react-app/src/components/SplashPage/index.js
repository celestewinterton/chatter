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
import heroUI1 from '../../videos/heroUI1.webm'
import heroUI2 from '../../videos/heroUI2.webm'
import heroUI3 from '../../videos/heroUI3.webm'
import heroUI4 from '../../videos/heroUI4.webm'
import heroUI6 from '../../videos/heroUI6.mp4'
import './SplashPage.css'

// import 

const SplashPage = () => {
   const dispatch = useDispatch()
   const sessionUser = useSelector((state) => state.session.user)

   return (
      <div className='splash-main-container'>
         <div className='splash-container-1'>
            <div className='splash-container-1-title'>
               <h1 className='splash-container-1-header'>Great teamwork starts with a 
               <span className='splash-container-1-digital'> digital HQ</span>
               </h1>
               <p className='splash-container-1-text'>With all your people, tools and communication in one place, you can work faster and more flexibly than ever before.</p>
               <div className='splash-buttons'>
                  <SignUpFormModal1 />
                  <DemoUser />
               </div>
            </div>
            <div className='splash-section-1-video'>
               <video className='video1' playsinline autostart autoPlay loop muted src={heroUI1} type='video/webm'/> 
               {/* <img className='dashboard'src={dashboard} alt='details-dashboard'/> */}
            </div>
         </div>

         {/* <div className='splash-container-2'>
            <div className='splash-container-2-image'>
               <img className='corkboard' src={corkboard} alt='corkboard image'/>
            </div>
            <div className='splash-container-2-title'>
               <h2 className='splash-container-header'>Now is your movement to build a better tomorrow</h2>
               <p className='splash-container-text'>We've seen what the future can be. Now it's time to decide what it will be.</p>
            </div>
         </div> */}

         <div className='splash-container-3'>
            <div className='splash-container-3-video'>
               {/* <img className='yarn' src={yarn} alt='yarn gif'/>   */}
               <video className='video3' playsinline autostart autoPlay loop muted src={heroUI2} type='video/webm'/>
            </div>
            <div className='splash-container-3-title'>
               <h1 className='splash-container-header'>Bring your team together</h1>
               <p className='splash-container-text'>At the heart of Chatter are channels: organized spaces for everyone and everything you need for work. In channels, it’s easier to connect across departments, offices, time zones and even other companies.</p>
            </div>
         </div>
         <div className='splash-container-4'>
            <div className='splash-container-4-title'>
               <h1 className='splash-container-header'>Choose how you want to work</h1>
               <p className='splash-container-text'>In Chatter, you’ve got all the flexibility to work when, where and how it’s best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.</p>
            </div>
            <div className='splash-container-4-video'>
               <video className='video4' playsinline autostart autoPlay loop muted src={heroUI3} type='video/webm'/>
               {/* <img className='folders' src={folders} alt='folders gif'/> */}
            </div>
         </div>
         <div className='splash-container-5'>
            <div className='splash-container-5-video'>
               <video className='video5' playsinline autostart autoPlay loop muted src={heroUI4} type='video/webm'/>
               {/* <img className='teamwork' src={teamwork} alt='teamwork gif'/> */}
            </div>
            <div className='splash-container-5-title'>
               <h1 className='splash-container-header'>Move faster with your tools in one place</h1>
               <p className='splash-container-text'>With your other work apps connected to Chatter, you can work faster by switching tabs less. And with powerful tools like Workflow Builder, you can automate away routine tasks.</p>
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
            <div className='splash-container-7-video'>
               <video className='video7' playsinline autostart autoPlay loop muted src={heroUI6} type='video/mp4'/> 
            </div>
            <div className='splash-container-7-title'>
               <p className='splash-container-7-text'>
                  “We were able to create a large virtual network of employees that can communicate as though they are together. There was a lot of disruption in terms of where we worked, but in terms of how we worked—very little disruption.”
               </p>
               <span className='splash-7-name'>Mark Smith</span>
               <span className='splash-7-name-title'>Senior Technical Product Manager, T-Mobile</span>
            </div>
         </div>
         <div className='splash-container-8'>
            <div className='splash-container-8-title'>
               <h1 className='splash-container-8-header'>Welcome to your new digital HQ</h1>
            </div>
            <div className='splash-container-8-buttons'>
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


