import { useSelector } from "react-redux"
import { Modal } from "../../../context/Modal"
import { useState } from "react"

const ChatUserCard = ({ msg }) => {
    const users = useSelector(state => state.users)
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className={(users[msg.user.id].online) ? 'status-circle online' : 'status-circle offline'}>
                        <div className='inner-circle'></div>
                    </div>
                </Modal>
            )}
            <div className='profile-pic-div'>
                <img className='chat-profile-pic' onClick={(e) => setShowModal(true)} src={msg.user.photo} alt={msg.user.username}></img>
            </div>
        </>
    )
}

export default ChatUserCard