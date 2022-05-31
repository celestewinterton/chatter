import React, {useState} from 'react';
import {Modal} from '../../../context/Modal'
import SignUpForm from './SignUpFormSplash';
import './SignUpFormSplash.css'

function SignUpFormModal() {
   const [showModal, setShowModal] = useState(false);

   return (
      <div className= 'nav-signup-container'> 
         <button className='splash-signup-button'onClick={() => setShowModal(true)}>Try For Free</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <SignUpForm />
            </Modal>
         )}
      </div>
   )
}

export default SignUpFormModal;