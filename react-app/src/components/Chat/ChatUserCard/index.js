import { useSelector } from "react-redux"
import { DarkModal } from "../../../context/Modal"
import { useState } from "react"

const ChatUserCard = ({ msg }) => {
    const [style, setStyle] = useState({})
    const users = useSelector(state => state.users)
    const [showModal, setShowModal] = useState(false);

    const getPosition = (e) => {
        let y = e.target.getBoundingClientRect().y
        if (y > window.innerHeight - 343) {
            y = window.innerHeight - 350
        }
        let x = e.target.getBoundingClientRect().x
        setStyle({ top: y + 'px', left: x + 42 + 'px', padding: '0px' })
        setShowModal(true)
    }

    return (
        <>
            {showModal && (
                <DarkModal onClose={() => setShowModal(false)} style={style}>
                    <div className="profile-card">
                        <div className='chat-card-div'>
                            <img className='chat-card-pic' src={msg.user.photo} alt={msg.user.username}></img>
                        </div>
                        <div className="user-info-card">
                            <div className="user-title-container">
                                <div className="user-card-title">
                                    <p className="user-card-username">{msg.user.username}</p>
                                </div>
                                <div style={style} className={(users[msg.user.id].online) ? 'status-circle online' : 'status-circle offline'}>
                                    <div className='inner-circle'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DarkModal>
            )
            }
            <div className='profile-pic-div'>
                <img className='chat-profile-pic' src={msg.user.photo} alt={msg.user.username} onMouseDown={getPosition}></img>
            </div>
        </>
    )
}

export default ChatUserCard