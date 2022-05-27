import React from 'react';
import { useDispatch} from 'react-redux';
import * as sessionActions from '../../../store/session'
import './DemoUser.css'

function DemoUser() {
   const dispatch = useDispatch();

   const handleSubmit = e => {
      e.preventDefault();
      return dispatch(sessionActions.demoUser({credential: 'demo@aa.io', password: 'password'}))
   }
   return (
      <div>
         <button className='demo-button' onClick={handleSubmit}>Demo User</button>
      </div>
   )
}

export default DemoUser