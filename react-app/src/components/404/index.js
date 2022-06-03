import React from 'react'
import './404.css'
import error from '../../images/error.jpg'
import { NavLink } from 'react-router-dom'

const ErrorPage =() => {



   return (
      <div className='error-page'>
         <div className='error-box'>
            <h1  className='error-box-header'> <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>There's been a glitch...</h1>
            <p className='error-box-text'>We’re not quite sure what went wrong. You can go back, or try looking on our Help Center if you need a hand.</p>
            <NavLink className='error-nav' to='/'>
               <button className='error-button'>Go Home</button>
            </NavLink>
         </div>
         <div>
         </div>
      </div>
   )
} 

export default ErrorPage