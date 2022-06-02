import EditChatInput from "../ChatInput"
import Parser from 'html-react-parser';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditFalse, setEditTrue } from "../../../store/session";
import ChatUserCard from '../ChatUserCard';


const ChatMessage = ({ msg, socket, roomId, userId }) => {
    const user = useSelector(state => state.session.user);
    const canEdit = useSelector(state => state.session.edit)
    const [edit, setEdit] = useState(false)
    const [message, setMessageBody] = useState(msg.message)
    const dispatch = useDispatch()


    const editMessage = async (e, msgId) => {
        socket.emit('edit', {
            user: `${user.username}`, userId: `${user.id}`, msgId: msgId, msg: message, room: roomId, created_at: (new Date()).toLocaleTimeString()
        });
        dispatch(setEditTrue())
        setEdit(false)
    }

    const deleteMessage = async (e, msgId) => {
        e.preventDefault()
        socket.emit('delete', {
            user: `${user.username}`, userId: `${user.id}`, msgId: msgId, msg: message, room: roomId, created_at: (new Date()).toLocaleTimeString()
        })
    }

    const updateEdit = () => {
        dispatch(setEditFalse())
        setEdit(true)
    }

    const cancelEdit = () => {
        dispatch(setEditTrue())
        setEdit(false)
    }



    return (
        <>
<<<<<<< HEAD
            <div className='pic-container'>
                <ChatUserCard msg={msg} />
            </div>
            <div className="chat-data">
                <div className='chat-metadata'>
                    <p className='chat-username bold'>{msg.user.username}<span className='created-at-msg'>{new Date(msg.created_at).toLocaleTimeString()}</span></p>
                    <div className="chat-buttons">
                        {(canEdit && userId == msg.owner_id) ? <button onClick={updateEdit}>Edit</button> : null}
                        {(userId == msg.owner_id) ? <button onClick={(e) => deleteMessage(e, msg.id)}>Delete</button> : null}
                    </div>
                </div>
                <div className='chat-text' id={msg.id}>
                    {(edit) ? <ChatInput value={message} onChange={(e) => setMessageBody(e)} send={(e) => editMessage(e, msg.id)} /> : Parser(msg.message)}
                </div>
=======
            {(edit) ? <EditChatInput value={message} onChange={(e) => setMessageBody(e)} send={(e) => editMessage(e, msg.id)} /> : Parser(msg.message)}
            <div className="chat-buttons">
                {(canEdit && userId == msg.owner_id) ? <button onClick={updateEdit}>Edit</button> : <button onClick={cancelEdit}>Cancel</button>}
                {(userId == msg.owner_id) ? <button onClick={(e) => deleteMessage(e, msg.id)}>Delete</button> : null}
>>>>>>> d628605 (Fixed edit message)
            </div>
        </>
    )
}

export default ChatMessage
