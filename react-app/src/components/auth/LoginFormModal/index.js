import React, {useState} from 'react';
import {Modal} from '../../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal() {
   const [showModal, setShowModal] = useState(false);

   return (
      <div className='login-container'>
         <button className='nav-login-button purple-border-button' onClick={() => setShowModal(true)}>Sign In</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <LoginForm />
            </Modal>
         )}
      </div>
   )
}


export default LoginFormModal;
