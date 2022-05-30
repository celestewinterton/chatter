import React, {useState} from 'react';
import {Modal} from '../../../context/Modal'
import SignUpForm from './SignUpForm';
import './SignUpForm.css'

function SignUpFormModal() {
   const [showModal, setShowModal] = useState(false);

   return (
      <div className= 'nav-signup-button'> 
         <button className='signup-button'onClick={() => setShowModal(true)}>SignUp</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <SignUpForm />
            </Modal>
         )}
      </div>
   )
}

export default SignUpFormModal;