import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../../store/session'


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
         <button className='demo-button-splash purple-border-button' onClick={handleSubmit}>Try a Demo</button>
      </div>
   )
}

export default DemoUser
