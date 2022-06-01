import React from "react";
import './Footer.css'

const About = () => {

return (
   <div className='about-container'>
         <div className='team-members'>
            <p className='dev-title'>Developed By</p>
            <div className='team-member'>
               <div className='member-name'>
                  Austin Dang
               </div>
               <div className="links">
                  <a className='linkedin' href='https://www.linkedin.com/in/austin-dang-106834191/'target="_blank" rel="noopener noreferrer" >
                     <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a className='github' href='https://github.com/AuDang' target="_blank" rel="noopener noreferrer">
                     <i className="fa-brands fa-github"></i>
                  </a>
               </div>
            </div>
            <div className='team-member'>
               <div className='member-name'>
                  Brendan Downing
               </div>
               <div className='links'>
                  <a className='linkedin' href='https://www.linkedin.com/in/brendan-downing-641672228/' target="_blank" rel="noopener noreferrer">
                     <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a className='github' href='https://github.com/Downster' target="_blank" rel="noopener noreferrer">
                     <i className="fa-brands fa-github"></i>
                  </a>
               </div>
            </div>
            <div className='team-member'>
               <div className='member-name'>
                  Celeste Winterton
               </div>
               <div className='links'>
                  <a className="angel" href="https://angel.co/u/celeste-winterton" target="_blank" rel="noopener noreferrer">
                     <i className="fa-brands fa-angellist"></i>
                  </a>
                  <a className='linkedin' href='https://www.linkedin.com/in/celestewinterton/' target="_blank" rel="noopener noreferrer">
                     <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a className='github' href="https://github.com/celestewinterton" target="_blank" rel="noopener noreferrer">
                     <i className="fa-brands fa-github"></i>
                  </a>
               </div>
            </div>
            <div className='team-member'>
               <div className='member-name'>
                  Jingling Jin
               </div>
                <div className='links'>
                  <a className='github' href='https://github.com/ellen20' target="_blank" rel="noopener noreferrer">
                     <i className="fa-brands fa-github"></i>
                  </a>
               </div>
            </div>
            
         </div>
   </div>
)
}
export default About 
