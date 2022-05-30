import React, {useState} from 'react';
import {Modal} from '../../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal() {
   const [showModal, setShowModal] = useState(false);

   return (
      <div className="nav-signin-button"> 
         <button className='signin-button' onClick={() => setShowModal(true)}>Sign In</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <LoginForm />
            </Modal>
         )}
      </div>
   )
}


export default LoginFormModal;