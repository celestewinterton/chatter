import React, {useState} from 'react';
import {Modal} from '../../../context/Modal'
import SignUpForm from '../SignUpFormModal/SignUpForm'


function SignUpFormModal1() {
   const [showModal, setShowModal] = useState(false);

   return (
      <div className= 'nav-signup-container'>
         <button className='splash-signup-button purple-button'onClick={() => setShowModal(true)}>Try For Free</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <SignUpForm />
            </Modal>
         )}
      </div>
   )
}

export default SignUpFormModal1;
