import EditChatInput from "../ChatInput"
import ChatUserCard from "../ChatUserCard";
import Parser from 'html-react-parser';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setEditFalse, setEditTrue } from "../../../store/session";
const ChatMessage = ({ msg, socket, roomId, userId, group }) => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user);
    const canEdit = useSelector(state => state.session.edit)
    const [errors, setErrors] = useState('')
    const [edit, setEdit] = useState(false)
    const [message, setMessageBody] = useState(msg.message)
    const dispatch = useDispatch()

    console.log('edit',)
    console.log('delete', (userId == msg.owner_id && !edit))

    const checkIfSubscribed = () => {
        for (let channel of user.subscribed_channels) {
            if (channel.id == id) {
                return true
            }
        }
        return false
    }
    let isSubscribed = checkIfSubscribed()
    if (group) {
        isSubscribed = true;
    }




    const editMessage = async (e, msgId) => {

        if (message.length > 255) {
            setMessageBody('')
            setErrors('Message cannot be over 255 characters')

        } else if (message !== "<p><br></p>") {
            socket.emit('edit', {
                user: `${user.username}`, userId: `${user.id}`, msgId: msgId, msg: message, room: roomId, created_at: (new Date()).toLocaleTimeString()
            });
            dispatch(setEditTrue())
            setEdit(false)
            setErrors('')
        } else {
            setErrors('Message cannot be empty, please input a message')
        }
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
            <div className="chat-data-container">
                <div className='pic-container'>
                    <ChatUserCard msg={msg} />
                </div>
                <div className="chat-data">
                    <div className='chat-metadata'>
                        <p className='chat-username bold'>{msg.user.username}<span className='created-at-msg'>{new Date(msg.created_at).toLocaleTimeString()}</span></p>
                    </div>
                    <div className='chat-text' id={msg.id}>
                        {(edit) ? <EditChatInput errors={errors} value={message} onChange={(e) => setMessageBody(e)} send={(e) => editMessage(e, msg.id)} /> : Parser(msg.message)}
                    </div>
                </div>
            </div>
            <div className="chat-buttons">
                {isSubscribed &&
                    <>
                        {(canEdit && userId == msg.owner_id) ? <button onClick={updateEdit}>Edit</button> : (edit) ? <button onClick={cancelEdit}>Cancel</button> : null}
                        {(userId == msg.owner_id && !edit) ? <button onClick={(e) => deleteMessage(e, msg.id)}>Delete</button> : null}
                    </>
                }
            </div>
        </>
    )
}

export default ChatMessage
