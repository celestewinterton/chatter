import React from 'react'
import './Footer.css'
import About from './About'
import Technologies from './Technolgies'
import chatter from '../../images/chatter.png'

const Footer = () => {
 return (
    <div className='footer-container'>
         {/* <img className='footer-logo'src={chatter}/> */}
         <About/>
         <Technologies />
    </div>
)
}

export default Footer