import React from "react";
import docker from '../../images/docker.png'
import flask from '../../images/flask.png'
import js from '../../images/js.png'
import postgres from '../../images/postgres.png'
import python from '../../images/python.png'
import react from '../../images/react.png'
import './Footer.css'

const Technologies = () => {
   return (
   <div className='technologies-container'>
      <div className='technologies-title'>Technologies </div>
      <div className='technologies-logo'>
         <img className='tech-image'src={docker} alt='docker'/>
         <img className='tech-image'src={flask}/>
         <img className='tech-image'src={js}/>
         <img className='tech-image'src={postgres}/>
         <img className='tech-image'src={python}/>
         <img className='tech-image'src={react}/>
      </div>
   </div>
   )
}

export default Technologies