import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../../store/session'
import './DemoUser.css'


function DemoUser() {
   const dispatch = useDispatch();
   const history = useHistory()

   const handleSubmit = e => {
      e.preventDefault();
     (async()=>{
      await dispatch(sessionActions.login('demo@aa.io', 'password'));
      history.push('/')
      })()
   }
   return (
      <div>
         <button className='demo-button' onClick={handleSubmit}>Demo User</button>
      </div>
   )
}

export default DemoUser