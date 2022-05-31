import { useSelector } from "react-redux"
import { Modal } from "../../../context/Modal"
import { useState } from "react"

const ChatUserCard = ({ msg }) => {
    const [style, setStyle] = useState({})
    const users = useSelector(state => state.users)
    const [showModal, setShowModal] = useState(false);

    const getPosition = (e) => {
        let y = e.target.getBoundingClientRect().y
        let x = (e.clientX)
        setStyle({ top: y + 'px', left: '240px' })
        setShowModal(true)
    }

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} style={style}>
                    <div className="profile-card">
                        <div className='chat-card-div'>
                            <img className='chat-card-pic' src={msg.user.photo} alt={msg.user.username} onMouseDown={getPosition}></img>
                        </div>
                        <div className="user-card-title">
                            <p>{msg.user.username}</p>
                        </div>
                        <div style={style} className={(users[msg.user.id].online) ? 'status-circle online' : 'status-circle offline'}>
                            <div className='inner-circle'></div>
                        </div>
                    </div>
                </Modal>
            )
            }
            <div className='profile-pic-div'>
                <img className='chat-profile-pic' src={msg.user.photo} alt={msg.user.username} onMouseDown={getPosition}></img>
            </div>
        </>
    )
}

export default ChatUserCard