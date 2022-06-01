import React, {useState} from 'react';
import {Modal} from '../../../context/Modal'
import SignUpForm from '../SignUpFormModal/SignUpForm'


function SignUpFormModal1() {
   const [showModal, setShowModal] = useState(false);

   return (

      <div className= 'nav-signup-container'> 
         <button className='splash-signup-button'onClick={() => setShowModal(true)}>Sign up with email</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <SignUpForm />
            </Modal>
         )}
      </div>
   )
}

export default SignUpFormModal1;
